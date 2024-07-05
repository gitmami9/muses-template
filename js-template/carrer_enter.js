/* ドロップダウンリストを選択すると、カラーを黒くする */
function changeColor(hoge) {
  if (hoge.value == 0) {
    hoge.style.color = "";
  } else {
    hoge.style.color = "black";
  }
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
