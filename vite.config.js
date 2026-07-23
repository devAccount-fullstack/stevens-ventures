import { defineConfig } from 'vite';
import { resolve, dirname, relative, sep } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

function findHtmlFiles(dir, base = __dirname) {
  const entries = readdirSync(dir, { withFileTypes: true });
  let files = {};

  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      // skip build/dependency/public folders
      if (['node_modules', 'dist', '.git', 'public'].includes(entry.name)) continue;
      files = { ...files, ...findHtmlFiles(fullPath, base) };
    } else if (entry.name.endsWith('.html')) {
      const relativePath = relative(base, fullPath).split(sep).join('/');
      const name = relativePath
        .replace(/\.html$/, '')
        .replace(/\/index$/, '') 
        .replace(/\//g, '-') || 'main'; 

      files[name] = fullPath;
    }
  }

  return files;
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: findHtmlFiles(__dirname),
    },
  },
});