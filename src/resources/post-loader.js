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

const slug = getSlugFromURL();
const card = blogData.cards.find((c) => (c.slug || slugify(c.title)) === slug);

if (card) {
  document.title = `${card.title} | Stevens Ventures`;

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