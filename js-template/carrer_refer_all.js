window.addEventListener("DOMContentLoaded", (event) => {
  const urlParams = new URLSearchParams(window.location.search);

  const university = urlParams.get("university") || "大学・短大";
  const grade = urlParams.get("grade") || "学年";
  const faculty = urlParams.get("faculty") || "学部・学科";
  const content = urlParams.get("content") || "内容";
  const industryType = urlParams.get("industryType") || "業種";
  const termSta = urlParams.get("termSta") || "開始日";
  const termEnd = urlParams.get("termEnd") || "終了日";

  document.getElementById(
    "aff"
  ).innerText = `${university} ${grade} ${faculty}`;
  document.getElementById("con").innerText = content;
  document.getElementById("ind").innerText = `${industryType}`;
  document.getElementById("date").innerText = `${termSta} ~ ${termEnd}`;
});
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
});
