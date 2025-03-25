const messages = {
  zh: {
    title: '🌐 双语言词汇记录 📚',
    lang1: '输入语言一的词汇',
    lang2: '输入语言二的词汇',
    save: '确定',
    randomStart: '🎲 开始随机词汇模式',
    delete: '删除',
    inputPrompt: '请完整输入两个词汇！',
    noWords: '请先记录一些词汇！',
    translatePrompt: '请翻译',
    correct: '✅ 正确！',
    incorrect: '❌ 错误！正确答案是：'
  },
  en: {
    title: '🌐 Bilingual Vocabulary 📚',
    lang1: 'Enter word in language 1',
    lang2: 'Enter word in language 2',
    save: 'Save',
    randomStart: '🎲 Start Random Mode',
    delete: 'Delete',
    inputPrompt: 'Please enter both words!',
    noWords: 'Please add some words first!',
    translatePrompt: 'Translate',
    correct: '✅ Correct!',
    incorrect: '❌ Wrong! The correct answer is:'
  }
};

const i18n = VueI18n.createI18n({
  locale: 'zh',
  messages,
});

const app = Vue.createApp({
  data() {
    return {
      lang1: '',
      lang2: '',
      wordsList: JSON.parse(localStorage.getItem('words')) || []
    };
  },
  methods: {
    setLang(lang) {
      i18n.global.locale = lang;
    },
    saveWord() {
      if (!this.lang1 || !this.lang2) {
        alert(i18n.global.t('inputPrompt'));
        return;
      }
      this.wordsList.push({ lang1: this.lang1, lang2: this.lang2 });
      localStorage.setItem('words', JSON.stringify(this.wordsList));
      this.lang1 = '';
      this.lang2 = '';
    },
    randomTest() {
      if (this.wordsList.length === 0) {
        alert(i18n.global.t('noWords'));
        return;
      }

      const randomWord = this.wordsList[Math.floor(Math.random() * this.wordsList.length)];
      const testLang = Math.random() < 0.5 ? 'lang1' : 'lang2';
      const answerLang = testLang === 'lang1' ? 'lang2' : 'lang1';

      const userAnswer = prompt(`${i18n.global.t('translatePrompt')}: ${randomWord[testLang]}`);
      if (userAnswer === null) return;

      if (userAnswer.trim().toLowerCase() === randomWord[answerLang].toLowerCase()) {
        alert(i18n.global.t('correct'));
      } else {
        alert(`${i18n.global.t('incorrect')} ${randomWord[answerLang]}`);
      }
    },
    deleteWord(index) {
      this.wordsList.splice(index, 1);
      localStorage.setItem('words', JSON.stringify(this.wordsList));
    }
  }
});

app.use(i18n);
app.mount('#app');
