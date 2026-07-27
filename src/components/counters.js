export function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const countersSection = document.querySelector('.map-block-counters');

  if (!countersSection || counters.length === 0) return;

  let hasAnimated = false;

  const duration = 3500; 
  const frameRate = 40; 
  const steps = duration / frameRate;

  const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

  const runCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          counters.forEach((counter) => runCounter(counter));
          hasAnimated = true;
          observer.unobserve(countersSection);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(countersSection);
}