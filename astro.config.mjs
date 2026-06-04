import { defineConfig, envField } from 'astro/config';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineConfig(({ mode }) => {
  const rootDir = process.cwd();
  const envFiles = [`.env`, `.env.${mode}`, `.env.local`, `.env.${mode}.local`];
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

  const cdnUrl = process.env.PUBLIC_CDN_URL || loadedEnv.PUBLIC_CDN_URL || '';

  return {
    compressHTML: false,
    env: {
      schema: {
        PUBLIC_LINK_BASE: envField.string({ context: 'client', access: 'public', default: '#' }),
        PUBLIC_LINE_URL: envField.string({ context: 'client', access: 'public', default: '#' }),
        PUBLIC_CDN_URL: envField.string({ context: 'client', access: 'public', default: '' }),
      },
    },
    build: {
      assetsPrefix: cdnUrl,
    },
    image: { service: { entrypoint: 'astro/assets/services/sharp' } },
    vite: {
      build: {
        rollupOptions: {
          output: {
            assetFileNames: (info) =>
              /\.(png|jpe?g|gif|svg|webp|avif)$/i.test(info.name || '')
                ? 'images/[name]-[hash][extname]'
                : '_astro/[name]-[hash][extname]',
            entryFileNames: '_astro/[name]-[hash].js',
            chunkFileNames: '_astro/[name]-[hash].js',
          },
        },
      },
    },
  };
});
