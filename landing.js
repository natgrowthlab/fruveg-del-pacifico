const preloader = document.querySelector('.skiper10-preloader');
window.addEventListener('load', () => window.setTimeout(() => preloader?.classList.add('is-done'), 900));

const revealTargets = document.querySelectorAll('section > *, .product-card, footer > *');
revealTargets.forEach((element, index) => {
  element.classList.add('scroll-reveal');
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
});
const revealObserver = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
  if (isIntersecting) { target.classList.add('is-visible'); revealObserver.unobserve(target); }
}), { threshold: .12 });
document.querySelectorAll('.scroll-reveal').forEach(element => revealObserver.observe(element));

const trail = document.querySelector('.skiper19-trail path');
const hero = document.querySelector('.hero');
const updateScrollEffects = () => {
  const progress = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  if (trail) trail.style.strokeDashoffset = `${progress * -260}`;
  if (hero) hero.style.backgroundPosition = `center ${progress * 18}px`;
  document.querySelectorAll('.skiper16-stack .product-card').forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const amount = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
    if (window.innerWidth > 760) card.style.transform = `scale(${1 - (1 - amount) * index * .025})`;
  });
};
window.addEventListener('scroll', updateScrollEffects, { passive: true });
updateScrollEffects();
