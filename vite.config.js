import { defineConfig } from "vite";
import { resolve, dirname, relative, sep } from "path";
import { fileURLToPath } from "url";
import { readdirSync, copyFileSync, mkdirSync, existsSync, statSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { blogData } from "./src/data/blogData.js";
import { renderBlogPost } from "./src/components/blogPost.js";
import { renderHero } from "./src/components/hero.js";
import {
  buildArticleSchema,
  getArticleCanonical,
  getArticleDescription,
  getArticleImage,
  getArticleSlug,
  getArticleTitle,
  splitArticleTitle,
} from "./src/resources/articleMetadata.js";

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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderResourceHead(card) {
  const title = getArticleTitle(card);
  const description = getArticleDescription(card);
  const canonical = getArticleCanonical(card);
  const image = getArticleImage(card);
  const schema = JSON.stringify(buildArticleSchema(card)).replaceAll("<", "\\u003c");

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:image" content="${escapeHtml(image)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${escapeHtml(image)}">
    <script id="article-schema" type="application/ld+json">${schema}</script>`;
}

function renderResourceHero(card) {
  const { headingLine1, headingAccent } = splitArticleTitle(card.title, 3);
  return renderHero({
    className: "half-width-bg",
    bgImage: card.image,
    headingLine1,
    headingAccent,
    text: "",
    buttons: [],
    backLink: { label: "Back to Resources", href: "/resources/" },
  });
}

function writeResourcePages(distRootDir) {
  const templatePath = resolve(distRootDir, "resources/single-post.html");
  const template = readFileSync(templatePath, "utf8");

  blogData.cards.forEach((card) => {
    const slug = getArticleSlug(card);
    const outputDir = resolve(distRootDir, "resources", slug);
    const replacements = [
      ["<title>Stevens Ventures · Resources</title>", renderResourceHead(card), "title"],
      ['<meta name="robots" content="noindex, follow">', '<meta name="robots" content="index, follow">', "robots directive"],
      ['<div id="hero-single-post"></div>', `<div id="hero-single-post">${renderResourceHero(card)}</div>`, "article hero"],
      ['<div id="blog-post-root"></div>', `<div id="blog-post-root">${renderBlogPost(card)}</div>`, "article body"],
    ];
    let page = template;

    replacements.forEach(([needle, replacement, label]) => {
      if (!page.includes(needle)) {
        throw new Error(`Cannot generate ${slug}: ${label} placeholder is missing`);
      }
      page = page.replace(needle, replacement);
    });

    mkdirSync(outputDir, { recursive: true });
    writeFileSync(resolve(outputDir, "index.html"), page);
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

        // Generate crawlable HTML for each article instead of serving one
        // JavaScript-only template with generic metadata at every URL.
        writeResourcePages(distRootDir);
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
