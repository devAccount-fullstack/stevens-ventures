import { slugify } from '../utils/slugify.js';

export const SITE_ORIGIN = 'https://www.stevensventures.com';

export function getArticleSlug(card) {
  return card.slug || slugify(card.title);
}

export function getArticleTitle(card) {
  return card.seoTitle || `${card.title} | Stevens Ventures`;
}

export function getArticleDescription(card) {
  return (card.metaDescription || card.excerpt || '').trim();
}

export function getArticleCanonical(card) {
  return `${SITE_ORIGIN}/resources/${getArticleSlug(card)}/`;
}

export function getArticleImage(card) {
  return new URL(card.image, SITE_ORIGIN).href;
}

export function splitArticleTitle(title = '', wordCount = 3) {
  const words = title.trim().split(/\s+/);
  return {
    headingLine1: words.slice(0, wordCount).join(' '),
    headingAccent: words.slice(wordCount).join(' '),
  };
}

export function buildArticleSchema(card) {
  const canonical = getArticleCanonical(card);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: card.title.trim(),
    datePublished: card.date || card.publishDate,
    image: getArticleImage(card),
    author: {
      '@type': 'Person',
      '@id': 'https://nathanielstevens.com/#person',
      name: card.author,
      url: 'https://nathanielstevens.com/',
    },
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    mainEntityOfPage: canonical,
  };
}
