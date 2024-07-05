document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.username;
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
    return;
  }
  document.querySelector("#user_name span").textContent = username;

  const userData = localStorage.getItem(username);
  if (userData) {
    const parsedData = JSON.parse(userData);
    populateDropdown(parsedData); // ドロップダウンリストを準備
  } else {
    console.log("保存されたデータがありません");
  }
});

function populateDropdown(data) {
  const select = document.getElementById("company");
  data.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = item.enterprise;
    opt.textContent = item.enterprise;
    select.appendChild(opt);
  });

  // 初期表示を設定するために最初の企業を選択
  if (data.length > 0) {
    const initialData = data[0]; // 最初のデータを初期表示として設定
    updateDisplay(initialData);
  }
}

function selectCompany(select) {
  const username = sessionStorage.username;
  const userData = localStorage.getItem(username);
  if (userData) {
    const parsedData = JSON.parse(userData);
    const selectedCompany = select.value;
    const selectedData = parsedData.find(
      (item) => item.enterprise === selectedCompany
    );
    if (selectedData) {
      updateDisplay(selectedData); // 選択された企業名に対応するデータを表示更新
    }
  }
}

function updateDisplay(data) {
  document.getElementById("industry_type").textContent = data.industry_type;
  document.getElementById("record").textContent = data.content;
  document.getElementById(
    "term"
  ).textContent = `${data.term_sta} 〜 ${data.term_end}`;
  document.getElementById("occupation").textContent = data.occupation;
}
function changeColor(select) {
  if (select.value) {
    select.style.color = "black";
  } else {
    select.style.color = "gray";
  }
}
