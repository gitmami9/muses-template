document.getElementById("company").addEventListener("change", function () {
  var selectedOption = this.value;
  var industryType = document.getElementById("industry_type");
  var record = document.getElementById("record");
  var term = document.getElementById("term");
  var occupation = document.getElementById("occupation");

  if (selectedOption === "co1") {
    industryType.textContent = "IT";
    record.textContent = "プロジェクトA";
    term.textContent = "4月16日～7月30日";
    occupation.textContent = "エンジニア";
  } else if (selectedOption === "co2") {
    industryType.textContent = "製造";
    record.textContent = "プロジェクトB";
    term.textContent = "10月12日～12月23日";
    occupation.textContent = "マネージャー";
  } else {
    industryType.textContent = "業種";
    record.textContent = "活動記録１";
    term.textContent = "期間";
    occupation.textContent = "職種";
  }
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
