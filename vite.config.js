import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

function findHtmlFiles(dir, base = __dirname) {
  const entries = readdirSync(dir, { withFileTypes: true });
  let files = {};

  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      // skip build/dependency folders
      if (['node_modules', 'dist', '.git'].includes(entry.name)) continue;
      files = { ...files, ...findHtmlFiles(fullPath, base) };
    } else if (entry.name.endsWith('.html')) {
      const relativePath = fullPath.replace(base + '/', '');
      const name = relativePath
        .replace(/\.html$/, '')
        .replace(/\/index$/, '') // about-us/index -> about-us
        .replace(/\//g, '-') || 'main'; // root index.html -> main

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