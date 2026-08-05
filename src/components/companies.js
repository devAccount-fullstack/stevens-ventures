export function renderCompanies({ categories = [], cards = [] } = {}) {
  const categoriesHtml = categories
    .map(
      (cat) => `
        <button class="cat ${cat.filterClass}" data-filter="${cat.filterClass === 'cat-all' ? 'all' : cat.dataFilter}">
          ${cat.label}
        </button>
      `
    )
    .join('');

  const cardsHtml = cards.map(renderCard).join('');

  return `
    <section class="global-companies">
      <div class="content-wrapper column">
        <h2 class="no-spacing">
          <span>Welcome to</span>
          Stevens Ventures Companies
        </h2>

        <div id="categories">
          ${categoriesHtml}
        </div>

        <div id="cards">
          ${cardsHtml}
        </div>

        <div class="button-group-wrapper">
          <a id="see-more" class="btn icon transparent" style="display: none;">
            <img src="/images/icon-down-gray.svg" alt="Icon arrow down">
            See More
          </a>
        </div>
      </div>
    </section>
  `;
}

function renderCard(card) {
  const categoryTags = (card.categories || [])
    .map((c) => `<p class="category ${c.class}">${c.label}</p>`)
    .join('');

  return `
    <div class="card ${(card.cardClasses || []).join(' ')}">
      <img src="${card.bgImage}" class="img-bg" alt="${card.heading || ''}">
      ${card.logo ? `<img class="logo${card.logoClass || ''}" src="${card.logo}" alt="${card.heading || ''}">` : ''}
      <div class="card-content">
        <div class="top-content">
          ${categoryTags}
          <h3 class="heading">${card.heading}</h3>
          <p class="subheading">${card.subheading}</p>
        </div>
        <a href="${card.href || ''}" class="details">Details</a>
      </div>
    </div>
  `;
}