document.addEventListener('DOMContentLoaded', function() {
    // --- Código de la barra de navegación (Navbar Logic) ---
    const header = document.querySelector('header');
    const logoContainer = document.querySelector('.logo-container');
    const nav = document.getElementById('main-nav');
    const mainLogo = document.getElementById('main-logo');

    const tabletAndMobileMediaQuery = window.matchMedia('(max-width: 768px)');

    function enableDesktopHoverLogic() {
        mainLogo.removeEventListener('click', toggleNavOnClick);
        document.removeEventListener('click', closeNavOnOutsideClick);
        nav.querySelectorAll('a').forEach(link => {
            link.removeEventListener('click', closeNavOnLinkClick);
        });

        logoContainer.style.opacity = 1;
        nav.style.opacity = 0;
        nav.classList.remove('show');

        header.addEventListener('mouseenter', handleMouseEnter);
        header.addEventListener('mouseleave', handleMouseLeave);

        mainLogo.style.cursor = 'default';
    }

    function enableMobileClickLogic() {
        header.removeEventListener('mouseenter', handleMouseEnter);
        header.removeEventListener('mouseleave', handleMouseLeave);

        logoContainer.style.opacity = 1;
        nav.style.opacity = 0;
        nav.classList.remove('show');
        nav.style.top = '';
        nav.style.left = '';
        nav.style.transform = '';

        mainLogo.addEventListener('click', toggleNavOnClick);
        document.addEventListener('click', closeNavOnOutsideClick);
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeNavOnLinkClick);
        });

        mainLogo.style.cursor = 'pointer';
    }

    function handleMouseEnter() {
        logoContainer.style.opacity = 0;
        nav.style.opacity = 1;
        nav.style.pointerEvents = 'auto';
    }

    function handleMouseLeave() {
        logoContainer.style.opacity = 1;
        nav.style.opacity = 0;
        nav.style.pointerEvents = 'none';
    }

    function toggleNavOnClick() {
        nav.classList.toggle('show');
    }

    function closeNavOnOutsideClick(event) {
        if (!mainLogo.contains(event.target) && !nav.contains(event.target)) {
            if (nav.classList.contains('show')) {
                nav.classList.remove('show');
            }
        }
    }

    function closeNavOnLinkClick() {
        if (nav.classList.contains('show')) {
            nav.classList.remove('show');
        }
    }

    function checkMediaQuery() {
        if (tabletAndMobileMediaQuery.matches) {
            enableMobileClickLogic();
            console.log('Modo Tablet/Móvil: Interacción por clic.');
        } else {
            enableDesktopHoverLogic();
            console.log('Modo Desktop: Interacción por hover.');
        }
    }

    checkMediaQuery();
    tabletAndMobileMediaQuery.addListener(checkMediaQuery);
});