document.addEventListener("DOMContentLoaded", async () => {
  const username = sessionStorage.username;

  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
  }

  document.querySelector("#user_name span").textContent = username;

  populateFormFromLocalStorage(username);
  await fetchDataAndPopulateDropdowns();
});

function populateFormFromLocalStorage(username) {
  const data = JSON.parse(localStorage.getItem(username));
  if (data) {
    document.querySelector('[name="faculty"]').value = data.faculty || "";
    document.querySelector('[name="grade"]').value = data.grade || "";
    document.querySelector('[name="content"]').value = data.content || "";
    document.querySelector('[name="industry_type"]').value =
      data.industry_type || "";
    document.querySelector('[name="term_start"]').value = data.term_start || "";
    document.querySelector('[name="term_end"]').value = data.term_end || "";
  }
}

function changeColor(element) {
  if (element.value == "") {
    element.style.color = "";
  } else {
    element.style.color = "black";
  }
}

function handleDateChange(type) {
  const startDateInput = document.querySelector('input[name="term_start"]');
  const endDateInput = document.querySelector('input[name="term_end"]');

  if (type === "start") {
    const startDate = new Date(startDateInput.value + "-01");
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 5);
    if (endDate.getDate() !== startDate.getDate()) {
      endDate.setDate(0);
    }
    endDateInput.value = endDate.toISOString().slice(0, 7);
  } else if (type === "end") {
    const endDate = new Date(endDateInput.value + "-01");
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - 5);
    if (startDate.getDate() !== endDate.getDate()) {
      startDate.setDate(0);
    }
    startDateInput.value = startDate.toISOString().slice(0, 7);
  }
}

document.getElementById("entry").addEventListener("click", function () {
  const termStart = document.querySelector('input[name="term_start"]').value;
  const termEnd = document.querySelector('input[name="term_end"]').value;

  if (!termStart || !termEnd) {
    alert("期間を選択してください。");
    return;
  }

  const startDate = new Date(termStart + "-01");
  const endDate = new Date(termEnd + "-01");

  if (endDate <= startDate) {
    alert("終了日は開始日より後に設定してください。");
    return;
  }

  const sixMonthsLater = new Date(startDate);
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
  if (sixMonthsLater.getDate() !== startDate.getDate()) {
    sixMonthsLater.setDate(0);
  }
  if (endDate > sixMonthsLater) {
    alert("期間は6か月以内に設定してください。");
    return;
  }

  const searchParams = new URLSearchParams({
    department:
      document.querySelector('select[name="faculty"]').value || "指定なし",
    grade: document.querySelector('select[name="grade"]').value || "指定なし",
    content:
      document.querySelector('select[name="content"]').value || "指定なし",
    industry:
      document.querySelector('select[name="industry_type"]').value ||
      "指定なし",
    termStart,
    termEnd,
  });

  location.href = `carrer_refer_all.html?${searchParams.toString()}`;
});

function populateDropdown(name, options) {
  const selectElement = document.querySelector(`select[name="${name}"]`);
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.textContent = option;
    selectElement.appendChild(optionElement);
  });
}

async function fetchDataAndPopulateDropdowns() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    populateDropdown("faculty", data.faculty);
    populateDropdown("content", data.content);
    populateDropdown("industry_type", data.job);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
