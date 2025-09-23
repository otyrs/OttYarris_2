// header.js
function initHeader() {
    const hamburger = document.querySelector('.hamburger-overlay');
    const nav = document.querySelector('.nav-overlay');

    if (!hamburger || !nav) {
        console.warn("no header");
        return;
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');

        const isOpen = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        nav.setAttribute('aria-hidden', !isOpen);

        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
            nav.setAttribute('aria-hidden', true);
            document.body.style.overflow = '';
        }
    });
}
