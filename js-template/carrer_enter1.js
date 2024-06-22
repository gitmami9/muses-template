/* ドロップダウンリストを選択すると、カラーを黒くする */
function changeColor(hoge) {
  if (hoge.value == 0) {
    hoge.style.color = "";
  } else {
    hoge.style.color = "black";
  }
}
