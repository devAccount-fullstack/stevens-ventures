import '../style.css';
import { blogData } from '../data/blogData.js';
import { renderBlogPost } from '../components/blogPost.js';
import { renderHero } from '../components/hero.js';
import {
  buildArticleSchema,
  getArticleCanonical,
  getArticleDescription,
  getArticleImage,
  getArticleSlug,
  getArticleTitle,
  splitArticleTitle,
} from './articleMetadata.js';

function getSlugFromURL() {
  const match = window.location.pathname.match(/^\/resources\/([^/]+)\/?$/);
  return match ? match[1] : null;
}

function upsertMeta(selector, attributes) {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    tag.setAttribute(name, value);
  });
}

function setArticleMeta(card) {
  const canonicalUrl = getArticleCanonical(card);
  const description = getArticleDescription(card);
  const image = getArticleImage(card);
  const title = getArticleTitle(card);

  document.title = title;

  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute('href', canonicalUrl);

  upsertMeta('meta[name="description"]', { name: 'description', content: description });
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'article' });
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
}

const slug = getSlugFromURL();
const card = blogData.cards.find((c) => getArticleSlug(c) === slug);

if (card) {
  setArticleMeta(card);

  let schema = document.querySelector('#article-schema');
  if (!schema) {
    schema = document.createElement('script');
    schema.id = 'article-schema';
    document.head.appendChild(schema);
  }
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify(buildArticleSchema(card));
}

const heroRoot = document.querySelector('#hero-single-post');
if (heroRoot) {
  const { headingLine1, headingAccent } = card ? splitArticleTitle(card.title, 3) : {};

  heroRoot.innerHTML = card
    ? renderHero({
        className: 'half-width-bg',
        bgImage: card.image,
        headingLine1,
        headingAccent,
        text: '',
        buttons: [],
        backLink: { label: 'Back to Resources', href: '/resources/' },
      })
    : '';
}

const root = document.querySelector('#blog-post-root');
if (root) {
  root.innerHTML = renderBlogPost(card);
}
