// header.js
function initHeader() {
    const hamburger = document.querySelector('.hamburger-overlay');
    const nav = document.querySelector('.nav-overlay');

    if (!hamburger || !nav) {
        console.warn("Header elements not found");
        return;
    }

    // --- ハンバーガーメニューのクリックイベント ---
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');

        const isOpen = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        nav.setAttribute('aria-hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // --- Escapeキーでメニューを閉じる ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMenu();
        }
    });

    // --- リンク以外の領域をクリックした時にメニューを閉じる ---
    nav.addEventListener('click', (e) => {
        // クリックされた要素がリンク（a要素）でない場合、メニューを閉じる
        if (e.target.tagName !== 'A' && nav.classList.contains('active')) {
            closeMenu();
        }
    });

    // --- メニューを閉じる関数 ---
    function closeMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
        nav.setAttribute('aria-hidden', true);
        document.body.style.overflow = '';
    }
}
