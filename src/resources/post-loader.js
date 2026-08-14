import '../style.css';
import { blogData } from '../data/blogData.js';
import { renderBlogPost } from '../components/blogPost.js';
import { renderHero } from '../components/hero.js';
import { slugify } from '../utils/slugify.js';

function getSlugFromURL() {
  const match = window.location.pathname.match(/^\/resources\/([^/]+)\/?$/);
  return match ? match[1] : null;
}

function splitTitle(title = '', wordCount = 3) {
  const words = title.trim().split(/\s+/);
  const headingLine1 = words.slice(0, wordCount).join(' ');
  const headingAccent = words.slice(wordCount).join(' ');
  return { headingLine1, headingAccent };
}

function setArticleMeta({ title, slug, description }) {
  const canonicalUrl = `https://stevensventures.com/resources/${slug}`;

  document.title = `${title} | Stevens Ventures`;

  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute('href', canonicalUrl);

  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.setAttribute('name', 'description');
    document.head.appendChild(descTag);
  }
  descTag.setAttribute('content', description || '');
}

const slug = getSlugFromURL();
const card = blogData.cards.find((c) => (c.slug || slugify(c.title)) === slug);

if (card) {
  setArticleMeta({
    title: card.title,
    slug: card.slug || slug,
    description: card.excerpt,
  });

  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": card.title,
    "datePublished": card.date || card.publishDate,
    "author": {
      "@type": "Person",
      "@id": "https://nathanielstevens.com/#person",
      "name": "Nathaniel Stevens",
      "url": "https://nathanielstevens.com/"
    },
    "publisher": { "@id": "https://www.stevensventures.com/#organization" },
    "mainEntityOfPage": `https://www.stevensventures.com/resources/${slug}/`
  });
  document.head.appendChild(schema);
}

const heroRoot = document.querySelector('#hero-single-post');
if (heroRoot) {
  const { headingLine1, headingAccent } = card ? splitTitle(card.title, 3) : {};

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