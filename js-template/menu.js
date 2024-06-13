"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  //HTMLドキュメントの読み込みが完了したときに実行
  const username = sessionStorage.username; //sessisonStorageからusernameを取得　sessionStorage:ブラウザを終了すると消えてしまう一時的なストレージ
  if (!username) {
    //未定義のストレージデータの場合
    window.alert("ログインしてください"); // ログインを促すアラートを表示
    location.href = "login.html"; //このURLのログインページに移動する
  }
  document.querySelector("#user_name span").textContent = username; // 取得した'username'を特定のHTML要素（'#user_name span'）に表示

  const res = await fetch("data.json");
  //'fetch("data.json")'はjsonファイルを取得するためのHTTPリクエストを送信。非同期処理であり、'promise'を返す。awaitを使用することで、'fetch'の完了（つまり、レスポンスの取得）を待つ。この間、他の処理は一時停止。
  const obj = await res.json();
  // 'res.json()'は、レスポンスボディをJSONとしてパースするメソッド。これも非同期処理であり、Promiseを返す。awaitを使用して、JSONデータのパースが完了するのを待ち、その結果をobjに格納。これで、objにはdata.jsonの内容がJavaScriptオブジェクトとして格納される。
  const data = obj.list;
  //objオブジェクトから、listプロパティを抽出してdataに格納。
  console.log(data); // デバッグ用にデータをコンソールに表示

  //未読メッセージ数更新
  document
    .querySelectorAll("span.unread")
    .forEach((el) => (el.textContent = data.length));
  // span.unread要素をすべて取得し、そのテキスト内容をdata.lengthに設定します。これは未読メッセージ数を表示するためです
  const info_list = document.querySelector("div#info_list");
  //info_listというdiv要素を取得
  for (const item of data) {
    // "data"という配列の各要素（オブジェクト）をループ処理
    const record = document.createElement("div");
    record.className = "record"; // 新しいdiv要素を作成し、クラス名を"record"に設定
    for (const [prop, val] of Object.entries(item)) {
      // "item"オブジェクトの各プロパティ（キーと値）をループ処理
      const el = document.createElement("div"); // 新しいdiv要素を作成
      if (prop == "from") {
        el.innerHTML = val; // "from"プロパティの場合、HTMLとして値を設定
      } else {
        el.textContent = val; // それ以外の場合はテキストとして値を設定
      }
      el.className = prop;
      // 要素にプロパティ名をクラス名として設定
      if (prop == "subject") {
        // "subject"プロパティの場合、追加の装飾要素を作成して追加
        const tri = document.createElement("div");
        tri.textContent = "&nbsp;"; // 空白文字を設定
        tri.className = "tri"; // クラス名を"tri"に設定
        record.appendChild(tri);
        // "record"に追加
        const mark = document.createElement("div"); // 感嘆符マークの装飾要素を作成
        mark.className = "mark"; // クラス名を"mark"に設定
        const span = document.createElement("span");
        span.textContent = "!"; // テキストとして感嘆符を設定
        span.className = "exmark"; // クラス名を"exmark"に設定
        mark.appendChild(span); // "mark"に追加
        record.appendChild(mark); // "record"に追加
      }
      record.appendChild(el); // "record"にプロパティ要素を追加
    }
    info_list.appendChild(record); // 最終的に"record"を"info_list"に追加
  }
});
