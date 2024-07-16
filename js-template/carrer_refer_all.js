document.addEventListener("DOMContentLoaded", async () => {
  const username = sessionStorage.username;
  // ユーザー名が存在しない場合はログインページにリダイレクト
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
  }
  // ユーザー名を表示する要素にユーザー名をセット
  document.querySelector("#user_name span").textContent = username;

  const urlParams = new URLSearchParams(window.location.search);
  const department = urlParams.get("department");
  const grade = urlParams.get("grade");
  const content = urlParams.get("content");
  const industry = urlParams.get("industry");
  const termStart = urlParams.get("termStart");
  const termEnd = urlParams.get("termEnd");

  try {
    let allData = [];

    // ローカルストレージからすべてのデータを取得
    for (let i = 1; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const jsonData = localStorage.getItem(key);
      if (jsonData) {
        try {
          const userData = JSON.parse(jsonData);
          if (Array.isArray(userData)) {
            allData.push(...userData);
          }
        } catch (error) {
          console.error(`Error parsing data for key ${key}:`, error);
        }
      }
    }
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("デフォルトデータの読み込みに失敗しました。");
    }
    const defaultData = await response.json();
    allData.push(...defaultData.List);
    console.log("All data loaded:", allData); // データが正しく読み込まれたか確認

    // 期間の開始日と終了日を設定
    const startDate = new Date(termStart);
    const endDate = new Date(termEnd);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0); // 月の最終日を設定する

    // データのフィルタリングと月ごとのカウント
    const filteredData = filterData(
      allData,
      department,
      grade,
      content,
      industry,
      startDate,
      endDate
    );
    document.getElementById("search_department").textContent =
      department || "指定なし";
    document.getElementById("search_grade").textContent = grade || "指定なし";
    document.getElementById("search_content").textContent =
      content || "指定なし";
    document.getElementById("search_industry").textContent =
      industry || "指定なし";
    document.getElementById(
      "search_term"
    ).textContent = `${termStart} ～ ${termEnd}`;
    console.log("Filtered data:", filteredData); // フィルタリングされたデータを確認

    const monthlyData = {};

    // 初期化：各月の件数をゼロで設定
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const monthKey = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}`;
      monthlyData[monthKey] = 0;
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    filteredData.forEach((entry) => {
      const entryDate = new Date(entry.term_sta);

      // エントリーの日付が期間内にあるかどうかを確認
      if (entryDate >= startDate && entryDate <= endDate) {
        const monthKey = `${entryDate.getFullYear()}-${String(
          entryDate.getMonth() + 1
        ).padStart(2, "0")}`;
        monthlyData[monthKey]++;
      }
    });

    console.log("Monthly data:", monthlyData); // 月次データを確認

    // グラフの描画
    const labels = Object.keys(monthlyData);
    const chartData = Object.values(monthlyData);

    drawChart(labels, chartData);
  } catch (error) {
    console.error("Error loading data:", error);
  }
});

function filterData(
  data,
  department,
  grade,
  content,
  industry,
  startDate,
  endDate
) {
  return data.filter((entry) => {
    const entryDate = new Date(entry.term_sta);

    // 学部・学科の条件が指定されていないか、一致する場合にフィルタリングする
    const matchDepartment =
      !department || department === "指定なし" || entry.faculty === department;

    // 学年の条件が指定されていないか、一致する場合にフィルタリングする
    const matchGrade = !grade || grade === "指定なし" || entry.grade === grade;

    // 内容の条件が指定されていないか、一致する場合にフィルタリングする
    const matchContent =
      !content || content === "指定なし" || entry.content === content;

    // 業種・職種の条件が指定されていないか、一致する場合にフィルタリングする
    const matchIndustry =
      !industry || industry === "指定なし" || entry.industry_type === industry;

    return (
      matchDepartment &&
      matchGrade &&
      matchContent &&
      matchIndustry &&
      entryDate >= startDate &&
      entryDate <= endDate
    );
  });
}

function drawChart(labels, chartData) {
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "件数",
          data: chartData,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          display: false, // Y軸の表示を非表示にする
        },
        x: {
          title: {
            display: true,
            text: "期間",
          },
          grid: { display: false },
        },
      },
    },
  });
}
