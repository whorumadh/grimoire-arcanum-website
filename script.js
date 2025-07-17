document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const logoContainer = document.querySelector('.logo-container');
    const nav = document.getElementById('main-nav');

    header.addEventListener('mouseenter', function() {
        logoContainer.style.opacity = 0;
        nav.style.opacity = 1;
    });

    header.addEventListener('mouseleave', function() {
        logoContainer.style.opacity = 1;
        nav.style.opacity = 0;
    });
});