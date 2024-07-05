/* ドロップダウンリストを選択すると、カラーを黒くする */
function changeColor(hoge) {
  if (hoge.value == 0) {
    hoge.style.color = "";
  } else {
    hoge.style.color = "black";
  }
}
function changeColor(element) {
  element.style.backgroundColor = "#f0f0f0";
}

document.getElementById("entry").addEventListener("click", function () {
  const university = document.querySelector('select[name="university"]').value;
  const grade = document.querySelector('select[name="grade"]').value;
  const faculty = document.querySelector('select[name="faculty"]').value;
  const content = document.querySelector('select[name="content"]').value;
  const industryType = document.querySelector(
    'select[name="industry_type"]'
  ).value;
  const termSta = document.querySelector('input[name="term_sta"]').value;
  const termEnd = document.querySelector('input[name="term_end"]').value;

  const searchParams = new URLSearchParams({
    university,
    grade,
    faculty,
    content,
    industryType,
    occupation,
    termSta,
    termEnd,
  });

  location.href = `carrer_refer_all.html?${searchParams.toString()}`;
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
