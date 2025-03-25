const app = Vue.createApp({
  data() {
    return {
      lang1: '',
      lang2: '',
      wordsList: JSON.parse(localStorage.getItem('words')) || []
    };
  },
  methods: {
    saveWord() {
      if (!this.lang1 || !this.lang2) {
        alert('请完整输入两个词汇！');
        return;
      }
      this.wordsList.push({ lang1: this.lang1, lang2: this.lang2 });
      localStorage.setItem('words', JSON.stringify(this.wordsList));
      this.lang1 = '';
      this.lang2 = '';
    },
    randomTest() {
      if (this.wordsList.length === 0) {
        alert('请先记录一些词汇！');
        return;
      }

      const randomWord = this.wordsList[Math.floor(Math.random() * this.wordsList.length)];
      const testLang = Math.random() < 0.5 ? 'lang1' : 'lang2';
      const answerLang = testLang === 'lang1' ? 'lang2' : 'lang1';

      const userAnswer = prompt(`请翻译：${randomWord[testLang]}`);
      if (userAnswer === null) return; 
      
      if (userAnswer.trim().toLowerCase() === randomWord[answerLang].toLowerCase()) {
        alert('✅ 正确！');
      } else {
        alert(`❌ 错误！正确答案是：${randomWord[answerLang]}`);
      }
    }
  }
});

app.mount('#app');
