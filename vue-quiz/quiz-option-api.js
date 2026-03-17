export default {
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0
    }
  },
  created() {
    this.fetchQuiz()

  },

  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex]
    },
    resultSuccess() {
      return this.questions.every(question => !!question.answers.value)
    }
  },

  watch: {

  },

  mounted() {

  },

  beforeUnmount() {

  },

  methods: {

    async fetchQuiz () {
      const response = await fetch('https://bc8aa7f27ab0c7c8.mokky.dev/quiz')
      this.questions = await response.json()
    },

    checkAnswerHandler (value) {
      this.questions = this.questions.map((el, elIndex) => {
        return el.elIndex === this.currentQuestionIndex
          ? {
          ...el,
            value: value
          }
          : el
      })

      // Добавляем в текущий вопрос
      this.currentQuestion.answers.value = value

    },

    changeAnswerHandler (e) {
      const value = typeof e === 'object' ? e.target.value : e
      this.questions = this.questions.map((el, elIndex) => {
        return elIndex === this.currentQuestionIndex
          ? {
            ...el,
            value: value
          }
          : el
      })

      // Добавляем в текущий вопрос
      this.currentQuestion.answers.value = value

    },

    reloadQuiz () {
      this.currentQuestionIndex = 0
    },

    changeCurrentQuestion (step) {
      this.currentQuestionIndex = this.currentQuestionIndex + step
    },

    numberWithSpace(x) {
      return (
        x &&
        x
          .toString()
          ?.replaceAll(' ', '')
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      );
    },

    convertAnswer(answer) {
      switch (answer.type) {
        case 'boolean': {
          return answer?.elements.find((q) => q?.value === answer?.value)?.name;
        }

        case 'number': {
          return this.numberWithSpace(answer?.value);
        }
      }

    }
  },

  template: `
    <div class="question">
    
      <h3 class="h3">Ответьте на несколько вопросов — и факторинговые компании предложат условия, которые подходят под ваши бизнес-задачи</h3>

      <div v-if="currentQuestionIndex + 1 < questions.length">
        <div v-if="currentQuestion?.answers.type === 'boolean'" class="question-card">
          <div class="question-card__title">{{currentQuestion.name}}</div>
          <div class="question-card__answer">
            <button
                @click="changeAnswerHandler(answer.value)"
                v-for="answer in currentQuestion?.answers.elements"
                class="btn"
                :class="answer.value === currentQuestion?.answers.value && 'active'"
            >
              {{answer.name}}
            </button>
          </div>
        </div>

        <div v-if="currentQuestion?.answers.type === 'number'" class="question-card">
          <div class="question-card__title">{{currentQuestion.name}}</div>
          <div class="question-card-boolean__answer">
            <input @input="changeAnswerHandler" :value="currentQuestion?.answers.value" class="input" type="text">
          </div>
        </div>

        <div class="question-footer">
          <div class="question-footer__col">Вопросы {{currentQuestionIndex + 1}} из {{questions.length}}</div>
          <div class="question-footer__col">
            <button v-if="resultSuccess" @click="changeCurrentQuestion(-1)" class="btn outline">Результаты</button>
            <button :disabled="currentQuestionIndex === 0" @click="changeCurrentQuestion(-1)" class="btn outline">Назад</button>
            <button :disabled="currentQuestion?.answers?.value === null" @click="changeCurrentQuestion(1)" class="btn primary">Далее</button>
          </div>
        </div>
      </div>
      <div v-else class="question-result">
        <div class="question-result-list">
          <div v-for="question in questions" class="question-result-row">

            <div class="question-result-row__body">{{question.name}}</div>
            <div class="question-result-row__answer">{{convertAnswer(question.answers)}}</div>
          </div>
        </div>
        <div class="question-result-footer">
          <button @click="reloadQuiz" class="btn outline">Изменить ответы</button>
          <button class="btn primary">Перейти к заявке</button>
        </div>
      </div>
    </div>    
  `
}
