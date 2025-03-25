const messages = {
  zh: {
    quizTitle: '随机词汇测试',
    yourAnswer: '输入你的翻译',
    submitAnswer: '提交答案',
    backToHome: '返回首页',
    translatePrompt: '请翻译',

    // 下面这些可以复用你之前的翻译
    noWords: '请先记录一些词汇！',
    correct: '✅ 正确！',
    incorrect: '❌ 错误！正确答案是：'
  },
  en: {
    quizTitle: 'Random Vocabulary Test',
    yourAnswer: 'Enter your answer',
    submitAnswer: 'Submit',
    backToHome: 'Back to Home',
    translatePrompt: 'Translate',

    noWords: 'Please add some words first!',
    correct: '✅ Correct!',
    incorrect: '❌ Wrong! The correct answer is:'
  }
};

const i18n = VueI18n.createI18n({
  locale: localStorage.getItem('lang') || 'zh', // 读本地存的语言
  messages
});

const quizApp = Vue.createApp({
  data() {
    return {
      // Dark Mode
      isDark: localStorage.getItem('darkMode') === 'true',

      // 词汇数据
      wordsList: JSON.parse(localStorage.getItem('words')) || [],
      currentWord: null,
      testLang: '',
      answerLang: '',
      displayWord: '',
      userAnswer: '',
      feedback: '',
      correct: false
    };
  },
  methods: {
    // 切换语言
    setLang(lang) {
      i18n.global.locale = lang;
      localStorage.setItem('lang', lang); // 存储语言选择
    },
    // 切换暗色
    toggleDark() {
      this.isDark = !this.isDark;
      if (this.isDark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', this.isDark);
    },

    pickRandomWord() {
      if (this.wordsList.length === 0) {
        this.currentWord = null;
        return;
      }
      this.currentWord = this.wordsList[Math.floor(Math.random() * this.wordsList.length)];
      this.testLang = Math.random() < 0.5 ? 'lang1' : 'lang2';
      this.answerLang = this.testLang === 'lang1' ? 'lang2' : 'lang1';
      this.displayWord = this.currentWord[this.testLang];
    },
    checkAnswer() {
      if (!this.userAnswer.trim()) {
        alert(i18n.global.t('yourAnswer'));
        return;
      }
      if (this.userAnswer.trim().toLowerCase() === this.currentWord[this.answerLang].toLowerCase()) {
        this.feedback = i18n.global.t('correct');
        this.correct = true;
      } else {
        this.feedback = `${i18n.global.t('incorrect')} ${this.currentWord[this.answerLang]}`;
        this.correct = false;
      }
      // 2秒后自动切换下一个
      setTimeout(() => {
        this.feedback = '';
        this.userAnswer = '';
        this.pickRandomWord();
      }, 2000);
    }
  },
  mounted() {
    // 初始化 Dark Mode
    if (this.isDark) document.documentElement.classList.add('dark');

    // 初始化随机词汇
    this.pickRandomWord();
  }
});

// 使用i18n
quizApp.use(i18n);
// 挂载
quizApp.mount('#quizApp');
