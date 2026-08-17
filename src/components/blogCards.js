import { slugify } from '../utils/slugify.js';
import { formatDisplayDate } from '../utils/formatDate.js';

export function renderBlogCards({ cards = [] } = {}) {
  const cardsHtml = cards
    .map((card) => {
      const slug = card.slug || slugify(card.title);
      const href = `/resources/${slug}`;

      return `
        <article class="blog-card">
          <a href="${href}" class="blog-card-image">
            <img src="${card.image}" alt="${card.title}">
          </a>

          <div class="blog-card-body">
            <div>
              <div class="blog-card-meta">
                <span>${card.author}</span>
                <span class="dot">&bull;</span>
                <time datetime="${card.date}">${formatDisplayDate(card.date)}</time>
              </div>

              <h3 class="blog-card-title">
                <a href="${href}">${card.title}</a>
              </h3>

              <p class="blog-card-excerpt">
                ${card.excerpt}
              </p>
            </div>

              <a class="blog-btn btn transparent border-less icon" href="${href}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 15L11 12L8 9M13 15L16 12L13 9M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z" stroke="rgba(0, 0, 0, 0.6)" stroke-opacity="0.6" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              ${card.buttonText || 'Explore'}
            </a>
          </div>
        </article>
      `;
    })
    .join('');

  return `
    <section class="blog-list">
      <div class="content-wrapper">
        <div class="blog-list-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}