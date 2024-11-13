const linksFromMenu = Array.from(document.querySelectorAll('.menu__link'));

linksFromMeny.forEach(link => {
    link.addEventListener('click', function(event) {
        const item = this.closest('.menu__item');
        const submenu = item.querySelector('.menu_sub');

        if (submenu) {
            submenu.classList.toggle('menu_active');             
            // предотвращения перехода
            //return false;
			event.preventDefault(); 			
        }
    });
});