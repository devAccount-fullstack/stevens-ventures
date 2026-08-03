import '../style.css';
import { blogData } from '../data/blogData.js';
import { renderBlogPost } from '../components/blogPost.js';
import { renderHero } from '../components/hero.js';
import { slugify } from '../utils/slugify.js';

function getSlugFromURL() {
  const match = window.location.pathname.match(/^\/resources\/([^/]+)\/?$/);
  return match ? match[1] : null;
}

const slug = getSlugFromURL();
const card = blogData.cards.find((c) => (c.slug || slugify(c.title)) === slug);

if (card) {
  document.title = `${card.title} | Stevens Ventures`;
}

// Hero — title comes from the post, background is the post thumbnail
const heroRoot = document.querySelector('#hero-single-post');
if (heroRoot) {
  heroRoot.innerHTML = card
    ? renderHero({
        className: 'half-width-bg',
        bgImage: card.image,
        headingLine1: '',
        headingAccent: card.title,
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