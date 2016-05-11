import Sidebar from './components/Sidebar';
import ContactForm from './components/Contact-form';
import smoothScroll from 'smooth-scroll';
import gumshoe from 'gumshoe';

const toggleContactFormButton = document.getElementById('toggle-contact-form');

const contactForm = new Sidebar('contact-form-sidebar', {
  openButtonId: 'open-contact-form',
  closeButtonId: 'close-contact-form'
});

new Sidebar('sidebar', {
  translate: 'page-content',
  openButtonId: 'open-sidebar',
  closeButtonId: 'close-sidebar'
});

new ContactForm('contact-form');

smoothScroll.init({
  speed: 800,
  easing: 'easeInOutCubic'
});

gumshoe.init({
  activeClass: 'navigation__item--active',
  offset: 50
});

toggleContactFormButton.addEventListener('click', contactForm.toggle.bind(contactForm), false);
