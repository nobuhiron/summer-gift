import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const rootDir = process.cwd();
const sourcePath = resolve(rootDir, 'node_modules/@splidejs/splide/dist/js/splide.min.js');
const targetPath = resolve(rootDir, 'public/vendor/splide.min.js');

if (!existsSync(sourcePath)) {
  process.exit(0);
}

mkdirSync(dirname(targetPath), { recursive: true });
copyFileSync(sourcePath, targetPath);
