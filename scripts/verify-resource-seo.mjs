import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogData } from '../src/data/blogData.js';
import {
  getArticleCanonical,
  getArticleDescription,
  getArticleSlug,
  getArticleTitle,
} from '../src/resources/articleMetadata.js';

const repoRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const errors = [];
const seenTitles = new Set();
const seenCanonicals = new Set();
const seenDescriptions = new Set();

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function countMatches(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

function normalizedText(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

for (const card of blogData.cards) {
  const slug = getArticleSlug(card);
  const pagePath = resolve(repoRoot, 'dist/resources', slug, 'index.html');

  if (!existsSync(pagePath)) {
    errors.push(`${slug}: generated HTML is missing`);
    continue;
  }

  const html = readFileSync(pagePath, 'utf8');
  const canonical = getArticleCanonical(card);
  const title = getArticleTitle(card);
  const description = getArticleDescription(card);
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];

  if (seenTitles.has(title)) errors.push(`${slug}: title is duplicated`);
  if (seenCanonicals.has(canonical)) errors.push(`${slug}: canonical is duplicated`);
  if (seenDescriptions.has(description)) errors.push(`${slug}: meta description is duplicated`);
  seenTitles.add(title);
  seenCanonicals.add(canonical);
  seenDescriptions.add(description);

  const assertions = [
    [countMatches(html, /<title\b/gi) === 1, 'expected exactly one title'],
    [html.includes(`<title>${escapeHtml(title)}</title>`), 'route-specific title is wrong'],
    [countMatches(html, /<meta\s+name="description"/gi) === 1, 'expected exactly one meta description'],
    [html.includes(`content="${escapeHtml(description)}"`), 'meta description is wrong'],
    [countMatches(html, /<link\s+rel="canonical"/gi) === 1, 'expected exactly one canonical'],
    [html.includes(`href="${canonical}"`), 'canonical is wrong'],
    [html.includes('<meta name="robots" content="index, follow">'), 'article robots directive is wrong'],
    [countMatches(html, /<meta\s+property="og:(?:type|title|description|url|image)"/gi) === 5, 'Open Graph metadata is incomplete'],
    [countMatches(html, /<meta\s+name="twitter:(?:card|title|description|image)"/gi) === 4, 'Twitter metadata is incomplete'],
    [h1Matches.length === 1, 'expected exactly one H1'],
    [h1Matches.length === 1 && normalizedText(h1Matches[0][1]) === card.title.trim(), 'H1 does not match the article title'],
    [!html.includes('Stevens Ventures · Resources'), 'generic resource title remains'],
    [countMatches(html, /<script\s+id="article-schema"\s+type="application\/ld\+json">/gi) === 1, 'Article JSON-LD is missing or duplicated'],
  ];

  for (const [passed, message] of assertions) {
    if (!passed) errors.push(`${slug}: ${message}`);
  }

  const schemaMatch = html.match(/<script\s+id="article-schema"\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (schemaMatch) {
    try {
      const schema = JSON.parse(schemaMatch[1]);
      if (schema.headline !== card.title.trim()) errors.push(`${slug}: schema headline is wrong`);
      if (schema.mainEntityOfPage !== canonical) errors.push(`${slug}: schema canonical is wrong`);
      if (schema.author?.name !== card.author) errors.push(`${slug}: schema author is wrong`);
    } catch (error) {
      errors.push(`${slug}: Article JSON-LD is invalid (${error.message})`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Verified ${blogData.cards.length} static resource pages: unique title, description, canonical, social metadata, Article JSON-LD, and one H1 each.`);
