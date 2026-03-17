import { createApp, ref, computed, onMounted, reactive } from 'vue';

export default {
    setup() {
        const questions = ref([])
        const currentQuestionIndex = ref(0)

        const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
        const resultSuccess = computed(() => questions.value.every(question => !!question.answers.value))

        const fetchQuiz = async() => {
            const response = await fetch('https://bc8aa7f27ab0c7c8.mokky.dev/quiz')
            const data = await response.json()
            questions.value = data.map(q => reactive(q))
        }

        onMounted(async() => {
            await fetchQuiz()
        })

        const checkAnswerHandler = (value) => {
            questions.value = questions.value.map((el, elIndex) => {
                return elIndex === currentQuestionIndex.value ? {
                    ...el,
                    answers: {
                        ...el.answers,
                        value: value
                    }
                } :
                el
            })
        }

        const changeAnswerHandler = (e) => {
            const value = typeof e === 'object' ? e.target.value : e
            questions.value = questions.value.map((el, elIndex) => {
                return elIndex === currentQuestionIndex.value ? {
                    ...el,
                    answers: {
                        ...el.answers,
                        value: value
                    }
                } :
                el
            })
        }

        const reloadQuiz = () => {
            currentQuestionIndex.value = 0
        }

        const changeCurrentQuestion = (step) => {
            currentQuestionIndex.value = currentQuestionIndex.value + step
        }


        const numberWithSpace = (x) => {
            return (
                x &&
                x
                .toString()
                .replaceAll(' ', '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            );
        }

        const convertAnswer = (answer) => {
            if(answer) {
                switch (answer.type) {
                    case 'boolean':
                    {
                        return answer.elements.find((q) => q.value === answer.value).name;
                    }

                    case 'number':
                    {
                        return numberWithSpace(answer.value);
                    }
                }
            }
        }

        return {
            questions,
            currentQuestionIndex,
            currentQuestion,
            resultSuccess,
            checkAnswerHandler,
            changeAnswerHandler,
            reloadQuiz,
            changeCurrentQuestion,
            numberWithSpace,
            convertAnswer
        }
    },

    template: `
        <div class="question">

        <h3 class="h3">Ответьте на несколько вопросов — и факторинговые компании предложат условия, которые подходят под ваши бизнес-задачи</h3>
        
        <div v-if="currentQuestionIndex + 1 < questions?.length">
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
                    <input @input="changeAnswerHandler" :value="currentQuestion?.answers?.value" class="input" type="text">
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