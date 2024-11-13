const linksFromMenu = Array.from(document.querySelectorAll('.menu__link'));

linksFromMenu.forEach(link => {
  link.addEventListener('click', function(event) {
    const item = this.closest('.menu__item');
    const submenu = item.querySelector('.menu_sub');

    if (submenu) {
      event.preventDefault();

      const otherSubs = document.querySelectorAll('.menu_sub.menu_active');
      otherSubs.forEach(otherSub => {
        if (otherSub !== submenu) {
          otherSub.classList.remove('menu_active'); 
        }
      });

      if (submenu.classList.contains('menu_active')) {
        submenu.classList.remove('menu_active'); 
      } else {
        submenu.classList.add('menu_active'); 
      } 
    }
  });
});