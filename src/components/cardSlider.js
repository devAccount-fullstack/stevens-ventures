// components/cardSlider.js

import { careersData } from '../data/careersData.js';

export function renderCardSlider() {
  const { title, categories, jobs } = careersData;
  
  const categoryButtons = categories.map(cat => 
    `<button class="job-cat ${cat.class}">${cat.label}</button>`
  ).join('');

  const jobSlides = jobs.map(job => `
    <div class="swiper-slide job job-${job.category}">
      <div class="job-wrapper">
        <p class="job-title">${job.title}</p>
        <div class="job-company">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M1 21H21M6 15.5H9M13 15.5H16M6 11H9M13 11H16M6 6.5H9M13 6.5H16M6 1C3 1 2 2.79 2 5V21H20V5C20 2.79 19 1 16 1H6Z" stroke="white" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${job.company}
        </div>
        <div class="job-location">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
            <path d="M11 7C12.6569 7 14 5.65685 14 4C14 2.34315 12.6569 1 11 1C9.34315 1 8 2.34315 8 4C8 5.65685 9.34315 7 11 7ZM11 7V14.5M14.75 11.0378C18.2731 11.6003 20.75 12.94 20.75 14.5C20.75 16.5709 16.385 18.25 11 18.25C5.615 18.25 1.25 16.5709 1.25 14.5C1.25 12.94 3.72687 11.6022 7.25 11.0378" stroke="white" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${job.location}
        </div>
        <div class="job-description">${job.description}</div>
        <div class="button-group-wrapper">
          <a class="btn accent icon" href="${job.applyLink}">Apply Now</a>
          <a class="btn transparent border-less icon" href="${job.websiteLink}">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M7.5 11H13.5M11.5 14L14.5 11L11.5 8M11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11C21 16.5228 16.5228 21 11 21Z" stroke="white" stroke-opacity="0.6" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Go on Website
          </a>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section class="careers">
      <h2>• ${title}</h2>
      <p class="categories">${categoryButtons}</p>
      <div class="swiper-container">
        <div class="swiper-wrapper">${jobSlides}</div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next">
          <img src="/images/slide-navigation.svg" alt="">
        </div>
        <div class="swiper-button-prev">
          <img src="/images/slide-navigation.svg" alt="">
        </div>
      </div>
      <div class="button-group-wrapper">
        <a class="btn transparent icon" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 15L11 12L8 9M13 15L16 12L13 9M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z" stroke="rgba(0, 0, 0, 0.6)" stroke-opacity="0.6" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          View More
        </a>
      </div>
    </section>
  `;
}