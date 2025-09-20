document.addEventListener("click", async (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  
  const regex = /^https?:\/\/monsnode\.com\/(?!v)/;
  if(!regex.test(a.href)) {
    return;
  }

  e.preventDefault(); // デフォルトの遷移を止める

  try {
    const res = await fetch(a.href, { credentials: "include" });
    const html = await res.text();

    // DOMパーサーで解析
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // 例: 最初のアンカーの href を取得
    const targetLink = doc.querySelector("a")?.href;

    if (targetLink) {
	  window.open(targetLink, "_blank");	//新規タブで開く
    } else {
      // 見つからなければ元のリンクに遷移
	  window.open(a.href, "_blank");	//新規タブで開く
    }
  } catch (err) {
    console.error("取得失敗:", err);
    window.location.href = a.href; // フォールバック
  }
});

