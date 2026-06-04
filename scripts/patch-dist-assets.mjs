import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';

const rootDir = process.cwd();
const distDir = resolve(rootDir, 'dist');
const envFiles = ['.env', '.env.production', '.env.local', '.env.production.local'];

const loadedEnv = {};

const parseEnvFile = (filePath) => {
  const content = readFileSync(filePath, 'utf8');

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    loadedEnv[key] = value;
  }
};

for (const relativePath of envFiles) {
  const filePath = resolve(rootDir, relativePath);
  if (existsSync(filePath)) {
    parseEnvFile(filePath);
  }
}

const cdnBase = (
  process.env.PUBLIC_CDN_URL ||
  loadedEnv.PUBLIC_CDN_URL ||
  ''
).replace(/\/$/, '');

if (!cdnBase || !existsSync(distDir)) {
  process.exit(0);
}

const textExtensions = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg', '.txt']);

const rewriteContent = (content) => {
  return content.replace(/(["'(\s=])\/(_astro|images)\//g, (_match, start, folder) => {
    return `${start}${cdnBase}/${folder}/`;
  });
};

const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (textExtensions.has(extname(entry.name).toLowerCase())) {
      const original = readFileSync(fullPath, 'utf8');
      const updated = rewriteContent(original);
      if (updated !== original) {
        writeFileSync(fullPath, updated, 'utf8');
      }
    }
  }
};

walk(distDir);
