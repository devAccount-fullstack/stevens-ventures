// components/contentCards.js Resources Section

export function renderContentCards({
  title = "",
  subtitle = "",
  cards = [],
  button = null,
} = {}) {
  const cardsHtml = cards
    .map(
      (card) => `
        <div class="swiper-slide">
          <div class="article">
            <img src="${card.image}" alt="${card.title}" class="article-img">
            <div class="article-content">
              <p class="article-title no-spacing">${card.title}</p>
              <div class="article-description">${card.description}</div>
              <a class="btn transparent border-less icon" href="${card.href ?? "/resources/"}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 15L11 12L8 9M13 15L16 12L13 9M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z" stroke="rgba(0, 0, 0, 0.6)" stroke-opacity="0.6" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ${card.buttonText ?? "Explore"}
              </a>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  // Show navigation arrows only if there are more than 3 cards
  const showNavigation = cards.length > 3;

  const navigationHtml = showNavigation ? `
    <div class="swiper-button-next">
      <img src="/assets/images/slide-navigation.svg" alt="">
    </div>
    <div class="swiper-button-prev">
      <img src="/assets/images/slide-navigation.svg" alt="">
    </div>
  ` : '';

  return `
    <section class="resources">
      <h2>
        ${title} <span style="color: rgba(0, 0, 0, 0.4);">${subtitle}</span>
      </h2>

      <div class="swiper swiper-article-container">
        <div class="swiper-wrapper articles-wrapper">
          ${cardsHtml}
        </div>
        <div class="swiper-pagination"></div>
        ${navigationHtml}
      </div>
        ${
          button
            ? `
          <div class="button-group-wrapper">
            <a class="btn transparent icon" href="${button.href}">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 15L11 12L8 9M13 15L16 12L13 9M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z" stroke="rgba(0, 0, 0, 0.6)" stroke-opacity="0.6" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              ${button.label}
            </a>
          </div>
          `
            : ""
        }

    </section>
  `;
}
