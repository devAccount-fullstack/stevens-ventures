export function renderHero({
  bgImage = '',
  headingLine1 = 'Investing in Tomorrow.',
  headingAccent = 'Today.',
  text = '',
  buttons = [
  {
    label: 'Apply',
    href: '/apply',
    style: 'gray',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12.7 13.043H8.272C6.742 13.043 5.5 11.801 5.5 10.271C5.5 8.74102 6.742 7.49902 8.272 7.49902H14.365M13.0867 8.89359L14.4997 7.47159L13.0867 6.05859M12.7 19C17.2 19 19 17.2 19 12.7V7.3C19 2.8 17.2 1 12.7 1H7.3C2.8 1 1 2.8 1 7.3V12.7C1 17.2 2.8 19 7.3 19H12.7Z" stroke="white" stroke-opacity="0.6" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    label: 'Invest',
    href: '#',
    style: 'accent',
    icon: `<img src="/images/daf.svg" alt="">`,
  },
],
} = {}) {
  const buttonsHtml = buttons
    .map(
      (btn) => `
        <a class="btn ${btn.style || 'gray'} icon" href="${btn.href || '#'}">
          ${btn.icon || ''}
          ${btn.label}
        </a>
      `
    )
    .join('');

  return `
    <section class="hero full-width-bg" style="--parallax-offset: 0px; background-image: url('${bgImage}');">
      <div class="content-wrapper">
        <div class="text-wrapper">
          <div class="heading">
            <h1>${headingLine1} <span class="accent">${headingAccent}</span></h1>
          </div>
        </div>
        <div class="text-button">
          ${text ? `<p class="text">${text}</p>` : ''}
          ${buttons.length ? `<div class="button-group-wrapper">${buttonsHtml}</div>` : ''}
        </div>
      </div>
    </section>
  `;
}