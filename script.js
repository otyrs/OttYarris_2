// ===============================
// Navbar Toggler
// ===============================
function initNavbarToggle() {
    const toggler = document.getElementById('navbarToggler');
    const nav = document.getElementById('navbarNav');

    // 要素が存在しない場合のデバッグ
    if (!toggler || !nav) {
        console.error('Navbar elements not found:', { toggler, nav });
        return;
    }

    // 初期状態をリセット
    nav.classList.remove('show');
    nav.style.display = 'none';
    toggler.style.display = 'block'; // トグルボタンが常に表示
    toggler.style.pointerEvents = 'auto'; // クリック/タッチを確実に受け付ける
    toggler.style.zIndex = '1000'; // 他の要素に隠れない

    // メニュー切り替え関数
    const toggleMenu = (e) => {
        e.preventDefault(); // デフォルト動作を防止
        console.log('Toggler activated'); // デバッグ用
        if (nav.classList.contains('show')) {
            nav.classList.remove('show');
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.classList.add('show');
        }
    };

    // クリックとタッチイベントを追加
    toggler.addEventListener('click', toggleMenu);
    toggler.addEventListener('touchstart', toggleMenu, { passive: false });

    // リンククリックでメニューを閉じる
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.style.pointerEvents = 'auto'; // リンクがクリック可能
        link.style.zIndex = '1000'; // リンクが隠れない
        const closeMenu = (e) => {
            e.preventDefault(); // デフォルト動作を防止
            console.log('Nav link clicked:', link.textContent); // デバッグ用
            nav.classList.remove('show');
            nav.style.display = 'none';
            // ページ遷移を許可（必要に応じてコメント解除）
            if (link.href) {
                window.location.href = link.href;
            }
        };
        link.addEventListener('click', closeMenu);
        link.addEventListener('touchstart', closeMenu, { passive: false });
    });
}

// ===============================
// DOMContentLoaded
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    initNavbarToggle();
});

// ===============================
// Loading Overlay
// ===============================
function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) {
        document.body.style.overflow = '';
        return;
    }
    overlay.style.display = 'none'; // アニメーションなしで即非表示
    document.body.style.overflow = ''; // スクロール有効化
}

function waitForMediaLoad() {
    const images = Array.from(document.images);
    const videos = Array.from(document.querySelectorAll('video'));
    const total = images.length + videos.length;
    let loaded = 0;
    let overlayHidden = false;

    function checkDone() {
        loaded++;
        if (!overlayHidden && loaded >= total) {
            hideLoadingOverlay();
            overlayHidden = true;
        }
    }

    if (total === 0) {
        hideLoadingOverlay();
        return;
    }

    document.body.style.overflow = 'hidden';

    images.forEach(img => {
        if (img.complete && img.naturalWidth !== 0) {
            checkDone();
        } else {
            img.addEventListener('load', checkDone, { once: true });
            img.addEventListener('error', checkDone, { once: true });
        }
    });

    videos.forEach(video => {
        if (video.readyState >= 3) {
            checkDone();
        } else {
            video.addEventListener('loadeddata', checkDone, { once: true });
            video.addEventListener('error', checkDone, { once: true });
        }
    });

    // 最大5秒で強制解除
    setTimeout(() => {
        if (!overlayHidden) {
            hideLoadingOverlay();
            overlayHidden = true;
        }
    }, 5000);
}

// DOMContentLoadedでwaitForMediaLoadを呼び出す
document.addEventListener('DOMContentLoaded', () => {
    initNavbarToggle();
    waitForMediaLoad();
});