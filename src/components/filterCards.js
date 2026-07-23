export function setupCardFilter({ perBatch = 6 } = {}) {
  const catButtons = document.querySelectorAll('#categories .cat');
  const cardsContainer = document.querySelector('#cards');
  const seeMoreBtn = document.querySelector('#see-more');

  if (!cardsContainer) return;

  let activeFilter = 'all';
  let visibleCount = 0;

  function getAllCards() {
    return Array.from(cardsContainer.querySelectorAll('.card'));
  }

  function getFilteredCards() {
    const allCards = getAllCards();
    return activeFilter === 'all'
      ? allCards
      : allCards.filter((card) => card.classList.contains(activeFilter));
  }

  function showNextBatch() {
    const filtered = getFilteredCards();
    const nextSlice = filtered.slice(visibleCount, visibleCount + perBatch);
    nextSlice.forEach((card) => (card.style.display = 'block'));
    visibleCount += nextSlice.length;
    updateSeeMoreButton(filtered);
  }

  function updateSeeMoreButton(filteredCards) {
    if (!seeMoreBtn) return;
    seeMoreBtn.style.display = visibleCount >= filteredCards.length ? 'none' : 'flex';
  }

  function filterCards(filterClass) {
    getAllCards().forEach((card) => (card.style.display = 'none'));
    activeFilter = filterClass;
    visibleCount = 0;
    showNextBatch();
  }

  catButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      catButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      filterCards(btn.dataset.filter);
    });
  });

  if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', showNextBatch);
  }


  const allBtn = document.querySelector('#categories .cat[data-filter="all"]');
  if (allBtn) allBtn.classList.add('active');
  filterCards('all');
}