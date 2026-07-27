// src/assets/js/script.js

$(document).ready(function () {
  // CARDS FILTER
  let activeCat = "all";
  let cardsPerBatch = 6;
  let visibleCount = 0;
  
  function updateSeeMoreButton(filteredCards) {
    if (visibleCount >= filteredCards.length) {
      $("#see-more").hide();
    } else {
      $("#see-more").show();
    }
  }
  
  function showNextBatch(filteredCards) {
    const toShow = filteredCards.slice(visibleCount, visibleCount + cardsPerBatch);
    toShow.show();
    visibleCount += toShow.length;
    updateSeeMoreButton(filteredCards);
  }
  
  function filterCards(categoryClass) {
    let allCards = $("#cards .card");
    let filteredCards = [];
  
    if (categoryClass === "all") {
      allCards.hide();
      filteredCards = allCards;
    } else {
      allCards.hide();
      filteredCards = allCards.filter("." + categoryClass);
    }
  
    visibleCount = 0;
    showNextBatch(filteredCards);
    activeCat = categoryClass;
  }
  
  // Category button click handlers - NOW ONLY TARGETING .cat WITHIN #categories
  $("#categories .cat").click(function () {
    const categoryMap = {
      "cat-all": "all",
      "cat-tech": "card-tech",
      "cat-auto": "card-auto",
      "cat-inv": "card-inv",
      "cat-rent": "card-rent",
      "cat-sta": "card-sta",
      "cat-film": "card-film",
    };
  
    const classList = $(this).attr("class").split(" ");
    const matchedClass = classList.find(cls => categoryMap[cls]);
    const selectedCategory = categoryMap[matchedClass];
  
    $("#categories .cat").removeClass("active");
    $(this).addClass("active");
  
    filterCards(selectedCategory);
  });
  // CARDS FILTER
  
  // CARDS SEE MORE
  $("#see-more").click(function () {
    const currentFiltered = activeCat === "all"
      ? $("#cards .card")
      : $("#cards .card." + activeCat);

    showNextBatch(currentFiltered);
  });

  // Initialize cards filter
  $("#categories .cat-all").addClass("active");
  filterCards("all");
  // CARDS SEE MORE

  // JOB FILTER - NOW USING .job-cat INSTEAD OF .cat
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: 2,
    slidesPerColumn: 2,
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      992: {
        slidesPerView: 2.6,
        pagination: {
          el: "",
        },
      },
      767: {
        slidesPerView: 1.2,
        pagination: {
          el: ".swiper-pagination",
        },
      },
      320: {
        slidesPerView: 1.1,
        pagination: {
          el: ".swiper-pagination",
        },
      },
    },
  });
  
  // JOB Category Filter
  let activeJobCat = "";

  function setActiveJobButton(selector) {
    $(".job-cat").removeClass("active");
    $(selector).addClass("active");
  }
  
  function filterJobGroup(group, buttonSelector) {
    if (activeJobCat !== group) {
      $(".swiper-slide.job").hide();
      $(".swiper-slide.job." + group).show();
      swiper.update();
      activeJobCat = group;
      setActiveJobButton(buttonSelector);
    }
  }
  
  $(".job-cat-all").click(function () {
    $(".swiper-slide.job").show();
    swiper.update();
    activeJobCat = "all";
    setActiveJobButton(".job-cat-all");
  });
  $(".job-cat-mech").click(function () {
    filterJobGroup("job-mech", ".job-cat-mech");
  });
  $(".job-cat-sales").click(function () {
    filterJobGroup("job-sales", ".job-cat-sales");
  });
  $(".job-cat-accnt").click(function () {
    filterJobGroup("job-accnt", ".job-cat-accnt");
  });
  $(".job-cat-marketers").click(function () {
    filterJobGroup("job-marketers", ".job-cat-marketers");
  });
  
  // Set default active state
  setActiveJobButton(".job-cat-all");
  // JOB FILTER

  // Detailed Page Sidebar Display Title when scrolling - FIXED with null check
  const $title = $('.js-inner-list .title');
  const $contentWrapper = $('.js-inner-content-wrapper');
  
  // Only run this if the elements exist on the page
  if ($title.length && $contentWrapper.length) {
    const contentOffset = $contentWrapper.offset().top;

    $(window).on('scroll', function () {
      if ($(window).scrollTop() > contentOffset - 100) {
        $title.addClass('visible');
      } else {
        $title.removeClass('visible');
      }
    });
  }

  // Detailed Page - Update the active class when the link is click
  $('.js-link .inner-link').on('click', function () {
    $('.js-link .inner-item').removeClass('active');
    $(this).closest('li').addClass('active');
  });
});

// DOM CONTENT LOADED - For Article Swiper and other features
document.addEventListener("DOMContentLoaded", function () {
  // HEADER DROPDOWN ON MOBILE
  const menuToggle = document.getElementById('dropHeader');
  const main = document.querySelector('main');
  const body = document.body;

  let menuOpen = false;

  if (menuToggle) {
    $(menuToggle).click(function () {
      menuOpen = !menuOpen;
      main.classList.toggle('blur', menuOpen);
      body.classList.toggle('blur', menuOpen);
    });
  }
  // HEADER DROPDOWN ON MOBILE

  // Article Swiper - FIXED with better configuration
  const articleContainer = document.querySelector(".swiper-article-container");
  const slides = articleContainer ? articleContainer.querySelectorAll('.swiper-slide') : [];
  
  if (slides.length > 0) {
    const hasMoreThan3Slides = slides.length > 3;
    
    const swiperArticle = new Swiper(".swiper-article-container", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      allowTouchMove: true,
      centeredSlides: false,
      navigation: hasMoreThan3Slides ? {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      } : false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
          allowTouchMove: true,
          navigation: hasMoreThan3Slides ? {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          } : false,
        },
        992: {
          slidesPerView: 3,
    
      
          navigation: hasMoreThan3Slides ? {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          } : false,
        }
      }
    });
  }

  // Truncate Career Texts
  function truncateText(selector, maxLength) {
    document.querySelectorAll(selector).forEach(el => {
      const text = el.textContent.trim();

      if (text.length > maxLength) {
        let truncated = text.substring(0, maxLength);
        truncated = truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
        el.textContent = truncated;
      }
    });
  }
  truncateText(".article-description", 104);

  function truncateTitle(selector, maxLength) {
    document.querySelectorAll(selector).forEach(el => {
      const text = el.textContent.trim();

      if (text.length > maxLength) {
        let truncated = text.substring(0, maxLength);
        truncated = truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
        el.textContent = truncated;
      }
    });
  }
  truncateTitle(".article-title", 55);
});

// SCROLL EVENTS - Header hide/show and Parallax - FIXED to prevent multiple listeners
(function() {
  let lastScrollY = window.scrollY;
  const header = document.getElementById("header");
  
  // Remove any existing scroll listeners to prevent duplicates
  window.removeEventListener('scroll', window._scrollHandler);
  
  window._scrollHandler = function() {
    const currentScrollY = window.scrollY;
  
    if (header) {
      if (currentScrollY > lastScrollY) {
        header.style.transform = "translateY(-100px)";
      } else if (currentScrollY < lastScrollY) {
        header.style.transform = "translateY(0)";
      }

      if (currentScrollY > 0) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  
    lastScrollY = currentScrollY;
    
    // Parallax effects
    const windowHeight = window.innerHeight;
    const maxOffset = 220;

    const hero = document.querySelector('.hero.full-width-bg');
    if (hero) {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < windowHeight) {
        const scrollPosition = window.scrollY;
        const offset = Math.min(scrollPosition / 3, maxOffset);
        hero.style.setProperty('--parallax-offset', `${offset}px`);
      }
    }

    const sections = document.querySelectorAll('.full-width-bg:not(.hero)');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();

      if (rect.bottom > 0 && rect.top < windowHeight) {
        const elementPosition = rect.top;
        const startValue = -284;
        const endValue = 0;
        const range = endValue - startValue;
        const normalizedPosition = 1 - Math.max(0, Math.min(1, elementPosition / windowHeight));
        const offset = startValue + (normalizedPosition * range);
        section.style.setProperty('--parallax-offset', `${offset}px`);
      }
    });
  };
  
  window.addEventListener('scroll', window._scrollHandler);
})();

// COUNTERS ANIMATION
const counters = document.querySelectorAll(".counter");
const countersSection = document.querySelector(".map-block-counters");
let hasAnimated = false;

const duration = 3500; 
const frameRate = 40; 
const steps = duration / frameRate;

const easeInOutSine = (t) => {
  return -(Math.cos(Math.PI * t) - 1) / 2;
};

const runCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  let step = 0;

  const updateCounter = () => {
    const progress = step / steps;
    const easedProgress = easeInOutSine(progress);
    const current = Math.round(target * easedProgress);
    counter.innerText = current;

    if (step < steps) {
      step++;
      setTimeout(updateCounter, frameRate);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasAnimated) {
      counters.forEach(counter => runCounter(counter));
      hasAnimated = true;
      observer.unobserve(countersSection);
    }
  });
}, {
  threshold: 0.3
});

if (countersSection) {
  observer.observe(countersSection);
}