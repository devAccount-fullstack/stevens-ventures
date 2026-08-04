import { defineConfig } from "vite";
import { resolve, dirname, relative, sep } from "path";
import { fileURLToPath } from "url";
import { readdirSync, copyFileSync, mkdirSync, existsSync, statSync } from "fs";
import { join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function findHtmlFiles(dir, base = __dirname) {
  const entries = readdirSync(dir, { withFileTypes: true });
  let files = {};

  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", "dist", ".git", "public"].includes(entry.name)) continue;
      files = { ...files, ...findHtmlFiles(fullPath, base) };
    } else if (entry.name.endsWith(".html")) {
      const relativePath = relative(base, fullPath).split(sep).join("/");
      const name = relativePath
        .replace(/\.html$/, "")
        .replace(/\/index$/, "")
        .replace(/\//g, "-") || "main";

      files[name] = fullPath;
    }
  }

  return files;
}

const htmlFiles = findHtmlFiles(__dirname);

function copyDirectory(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const entries = readdirSync(src);

  entries.forEach((entry) => {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);

    if (statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  });
}

export default defineConfig({
  assetsInclude: ["**/*.json"],
  server: {
    fs: {
      allow: [".."],
    },
  },
  build: {
    rollupOptions: {
      input: htmlFiles,
    },
    cssCodeSplit: false,
  },
  plugins: [
    {
      name: "copy-cms-config",
      closeBundle() {
        const distRootDir = resolve(__dirname, "dist");

        // _redirects
        copyFileSync(
          resolve(__dirname, "_redirects"),
          resolve(distRootDir, "_redirects")
        );

        // robots.txt
        const robots = resolve(__dirname, "robots.txt");
        if (existsSync(robots)) {
          copyFileSync(robots, resolve(distRootDir, "robots.txt"));
        }

        // sitemap.xml
        const sitemap = resolve(__dirname, "sitemap.xml");
        if (existsSync(sitemap)) {
          copyFileSync(sitemap, resolve(distRootDir, "sitemap.xml"));
        }

        // style.css
        const srcStylePath = resolve(__dirname, "src/style.css");
        if (existsSync(srcStylePath)) {
          copyFileSync(srcStylePath, resolve(distRootDir, "style.css"));
        }

        // content
        const srcContentDir = resolve(__dirname, "src/content");
        const distContentDir = resolve(distRootDir, "src/content");

        if (existsSync(srcContentDir)) {
          copyDirectory(srcContentDir, distContentDir);
        }
      }
    },
    {
      name: "resources-post-rewrite",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (/^\/resources\/[^/]+\/?$/.test(req.url) && req.url !== '/resources/') {
            req.url = "/resources/single-post.html";
          }
          next();
        });
      }
    }
  ],
});