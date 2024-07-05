document.addEventListener("DOMContentLoaded", () => {
  // セッションストレージからユーザー名を取得
  const username = sessionStorage.username;
  // ユーザー名が存在しない場合はログインページにリダイレクト
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
  }
  // ユーザー名を表示する要素にユーザー名をセット
  document.querySelector("#user_name span").textContent = username;

  // ユーザー名をキーにしてローカルストレージからデータを取得
  const userData = localStorage.getItem(username);
  if (userData) {
    const parsedData = JSON.parse(userData);
    // 必要な情報を表示する部分にデータをセット
    if (parsedData.length > 0) {
      const latestData = parsedData[parsedData.length - 1];
      document.getElementById("company").value = latestData.enterprise;
      document.getElementById("industry_type").textContent =
        latestData.industry_type;
      document.getElementById("record").textContent = latestData.content;
      document.getElementById(
        "term"
      ).textContent = `${latestData.term_sta} 〜 ${latestData.term_end}`;
      document.getElementById("occupation").textContent = latestData.occupation;
    }
  } else {
    // データが存在しない場合の処理
    console.log("保存されたデータがありません");
  }
});
