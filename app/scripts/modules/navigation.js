const navigation = {
  toggle() {
    const sidebarSection = document.getElementById('sidebar');

    sidebarSection.classList.toggle('sidebar--open');
  }
};

export default navigation;
