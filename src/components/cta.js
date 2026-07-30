export function renderCTA({
  eyebrow = "Let's Talk",
  heading = 'Building something that solves a ',
  highlight = "real problem?",
  text = 'Reach out to tell us more about your business!',
  buttons = [
    {
      label: 'Schedule a consultation',
      href: '/contact-us/',
      style: 'btn transparent icon',
       icon: `<img src="/images/circle-arrow-right.svg" alt="">`,
    },
    {
      label: 'Email Us',
      href: 'mailto:ns@stevensventures.com',
      style: 'btn black icon',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2.5" y="4.16667" width="15" height="11.6667" rx="1.66667" stroke="white" stroke-opacity="1" stroke-width="1.15"/>
            <path d="M3.33334 5.41667L10 10.4167L16.6667 5.41667" stroke="white" stroke-opacity="1" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `,
    },
  ],
} = {}) {
  const buttonsHtml = buttons
    .map(
      (btn) => `
        <a class="btn ${btn.style || 'gray'}${btn.icon ? ' icon' : ''}" href="${btn.href || '#'}">
          ${btn.icon || ''}
          ${btn.label}
        </a>
      `
    )
    .join('');

  return `
    <section class="cta-section">
      <div class="content-wrapper">
        <div class="text-wrapper">
          <span class="cta-eyebrow">${eyebrow}</span>
          <h2 class="cta-heading no-spacing">
            ${heading} <span style="color: rgba(0, 0, 0, 0.4);">${highlight}</span>
          </h2>
        </div>
        ${text ? `
          <div class="text-button cta-btn">
            <p class="text cta-subtext">${text}</p>
          ${buttons.length ? `<div class="button-group-wrapper">${buttonsHtml}</div>` : ''}
          </div>
        ` : ''}
      </div>
    </section>
  `;
}