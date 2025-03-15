<template>
  <RouterLink to="/test" class="test__return">
    <- Назад
  </RouterLink>
  <div class="wrapper">
    <p class="test__heading">
      Тест по физике № {{ $route.params.id }}.
    </p>
    <p class="test__progressOf">
      {{ progress }} из {{ questionsPull.length }}
    </p>
    <ul class="test__progress-wrapper">
      <li v-for="n in questionsPull.length" :key="n" @click="progressClickHandler">
        <p v-if="n == progress && questionsPull[n-1].givenAnswer == -1" class="test__progress test__progress--current">{{ n }}</p>
        <p v-if="n == progress && questionsPull[n-1].givenAnswer != -1" class="test__progress test__progress--currentGiven">{{ n }}</p>
        <p v-if="n != progress && questionsPull[n-1].givenAnswer != -1" class="test__progress test__progress--given">{{ n }}</p>
        <p v-if="n != progress && questionsPull[n-1].givenAnswer == -1" class="test__progress">{{ n }}</p>
      </li>
    </ul>
    <div id="formula" class="formula"/>
    <div v-for="i in questionsPull.length" :key="i" class="test__options-wrapper">
      <fieldset v-if="i == progress" class="test__options options">
        <div v-for="(option, index) in questionsPull[progress - 1].options" :key="index" class="options__wrapper">
          <input
              class="options__radio"
              type="radio"
              :name="'question' + progress"
              :id="progress + ' ' + (index + 1)"
              :value="option"
              v-model="questionsPull[progress - 1].givenAnswer"
          />
          <label :for="progress + ' ' + (index + 1)" class="options__label">{{ option }}</label>
        </div>
      </fieldset>
    </div>

    <div class="test__buttons">
      <button class="test__button" @click="decrease">Назад</button>
      <button v-if="progress != questionsPull.length" class="test__button" @click="increase">Вперёд</button>
      <button v-if="progress == questionsPull.length" class="test__button" @click="sendResults">Завершить</button>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      progress: 1,
      questionsPull: [],
      results: [],
      startTime: 0,
      endTime: 0,
      completionTime: 0,
      timer: null,
    };
  },
  methods: {
    increase() {
      if (this.progress < this.questionsPull.length) {
        this.progress += 1;
        this.renderFormula();
      }
    },
    decrease() {
      if (this.progress > 1) {
        this.progress -= 1;
        this.renderFormula();
      }
    },
    renderFormula() {
      let formula = document.getElementById('formula');
      if (formula) {
        formula.innerHTML = this.questionsPull[this.progress - 1]?.question || "Нет данных";
      }
    },
    async getQuestions() {
      try {
        const response = await fetch(`http://formulas.std-2585.ist.mospolytech.ru/quiz/start/${this.$route.params.id}`);
        const res = await response.json();

        this.questionsPull = res.questions.map(q => ({
          ...q,
          givenAnswer: -1,
          correct_formula_latex: q.correct_formula_latex || "", // Защита от undefined
        }));

        this.renderFormula();
      } catch (error) {
        console.error("Ошибка загрузки вопросов:", error);
      }
    },
    progressClickHandler(e) {
      let index = e.currentTarget.children[0].innerHTML;
      this.progress = Number(index);
      this.renderFormula();
    },
    startTimer() {
      this.startTime = Date.now();
      this.timer = setInterval(() => {}, 1000);
    },
    async sendResults() {
      if (this.timer) clearInterval(this.timer);
      this.endTime = Date.now();
      const elapsedTime = (this.endTime - this.startTime) / 1000;
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = Math.floor(elapsedTime % 60);
      this.completionTime = `${minutes} мин ${seconds} сек`;

      let results = this.questionsPull.map(q => {
        const correctAnswer = q.correct_formula_latex ? q.correct_formula_latex.replace(/^\\\(|\\\)$/g, "") : "";

        return JSON.stringify({
          question: q.description,
          correct_answer: correctAnswer,
          selected_answer: q.givenAnswer,
          is_correct: q.givenAnswer == correctAnswer,
        });
      });

      this.$router.push({
        path: '/results',
        query: { formulasWithAnswers: results, completionTime: this.completionTime }
      });
    }
  },
  mounted() {
    this.getQuestions();
    this.startTimer();
  }
};
</script>


<style lang="css" scoped>
.wrapper {
    min-width: 560px;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 40%;
    margin: 0 auto;
}

.test__heading {
    font-size: 2rem;
    font-weight: 500;
    color: #777777;
}

.test__return {
    margin-left: 20px;
}

.test__progress-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 600px;
    max-width: 100%;
    margin: 0 auto;
}

.test__progressOf {
    color: #777777;
    font-size: 1.3rem;
    font-weight: 900;
    margin-top: 20px;
}

.test__progress {
    flex: 1 0 21%;
    margin: 8px;
    margin-top: 20px;
    width: 40px;
    height: 40px;
    background-color: #D9D9D9;
    color: #777777;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
}

.test__progress--current {
    color: #7DA1EF;
    background-color: white;
    border: 3px solid #7DA1EF;
}

.test__progress--given {
    color: white;
    background-color: #7DA1EF;
}

.test__progress--currentGiven {
    color: white;
    background-color: #7DA1EF;
    border: 3px solid #4061a8;
}

#formula {
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 2rem;
    font-weight: 900;
    min-height: 140px;
    width: 100%;
    border: 4px solid #7DA1EF;
    border-radius: 3px;
    margin-top: 20px;
    padding: 0 20px;
}

.test__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.test__button {
    background-color: #7DA1EF;
    color: white;
    font-size: 1.5rem;
    border-radius: 4px;
    padding: 10px;
    min-width: 250px;
    margin-top: 40px;
}

.test__options-wrapper {
    width: 100%;
}

.options__wrapper {
    display: flex;
    align-items: center;
}

.options__radio {
    width: 20px;
    height: 20px;
    accent-color: #7DA1EF;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: #7DA1EF;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid #7DA1EF;
}

.options__radio:checked:after {
    width: 20px;
    height: 20px;
    border-radius: 15px;
    position: relative;
    background-color: #7DA1EF;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid #7DA1EF;
}

.options__label {
    margin-left: 10px;
    font-size: 1.3rem;
}

.options {
    margin-top: 40px;
}
</style>