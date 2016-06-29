import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import ContactForm from './components/Contact-form';
import animations from './modules/animations';
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
    animations.init();
  };

  document.head.appendChild(script);
} else {
  animations.init();
}
