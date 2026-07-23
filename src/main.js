import './style.css';
import { renderHero } from './components/hero.js';
import { renderCompanies } from './components/companies.js';
import { setupCardFilter } from './components/filterCards.js';
import { renderContentCards } from "./components/contentCards";
import { initCounters } from './components/counters.js';
import { renderOperateSuccessfully } from './components/operatesuccessfully.js';

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

renderHeroIfExists('#hero-section-4', {
   bgImage: '/images/more-about.webp',
  headingLine1: 'More About',
  headingAccent: 'Stevens Ventures Companies',
  text: "We prefer investments that deal within our core area of expertise. More specifically, this includes online marketing services, financial services, consumer content and publishing, mobile applications, and SMB-focused SAAS models providing marketing, business operations, or technology capabilities.",
  buttons: [
    { label: 'Read More', href: '/', style: 'gray', icon: '<img src="/images/double-arrow.svg" alt="">' },
  ],
});

renderHeroIfExists('#hero-section-about', {
  bgImage: '/images/about-us-hero.jpg',
  headingLine1: 'About',
  headingAccent: 'Us',
  text: "",
  buttons: [ ],
});

document.querySelector("#resources").innerHTML = renderContentCards({
  title: "Resources",
  subtitle: "About Us",
  cards: [
    {
      image: "/images/article-img1.png",
      title: "Our Story",
      description: "Learn how Stevens Ventures began.",
      buttonText: "Read More",
      href: "/about",
    },
    {
      image: "/images/article-img2.png",
      title: "Our Mission",
      description: "Building businesses that create lasting value.",
      buttonText: "Discover",
      href: "/mission",
    },
    {
      image: "/images/article-img3.png",
      title: "Leadership",
      description: "Meet the people behind Stevens Ventures.",
      buttonText: "Meet the Team",
      href: "/leadership",
    },
  ],
  button: {
    label: "View More",
    href: "/about",
  },
});
const categories = [
  { label: 'All Companies', filterClass: 'cat-all' },
  { label: 'Technology&Marketing', filterClass: 'cat-tech', dataFilter: 'card-tech' },
  { label: 'Automotive Retail', filterClass: 'cat-auto', dataFilter: 'card-auto' },
  { label: 'Investors', filterClass: 'cat-inv', dataFilter: 'card-inv' },
  { label: 'Rental Properties', filterClass: 'cat-rent', dataFilter: 'card-rent' },
  { label: 'Short Term Accomodations', filterClass: 'cat-sta', dataFilter: 'card-sta' },
  { label: 'Film', filterClass: 'cat-film', dataFilter: 'card-film' },
];

const cards = [
  {
    cardClasses: ['card-rent', 'card-sta'],
    categories: [
      { class: 'rent', label: 'Rental Properties' },
      { class: 'sta', label: 'Short Term Accomodation' },
    ],
    bgImage: '/images/card-assets/miami-bg.png',
    logo: '/images/card-assets/miami-logo.svg',
    heading: 'Miami, FL',
    subheading: 'Miami is a vibrant coastal city known for its stunning beaches, dynamic nightlife, and diverse cultural scene.',
    href: '',
  },
  {
    cardClasses: ['card-tech'],
    categories: [
      { class: 'tech', label: 'Technology&Marketing' },
    ],
    bgImage: '/images/card-assets/yodle-bg.png',
    logo: '/images/card-assets/yodle-logo.svg',
    heading: 'Yodle',
    subheading: 'Simply put, we create digital solutions that help businesses thrive. We build results-driven marketing solutions to grow your business.',
    href: '',
  },
  {
    cardClasses: ['card-auto'],
    categories: [
      { class: 'auto', label: 'Automotive Retail' },
    ],
    bgImage: '/images/card-assets/lincoln-bg.png',
    logo: '/images/card-assets/lincoln-logo.svg',
    logoClass: 'lincoln',
    heading: 'Lincoln of Milford',
    subheading: "When you're looking for exceptional new and pre-owned vehicles at the lowest prices around, Lincoln of Milford is the place to go. We have devoted ourselves to helping and serving our customers.",
    href: '',
  },
  {
    cardClasses: ['card-tech'],
    categories: [
      { class: 'tech', label: 'Technology&Marketing' },
    ],
    bgImage: '/images/card-assets/tattoopro-bg.png',
    logo: '/images/card-assets/tattoopro-logo.svg',
    heading: 'TattooPro',
    subheading: "When you're looking for exceptional new and pre-owned vehicles at the lowest prices around, Lincoln of Milford is the place to go. We have devoted ourselves to helping and serving our customers.",
    href: '',
  },
  {
    cardClasses: ['card-auto'],
    categories: [
      { class: 'auto', label: 'Automotive Retail' },
    ],
    bgImage: '/images/card-assets/stevens-auto-group-bg.png',
    logo: '/images/card-assets/stevens-auto-group-logo.svg',
    heading: 'Stevens Auto Group',
    subheading: 'At Stevens Ford, we pride ourselves on offering an extensive inventory of Ford vehicles, from the rugged Ford F-150 to the versatile Ford Escape.',
    href: '',
  },
  {
    cardClasses: ['card-tech'],
    categories: [
      { class: 'tech', label: 'Technology&Marketing' },
    ],
    bgImage: '/images/card-assets/punchey-bg.png',
    logo: '/images/card-assets/punchey-logo.svg',
    heading: 'Punchey, Inc',
    subheading: 'Everything owners & operators need to successfully manage and grow their business. We build industry-specific apps that are tailor-designed to help local service businesses succeed.',
    href: '',
  },
  {
    cardClasses: ['card-2', 'card-tech'],
    categories: [
      { class: 'tech', label: 'Technology&Marketing' },
    ],
    bgImage: '/images/card-assets/lvs-bg.png',
    logo: '/images/card-assets/lvs-logo.svg',
    heading: 'LVS Digital',
    subheading: 'LVS Digital Marketing helps purpose driven female entrepreneurs avoid burnout, save time creating strategic content and generate more leads while setting their omni-channel marketing strategy on autopilot.',
    href: '',
  },
  {
    cardClasses: ['card-2', 'card-tech'],
    categories: [
      { class: 'tech', label: 'Technology&Marketing' },
    ],
    bgImage: '/images/card-assets/detailpropos-bg.png',
    logo: '/images/card-assets/detailpropos-logo.svg',
    heading: 'DetailPro',
    subheading: 'The Top-Rated System for Attracting, Servicing and Retaining Customers You Have Ambitions, We have the Formula Beautiful Site + Unbeatable Software + Loving Customer Service = Success.',
    href: '',
  },
  {
    cardClasses: ['card-2', 'card-auto'],
    categories: [
      { class: 'auto', label: 'Automotive Retail' },
    ],
    bgImage: '/images/card-assets/stevens-collision-bg.png',
    logo: '/images/card-assets/stevens-collision-logo.svg',
    heading: 'Stevens Collision Center',
    subheading: 'We strive to be respectful of your time without any hassle or haggle and to deliver an upfront, comfortable purchase experience!',
    href: '',
  },
  {
    cardClasses: ['card-2', 'card-auto'],
    categories: [
      { class: 'auto', label: 'Automotive Retail' },
    ],
    bgImage: '/images/card-assets/milford-bg.png',
    logo: '/images/card-assets/milford-logo.svg',
    heading: 'Stevens Ford of Milford',
    subheading: 'At Stevens Ford Of Milford, we believe that buying a vehicle in Milford should be as straight forward as possible.',
    href: '',
  },
  {
    cardClasses: ['card-2', 'card-inv'],
    categories: [
      { class: 'inv', label: 'Investors' },
    ],
    bgImage: '/images/card-assets/ventures-bg.png',
    logo: '/images/card-assets/ventures-logo.svg',
    heading: 'Stevens Ventures',
    subheading: 'At Stevens Ford Of Milford, we believe that buying a vehicle in Milford should be as straight forward as possible.',
    href: '',
  },
  {
    cardClasses: ['card-2', 'card-rent'],
    categories: [
      { class: 'rent', label: 'Rental Properties' },
    ],
    bgImage: '/images/card-assets/greenwich-bg.png',
    logo: '/images/card-assets/greenwich-logo.svg',
    heading: 'Greenwich, CT',
    subheading: 'Greenwich, CT, is a picturesque town known for its upscale living and beautiful waterfront views. Rich in history and charm, it\u2019s a favorite spot for New York City commuters.',
    href: '',
  },
  {
    cardClasses: ['card-3', 'card-rent'],
    categories: [
      { class: 'rent', label: 'Rental Properties' },
    ],
    bgImage: '/images/card-assets/nyc-bg.png',
    logo: '/images/card-assets/nyc-logo.svg',
    heading: 'Manhattan, NY',
    subheading: 'Manhattan, NY, is the bustling heart of New York City, famous for its iconic skyline and vibrant culture. Home to Times Square and Central Park, it\u2019s a global hub of finance, fashion, and entertainment.',
    href: '',
  },
  {
    cardClasses: ['card-3', 'card-sta'],
    categories: [
      { class: 'sta', label: 'Short Term Accomodations' },
    ],
    bgImage: '/images/card-assets/marthas-bg.png',
    logo: '/images/card-assets/marthas-logo.svg',
    heading: 'Martha\u2019s Vineyard',
    subheading: 'Martha\u2019s Vineyard is a charming island off the coast of Massachusetts, known for its sandy beaches and quaint seaside towns.',
    href: '',
  },
  {
    cardClasses: ['card-3', 'card-sta'],
    categories: [
      { class: 'sta', label: 'Short Term Accomodations' },
    ],
    bgImage: '/images/card-assets/sawadee-bg.png',
    logo: '/images/card-assets/sawadee-logo.svg',
    heading: 'Ko Samui',
    subheading: 'Ko Samui is a tropical paradise in Thailand, known for its palm-fringed beaches and vibrant nightlife.',
    href: '',
  },
  {
    cardClasses: ['card-3', 'card-sta'],
    categories: [
      { class: 'sta', label: 'Short Term Accomodations' },
    ],
    bgImage: '/images/card-assets/kho-pang-bg.png',
    logo: '/images/card-assets/kho-pang-logo.svg',
    heading: 'Kho Pha Ngan',
    subheading: 'Ko Pha Ngan is a Thai island famous for its legendary Full Moon Parties and lush jungle landscapes.',
    href: '',
  },
  {
    cardClasses: ['card-3', 'card-film'],
    categories: [
      { class: 'film', label: 'Films' },
    ],
    bgImage: '/images/card-assets/dead-man-bg.png',
    logo: '',
    heading: 'Dead Men Walking',
    subheading: 'Dead Man Walking is a 1995 American crime drama film starring Susan Sarandon and Sean Penn.',
    href: '',
  },
  {
    cardClasses: ['card-3', 'card-film'],
    categories: [
      { class: 'film', label: 'Films' },
    ],
    bgImage: '/images/card-assets/thebay-bg.png',
    logo: '',
    heading: 'The Bay',
    subheading: 'The Bay is a 2012 American mockumentary horror film directed by Barry Levinson and written by Michael Wallach.',
    href: '',
  },
];

document.querySelector('#companies-cards').innerHTML = renderCompanies({ categories, cards });
setupCardFilter({ perBatch: 6 });

// ===== Header scroll animation + parallax effects =====
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


document.querySelector('#operate-successfully-placeholder').innerHTML = renderOperateSuccessfully({
  heading1: 'We Operate Successfully',
  heading2: 'Even Outside the USA',
  text: 'Stevens Ventures is a venture capital and investment firm based in Milford, CT. Our primary focus is on early-stage companies that provide innovative solutions to everyday problems faced by consumers and or businesses.',
  buttons: [
    { label: 'Apply', href: '/apply', style: 'transparent', icon: '<img src="/images/circle-arrow-right.svg" alt="">' },
    { label: 'Invest', href: '/invest', style: 'black', icon: '<img src="/images/daf-gray.svg" alt="">' },
  ],
  counters: [
    { target: 12, label: 'Countries' },
    { target: 15, label: 'Investors', suffix: 'K' },
    { target: 38, label: 'Companies' },
  ],
});
initCounters();