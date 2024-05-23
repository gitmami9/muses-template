"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  //HTMLドキュメントの読み込みが完了したときに実行
  const username = sessionStorage.username; //sessionStorage:ブラウザを終了すると消えてしまう一時的なストレージ
  if (!username) {
    //未定義のストレージデータの場合
    window.alert("ログインしてください"); // アラート表示
    location.href = "login.html"; //このURLに移動する
  }
  document.querySelector("#user_name span").textContent = username; // ユーザ名を表示する要素を更新
  // data.jsonをフェッチし、その内容をオブジェクトに変換
  const res = await fetch("data.json");
  const obj = await res.json();
  const data = obj.list;
  console.log(data); // デバッグ用にデータをコンソールに表示

  //未読メッセージ数更新
  document
    .querySelectorAll("span.unread")
    .forEach((el) => (el.textContent = data.length));
  // 取得したデータを基にメッセージを作成し、info_listに追加
  const info_list = document.querySelector("div#info_list");

  for (const item of data) {
    const record = document.createElement("div");
    record.className = "record";
    for (const [prop, val] of Object.entries(item)) {
      const el = document.createElement("div");
      if (prop == "from") {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
      el.className = prop;

      if (prop == "subject") {
        const tri = document.createElement("div");
        tri.textContent = "&nbsp;";
        tri.className = "tri";
        record.appendChild(tri);

        const mark = document.createElement("div");
        mark.className = "mark";
        const span = document.createElement("span");
        span.textContent = "!";
        span.className = "exmark";
        mark.appendChild(span);
        record.appendChild(mark);
      }
      record.appendChild(el);
    }
    info_list.appendChild(record);
  }
});
