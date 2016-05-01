import Sidebar from './components/Sidebar';
import smoothScroll from 'smooth-scroll';
import gumshoe from 'gumshoe';

new Sidebar('sidebar', {
  translate: 'page-content',
  openButtonId: 'open-sidebar',
  closeButtonId: 'close-sidebar'
});

smoothScroll.init({
  speed: 800,
  easing: 'easeInOutCubic'
});

gumshoe.init({
  activeClass: 'navigation__item--active',
  offset: 50
});
