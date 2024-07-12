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
    populateDropdown([]); // データがない場合の処理を呼び出す
  }
});

function populateDropdown(data) {
  const select = document.getElementById("company");
  select.innerHTML = ""; // 既存のオプションをクリア

  if (data.length > 0) {
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "企業を選択してください";
    defaultOption.hidden = true;
    select.appendChild(defaultOption);

    data.forEach((item) => {
      const opt = document.createElement("option");
      opt.value = item.enterprise;
      opt.textContent = item.enterprise;
      select.appendChild(opt);
    });

    // 初期表示を設定するためにイベントリスナーを追加
    select.addEventListener("change", function () {
      selectCompany(this);
      changeColor(this);
    });
  } else {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "記録がありません";
    select.appendChild(opt);
    select.disabled = true; // ドロップダウンを無効化
    updateDisplay(null); // データがない場合は「活動記録がありません」を表示
  }
}

function selectCompany(select) {
  if (select.disabled || !select.value) {
    return; // ドロップダウンが無効化されている場合、何も行わない
  }

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
      document.getElementById("job_info").style.display = "block"; // 内容を表示
    } else {
      updateDisplay(null); // 選択された企業がない場合は「活動記録がありません」を表示
      document.getElementById("job_info").style.display = "none"; // 内容を非表示
    }
  }
}

function updateDisplay(data) {
  if (data) {
    document.getElementById("industry_type").textContent = data.industry_type;
    document.getElementById("record").textContent = data.content;
    document.getElementById(
      "term"
    ).textContent = `${data.term_sta} 〜 ${data.term_end}`;
    document.getElementById("occupation").textContent = data.occupation;
  } else {
    document.getElementById("industry_type").textContent = "";
    document.getElementById("record").textContent = "活動記録がありません";
    document.getElementById("term").textContent = "";
    document.getElementById("occupation").textContent = "";
  }
}

function changeColor(select) {
  if (select.value) {
    select.style.color = "black";
  } else {
    select.style.color = "gray";
  }
}
