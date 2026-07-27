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
import { heroSections } from './data/heroData.js';
import { resourcesData } from './data/resourcesData.js';
import { categories, cards } from './data/companiesData.js';
import { operateData } from './data/operateData.js';

function renderHeroIfExists(selector, data) {
  const element = document.querySelector(selector);
  if (!element) return;
  element.innerHTML = renderHero(data);
}

// Render careers
document.getElementById('careers').innerHTML = renderCardSlider();

// Render hero sections
renderHeroIfExists('#hero-section', heroSections.hero1);
renderHeroIfExists('#hero-section-2', heroSections.hero2);
renderHeroIfExists('#hero-section-3', heroSections.hero3);
renderHeroIfExists('#hero-section-4', heroSections.hero4);
renderHeroIfExists('#hero-section-about', heroSections.heroAbout);

// Render resources
document.querySelector("#resources").innerHTML = renderContentCards(resourcesData);

// Render companies
document.querySelector('#companies-cards').innerHTML = renderCompanies({ categories, cards });
setupCardFilter({ perBatch: 6 });

// Render operate section
document.querySelector('#operate-successfully-placeholder').innerHTML = renderOperateSuccessfully(operateData);
initCounters();

// Init scroll effects
function initScrollEffects() {
  const header = document.getElementById('header');
  const windowHeight = window.innerHeight;
  const maxOffset = 220;
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (header) {
      if (currentScrollY > lastScrollY) {
        header.style.transform = 'translateY(-100px)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      header.classList.toggle('scrolled', currentScrollY > 0);
    }

    lastScrollY = currentScrollY;

    // Hero parallax
    const hero = document.querySelector('.hero.full-width-bg');
    if (hero) {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < windowHeight) {
        const offset = Math.min(currentScrollY / 3, maxOffset);
        hero.style.setProperty('--parallax-offset', `${offset}px`);
      }
    }

    const sections = document.querySelectorAll('.full-width-bg:not(.hero)');
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < windowHeight) {
        const startValue = -284;
        const endValue = 0;
        const range = endValue - startValue;
        const normalizedPosition = 1 - Math.max(0, Math.min(1, rect.top / windowHeight));
        const offset = startValue + normalizedPosition * range;
        section.style.setProperty('--parallax-offset', `${offset}px`);
      }
    });
  });
}

initScrollEffects();