// 词汇数组（从本地加载）
let wordsList = JSON.parse(localStorage.getItem('words')) || [];

// 保存词汇按钮事件
document.getElementById('save-btn').addEventListener('click', () => {
  const lang1 = document.getElementById('lang1').value.trim();
  const lang2 = document.getElementById('lang2').value.trim();

  if (!lang1 || !lang2) {
    alert('请完整输入两个词汇！');
    return;
  }

  wordsList.push({ lang1, lang2 });
  localStorage.setItem('words', JSON.stringify(wordsList));

  renderWordList();

  document.getElementById('lang1').value = '';
  document.getElementById('lang2').value = '';
});

// 渲染词汇列表
function renderWordList() {
  const listContainer = document.getElementById('wordList');
  listContainer.innerHTML = '';

  wordsList.forEach((word, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${word.lang1} ↔ ${word.lang2}`;
    listContainer.appendChild(li);
  });
}

// 随机模式开始按钮事件
document.getElementById('start-btn').addEventListener('click', () => {
  if (wordsList.length === 0) {
    alert('请先记录一些词汇！');
    return;
  }

  const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  const testLang = Math.random() < 0.5 ? 'lang1' : 'lang2';
  const answerLang = testLang === 'lang1' ? 'lang2' : 'lang1';

  const userAnswer = prompt(`请翻译：${randomWord[testLang]}`);
  
  if (userAnswer === null) return; // 用户取消输入时退出

  if (userAnswer.trim().toLowerCase() === randomWord[answerLang].toLowerCase()) {
    alert('✅ 正确！');
  } else {
    alert(`❌ 错误！正确答案是：${randomWord[answerLang]}`);
  }
});

// 初始化页面加载时渲染列表
renderWordList();
