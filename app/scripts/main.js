import navigation from './modules/navigation';

const asideOpenButton = document.getElementById('open-aside'),
  asideCloseButton = document.getElementById('close-aside');

asideOpenButton.addEventListener('click', navigation.toggle, false);
asideCloseButton.addEventListener('click', navigation.toggle, false);

