import navigation from './modules/navigation';

const sidebarOpenButton = document.getElementById('open-sidebar'),
  sidebarCloseButton = document.getElementById('close-sidebar');

sidebarOpenButton.addEventListener('click', navigation.toggle, false);
sidebarCloseButton.addEventListener('click', navigation.toggle, false);

