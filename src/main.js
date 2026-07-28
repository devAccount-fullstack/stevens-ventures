// main.js

import './style.css';
import { renderHero } from './components/hero.js';
import { renderCompanies } from './components/companies.js';
import { setupCardFilter } from './components/filterCards.js';
import { renderContentCards } from "./components/contentCards";
import { initCounters } from './components/counters.js';
import { renderOperateSuccessfully } from './components/operatesuccessfully.js';
import { renderCardSlider } from './components/cardSlider.js';
import './assets/js/script.js';

// Import data
import { careersData } from './data/careersData.js';
import { resourcesData } from './data/resourcesData.js';
import { categories, cards } from './data/companiesData.js';
import { operateData } from './data/operateData.js';

function renderHeroIfExists(selector, data) {
  const element = document.querySelector(selector);

  if (!element) return;

  element.innerHTML = renderHero(data);
}

renderHeroIfExists('#hero-section', {
   bgImage: '/images/hero-section.webp',
    headingLine1: 'Investing in Tomorrow.',
    headingAccent: 'Today.',
    text: 'Our fund focus on new, innovative models in the consumer internet and business services.',
    buttons: [
      { label: 'Apply', href: '/apply', style: 'gray', icon: '<img src="/images/curve-arrow.svg" alt="">' },
      { label: 'Invest', href: '/invest', style: 'accent', icon: '<img src="/images/daf.svg" alt="">' },
    ],
});

renderHeroIfExists('#hero-section-2', {
  bgImage: '/images/automotive-retail.webp',
    headingLine1: 'We Develop',
    headingAccent: 'Automotive Retail.',
    text: 'Our fund focus on new, innovative models in the consumer internet and business services.',
    buttons: [
      { label: 'Go on Website', href: '/', style: 'gray', icon: '<img src="/images/arrow-circle.svg" alt="">' },
    ],
});

renderHeroIfExists('#hero-section-3', {
   bgImage: '/images/philantrophic-foundation.webp',
  headingLine1: 'Stevens Philanthropic',
  headingAccent: 'Foundation',
  text: "The Stevens Foundation allows the pair's diverse philanthropic and charitable interests to converge under one umbrella.",
  buttons: [
    { label: 'Go on Website', href: '/', style: 'gray', icon: '<img src="/images/arrow-circle.svg" alt="">' },
  ],
});

renderHeroIfExists('#hero-section-about', {
  bgImage: '/images/about-us-hero.jpg',
  headingLine1: 'About',
  headingAccent: 'Us',
  text: "",
  buttons: [ ],
});

document.getElementById('careers').innerHTML = renderCardSlider(careersData);


document.querySelector("#resources").innerHTML = renderContentCards(resourcesData);

document.querySelector('#companies-cards').innerHTML = renderCompanies({ categories, cards });
setupCardFilter({ perBatch: 6 });

document.querySelector('#operate-successfully-placeholder').innerHTML = renderOperateSuccessfully(operateData);
initCounters();


import('./assets/js/script.js').catch((err) => {
  console.error('script.js failed to load/run:', err);
});