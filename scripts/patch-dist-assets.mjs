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
  // 直前の区切りは生のクォート/括弧/空白/= に加え、HTML エスケープされたクォート
  // (&#34; &#39; &quot; &apos; など) も許可する。インライン style 属性内の
  // url("...") は &#34; にエスケープされるため、これを拾わないと CDN 化が漏れる。
  return content.replace(/(["'(\s=]|&#?\w+;)\/(_astro|images)\//g, (_match, start, folder) => {
    return `${start}${cdnBase}/${folder}/`;
  });
};

// 別オリジンCDN配信時、外部 <script type="module" src="..."> はESモジュール＝CORS必須で
// 取得されるため、ACAOヘッダを返さない CDN では弾かれて初期化されない。
// バンドルは import/export/import.meta を持たない自己完結なので、type="module" を外して
// classic スクリプトにすればクロスオリジンでもCORS不要で実行できる。
// （src 無しのインライン module は同一HTML内なのでそのまま温存）
const rewriteHtmlScripts = (content) => {
  return content.replace(/\s+type="module"(\s+src=)/g, '$1');
};

const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    const ext = extname(entry.name).toLowerCase();
    if (textExtensions.has(ext)) {
      const original = readFileSync(fullPath, 'utf8');
      let updated = rewriteContent(original);
      if (ext === '.html') {
        updated = rewriteHtmlScripts(updated);
      }
      if (updated !== original) {
        writeFileSync(fullPath, updated, 'utf8');
      }
    }
  }
};

walk(distDir);
