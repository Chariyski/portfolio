import navigation from './modules/navigation';
import smoothScroll from 'smooth-scroll';
import gumshoe from 'gumshoe';

const sidebarOpenButton = document.getElementById('open-sidebar'),
  sidebarCloseButton = document.getElementById('close-sidebar');

sidebarOpenButton.addEventListener('click', navigation.toggle, false);
sidebarCloseButton.addEventListener('click', navigation.toggle, false);

smoothScroll.init({
  speed: 800,
  easing: 'easeInOutCubic'
});

gumshoe.init({
  activeClass: 'navigation__item--active',
  offset: 50
});
