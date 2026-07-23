export function renderContentCards({
  title = "",
  subtitle = "",
  cards = [],
  button = null,
} = {}) {
  const cardsHtml = cards
    .map(
      (card) => `
        <div class="article">
          <img src="${card.image}" alt="${card.title}" class="article-img">

          <div class="article-content">
            <p class="article-title">${card.title}</p>

            <div class="article-description">
              ${card.description}
            </div>

            <a class="btn transparent border-less icon" href="${card.href ?? "#"}">
              <img src="/images/arrow-circle.svg" alt="">
              ${card.buttonText ?? "Explore"}
            </a>
          </div>
        </div>
      `
    )
    .join("");

  return `
    <section class="resources">
      <div class="content-wrapper">

        <h2>
          ${title}
          <span>${subtitle}</span>
        </h2>

        <div class="articles-wrapper">
          ${cardsHtml}
        </div>

        ${
          button
            ? `
          <div class="button-group-wrapper">
            <a class="btn transparent icon" href="${button.href}">
              <img src="/images/icon-down-gray.svg" alt="">
              ${button.label}
            </a>
          </div>
        `
            : ""
        }

      </div>
    </section>
  `;
}