// header.js
function initHeader() {
    const hamburgerOverlay = document.querySelector('.hamburger-overlay');
    const navOverlay = document.querySelector('.nav-overlay');

    if (hamburgerOverlay && navOverlay) {
        hamburgerOverlay.addEventListener('click', function() {
            const isOpen = navOverlay.getAttribute('aria-hidden') === 'false';
            
            if (isOpen) {
                navOverlay.setAttribute('aria-hidden', 'true');
                hamburgerOverlay.setAttribute('aria-expanded', 'false');
                navOverlay.classList.remove('nav-overlay--open');
            } else {
                navOverlay.setAttribute('aria-hidden', 'false');
                hamburgerOverlay.setAttribute('aria-expanded', 'true');
                navOverlay.classList.add('nav-overlay--open');
            }
        });
    }
}

// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', initHeader);