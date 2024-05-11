"use strict";

// スクリプトの実行をDOMContentLoadedイベント後に設定
document.addEventListener("DOMContentLoaded", async () => {
  // セッションストレージからユーザー名を取得
  const username = sessionStorage.username;
  // ユーザー名が存在しない場合はログインページにリダイレクト
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
  }
  // ユーザー名を表示する要素にユーザー名をセット
  document.querySelector("#user_name span").textContent = username;

  // データを取得して未読メッセージ数を表示
  const res = await fetch("data.json");
  const obj = await res.json();

  document
    .querySelectorAll("span.unread")
    .forEach((el) => (el.textContent = obj.list.length));
});
