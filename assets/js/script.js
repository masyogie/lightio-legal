document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const navUl = nav ? nav.querySelector('ul') : null;
    const navToggle = nav ? nav.querySelector('.nav-toggle') : null;

    if (navToggle && navUl) {
        navToggle.addEventListener('click', function() {
            const isOpen = navUl.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            if (navUl && navUl.classList.contains('is-open')) {
                navUl.classList.remove('is-open');
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
});
