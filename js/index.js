document.addEventListener("DOMContentLoaded", () => {

    // --- HTML を指定の要素に読み込む関数 ---
    const loadHtmlComponent = (elementId, url, callback) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${url} の読み込みに失敗しました: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = html;
                    if (typeof callback === "function") callback();
                }
            })
            .catch(err => console.error(err));
    };

    // --- 共通パーツを読み込む ---
    loadHtmlComponent("header", "/partials/header.html", () => {
        if (typeof initHeader === "function") initHeader();
    });
    loadHtmlComponent("footer", "/partials/footer.html");

    // --- URL と HTML ファイルのマッピング ---
    const mainRoutes = {
        "/": "/partials/main.html",
        "/index.html": "/partials/main.html",
        "/pages/about.html": "/pages/about.html",
        // OYページは動的に対応
    };

    // --- OYページ用の簡易ルール ---
    const getOYPageUrl = (path) => {
        const match = path.match(/\/oy0*(\d+)\.html$/i); // /oy01.html, /oy02.html など
        if (match) return `/pages/oy0${match[1]}.html`;  // 先頭に / を付ける
        return null;
    };

    // --- メインコンテンツ読み込み関数 ---
    const loadMainContent = (url) => {
        url = url.toLowerCase(); // 小文字統一
        const componentUrl = mainRoutes[url] || getOYPageUrl(url) || "/partials/main.html";
        loadHtmlComponent("main", componentUrl); // fetch のパスは常に絶対パス
    };

    // --- 初期ロード ---
    loadMainContent(window.location.pathname);

    // --- ブラウザ戻る/進むボタン対応 ---
    window.addEventListener("popstate", () => {
        loadMainContent(window.location.pathname);
    });

});
