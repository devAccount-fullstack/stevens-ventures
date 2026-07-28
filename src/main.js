// main.js

import './style.css';
import { renderHero } from './components/hero.js';
import { renderCompanies } from './components/companies.js';
import { setupCardFilter } from './components/filterCards.js';
import { renderContentCards } from "./components/contentCards";
import { initCounters } from './components/counters.js';
import { renderOperateSuccessfully } from './components/operatesuccessfully.js';
import { renderCardSlider } from './components/cardSlider.js';

// Import data
import { heroSections } from './data/heroData.js';
import { careersData } from './data/careersData.js';
import { resourcesData } from './data/resourcesData.js';
import { categories, cards } from './data/companiesData.js';
import { operateData } from './data/operateData.js';

// Single guarded helper for EVERY DOM write in this file.
// If the target element doesn't exist on the current page, it just skips —
// it can never throw "Cannot set properties of null", and it can never
// block the rest of the script from running.
function renderIfExists(selector, renderFn, ...args) {
  const element = document.querySelector(selector);
  if (!element) {
    return null;
  }
  element.innerHTML = renderFn(...args);
  return element;
}

// Render hero sections
// NOTE: renderIfExists expects (selector, renderFn, ...args) — the render
// FUNCTION has to be passed explicitly, not just the data. Passing the data
// object where renderFn belongs makes it try to call the object as a
// function, which throws and (same as before) blocks every render call
// after it in this file.
renderIfExists('#hero-section', renderHero, heroSections.hero1);
renderIfExists('#hero-section-2', renderHero, heroSections.hero2);
renderIfExists('#hero-section-3', renderHero, heroSections.hero3);
renderIfExists('#hero-section-4', renderHero, heroSections.hero4);
renderIfExists('#hero-section-about', renderHero, heroSections.heroAbout);

// ---- Careers ----
renderIfExists('#careers', renderCardSlider, careersData);

// ---- Resources ----
renderIfExists('#resources', renderContentCards, resourcesData);

// ---- Companies ----
const companiesEl = renderIfExists('#companies-cards', renderCompanies, { categories, cards });
if (companiesEl) {
  setupCardFilter({ perBatch: 6 });
}

// ---- Operate section ----
renderIfExists('#operate-successfully-placeholder', renderOperateSuccessfully, operateData);

initCounters();

// ---- Scroll effects (header hide/show + parallax) ----
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


import './assets/js/script.js';