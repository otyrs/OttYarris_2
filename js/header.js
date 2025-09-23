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

    // --- メニューを閉じる関数 ---
    function closeMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
        nav.setAttribute('aria-hidden', true);
        document.body.style.overflow = '';
    }
}

// header.htmlの内容を絶対パスで読み込み、階層に関係なく正しいパスを使用
fetch('/header.html')
    .then(response => response.text())
    .then(data => {
        // パス内の相対パスを絶対パスに変換
        const processedData = data
            .replace(/href="css\//g, 'href="/css/')
            .replace(/src="js\//g, 'src="/js/')
            .replace(/src="assets\//g, 'src="/assets/')
            .replace(/href="pages\//g, 'href="/pages/')
            .replace(/href="index\.html"/g, 'href="/index.html"');
        
        document.getElementById('header').innerHTML = processedData;
    })
    .catch(error => console.error('Header loading error:', error));