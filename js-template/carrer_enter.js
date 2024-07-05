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

  // data.jsonからデータを取得してドロップダウンリストを更新
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    populateDropdown("faculty", data.faculty);
    populateDropdown("content", data.content);
    populateDropdown("industry_type", data.job);
  } catch (error) {
    console.error("Error loading data:", error);
  }
});

/* ドロップダウンリストを選択すると、カラーを黒くする */
function changeColor(hoge) {
  if (hoge.value == 0) {
    hoge.style.color = "";
  } else {
    hoge.style.color = "black";
  }
}

function populateDropdown(id, options) {
  const select = document.getElementById(id);
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    select.appendChild(opt);
  });
}

function saveToLocalStorage() {
  const university = document.getElementById("university").value;
  const faculty = document.getElementById("faculty").value;
  const grade = document.getElementById("grade").value;
  const content = document.getElementById("content").value;
  const enterprise = document.getElementById("enterprise").value;
  const industry_type = document.getElementById("industry_type").value;
  const occupation = document.getElementById("occupation").value;
  const term_sta = document.getElementById("term_sta").value;
  const term_end = document.getElementById("term_end").value;

  const formData = {
    university,
    faculty,
    grade,
    content,
    enterprise,
    industry_type,
    occupation,
    term_sta,
    term_end,
  };

  let existingData = localStorage.getItem("careerFormData");
  existingData = existingData ? JSON.parse(existingData) : [];

  // 新しいデータを既存データに追加
  existingData.push(formData);

  // ローカルストレージに保存
  localStorage.setItem("careerFormData", JSON.stringify(existingData));
  alert("データが保存されました");
  location.href = "carrer_menu.html";
}

/* 試験中 */
document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      populateDropdown("faculty", data.faculty);
      populateDropdown("content", data.content);
      populateDropdown("industry_type", data.job);
    })
    .catch((error) => console.error("Error loading JSON:", error));
});

function populateDropdown(elementId, items) {
  const dropdown = document.getElementById(elementId);
  items.forEach((item) => {
    const option = document.createElement("option");
    option.textContent = item;
    dropdown.appendChild(option);
  });
}

function changeColor(select) {
  if (select.value) {
    select.style.color = "black";
  } else {
    select.style.color = "gray";
  }
}
