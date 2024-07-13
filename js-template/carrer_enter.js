function changeColor(select) {
  if (select.value) {
    select.style.color = "black";
  } else {
    select.style.color = "gray";
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  // セッションストレージからユーザー名を取得
  const username = sessionStorage.username;
  // ユーザー名が存在しない場合はログインページにリダイレクト
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
    return; // リダイレクト後は処理を中断
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

  // 登録ボタンのクリックイベントリスナーを設定
  const entryButton = document.getElementById("entry");
  entryButton.addEventListener("click", async (event) => {
    event.preventDefault(); // ボタンのデフォルトの動作（ページ遷移）を抑制

    // ユーザー名が存在しない場合、エラーを出力して処理を中断する
    if (!username) {
      console.error("Username is not defined.");
      return;
    }

    // username を引数として保存関数を呼び出す
    await saveToLocalStorage(username); // データ保存を非同期で実行

    // データ保存後の処理
    alert("保存されました");
    location.href = "carrer_menu.html";
  });
});

function populateDropdown(id, options) {
  const select = document.getElementById(id);
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    select.appendChild(opt);
  });
}

async function saveToLocalStorage(username) {
  const faculty = document.getElementById("faculty").value;
  const grade = document.getElementById("grade").value;
  const content = document.getElementById("content").value;
  const enterprise = document.getElementById("enterprise").value;
  const industry_type = document.getElementById("industry_type").value;
  const occupation = document.getElementById("occupation").value;
  const term_sta = document.getElementById("term_sta").value;
  const term_end = document.getElementById("term_end").value;

  const formData = {
    faculty,
    grade,
    content,
    enterprise,
    industry_type,
    occupation,
    term_sta,
    term_end,
  };

  let existingData = localStorage.getItem(username); // ユーザー名をキーにしてローカルストレージから取得
  existingData = existingData ? JSON.parse(existingData) : [];

  // 新しいデータを既存データに追加
  existingData.push(formData);

  // ローカルストレージに保存（ユーザー名をキーとして）
  localStorage.setItem(username, JSON.stringify(existingData));
}
