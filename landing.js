const preloader = document.querySelector('.skiper10-preloader');
const menuButton = document.querySelector('.mobile-menu');
const mainNavigation = document.querySelector('#main-nav');
menuButton?.addEventListener('click', () => {
  const isOpen = mainNavigation?.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});
document.querySelectorAll('img[src="resources/piña.jpeg"]').forEach((image) => {
  image.src = 'resources/pina-md2-editorial.png';
  image.alt = 'Piña MD2 fresca, seleccionada para exportación';
});
document.querySelector('#main-nav a[href="#productos"]')?.setAttribute('href', 'productos.html');
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

document.querySelector('.skiper19-trail')?.remove();
const hero = document.querySelector('.hero');
const updateScrollEffects = () => {
  const progress = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  if (hero) hero.style.backgroundPosition = `center ${progress * 18}px`;
  document.querySelectorAll('.skiper16-stack .product-card').forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const amount = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
    if (window.innerWidth > 760) card.style.transform = `scale(${1 - (1 - amount) * index * .025})`;
  });
};
window.addEventListener('scroll', updateScrollEffects, { passive: true });
updateScrollEffects();
