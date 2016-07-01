import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import ContactForm from './components/Contact-form';
import animations from './modules/animations';
import LazyLoad from './modules/lazy-load';
import smoothScroll from 'smooth-scroll';
import gumshoe from 'gumshoe';

const toggleContactFormButton = document.getElementById('toggle-contact-form');
const portfolioSection = document.getElementById('portfolio');
const contactForm = new Sidebar('contact-form-sidebar', {
  openButtonId: 'open-contact-form',
  closeButtonId: 'close-contact-form'
});

/**
 * Initializations
 */

new Sidebar('sidebar', {
  translate: 'page-content',
  openButtonId: 'open-sidebar',
  closeButtonId: 'close-sidebar'
});

const portfolioModal = new Modal('modal-portfolio');

smoothScroll.init({
  speed: 800,
  easing: 'easeInOutCubic'
});

gumshoe.init({
  activeClass: 'c-navigation__item--is-active',
  offset: 50
});

new ContactForm('contact-form');

/**
 * Event listeners
 */
console.log('init');

// Dynamically add files for faster load time.
document.body.onload = function () {
  document.getElementById('footer').classList.add('l-footer--background-image');
};

toggleContactFormButton.addEventListener('click', contactForm.toggle.bind(contactForm), false);

portfolioSection.addEventListener('click', function (event) {
  const target = event.target;

  if (target.getAttribute('data-modal') !== null) {
    portfolioModal.open(target);
  }
}, false);

/**
 * Polyfills
 */

if (window.IntersectionObserver === undefined) {
  const script = document.createElement('script');

  script.src = '/vendor/intersection-observer-polyfill.min.js';
  script.onload = function () {
    new LazyLoad('[data-lazy-load="portfolio-thumbnail"]');
    animations.init();
  };

  document.head.appendChild(script);
} else {
  new LazyLoad('[data-lazy-load="portfolio-thumbnail"]');
  animations.init();
}
