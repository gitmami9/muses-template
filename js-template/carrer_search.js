/* ドロップダウンリストを選択すると、カラーを黒くする */
function changeColor(element) {
  if (element.value == "") {
    element.style.color = "";
  } else {
    element.style.color = "black";
  }
}

document.getElementById("entry").addEventListener("click", function () {
  const grade = document.querySelector('select[name="grade"]').value;
  const faculty = document.querySelector('select[name="faculty"]').value;
  const content = document.querySelector('select[name="content"]').value;
  const industryType = document.querySelector(
    'select[name="industry_type"]'
  ).value;
  const termSta = document.querySelector('input[name="term_sta"]').value;
  const termEnd = document.querySelector('input[name="term_end"]').value;

  const searchParams = new URLSearchParams({
    grade,
    faculty,
    content,
    industryType,
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

  // data.jsonを読み込む
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    // 学部・学科のドロップダウンを更新
    const facultySelect = document.querySelector('select[name="faculty"]');
    data.faculty.forEach((faculty) => {
      const option = document.createElement("option");
      option.value = faculty;
      option.textContent = faculty;
      facultySelect.appendChild(option);
    });

    // 内容のドロップダウンを更新
    const contentSelect = document.querySelector('select[name="content"]');
    data.content.forEach((content) => {
      const option = document.createElement("option");
      option.value = content;
      option.textContent = content;
      contentSelect.appendChild(option);
    });

    // 業種のドロップダウンを更新
    const jobSelect = document.querySelector('select[name="industry_type"]');
    data.job.forEach((job) => {
      const option = document.createElement("option");
      option.value = job;
      option.textContent = job;
      jobSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading data.json:", error);
  }
});
