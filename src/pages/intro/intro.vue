<template>
  <div class="quiz-container">
    <!-- Номера вопросов -->
    <div class="numbers">
      <span
          v-for="(question, index) in questions"
          :key="index"
          :class="{ active: index === currentQuestion, answered: answers[index] !== null }"
          @click="setCurrentQuestion(index)"
      >
        {{ index + 1 }}
      </span>
    </div>

    <!-- Текущий вопрос -->
    <h2>{{ questions[currentQuestion].text }}</h2>
    <div class="options-container">
      <div
          v-for="(option, index) in questions[currentQuestion].options"
          :key="index"
          class="option"
          :class="{ correct: testCompleted && index === questions[currentQuestion].correct, wrong: testCompleted && index === answers[currentQuestion] && index !== questions[currentQuestion].correct }"
          @click="selectAnswer(index)"
      >
        <input type="radio" :name="'answer-' + currentQuestion" :value="index" v-model="answers[currentQuestion]" />
        <span>{{ option }}</span>
      </div>
    </div>

    <!-- Кнопки -->
    <div class="buttons" v-if="!testCompleted">
      <UIButton label="Назад" v-if="currentQuestion > 0" @click="prevQuestion" class="back" />
      <UIButton
          :label="allAnswered ? 'Завершить' : 'Вперёд'"
          @click="nextQuestion"
          class="next"
      />
    </div>

    <!-- Результат -->
    <div v-if="testCompleted" class="result">
      Ваш результат: {{ score }}/10 - {{ level }}
      <UIButton to="/theory" label="Перейти к теории" />
      <UIButton label="Пройти заново" @click="restartTest" />
    </div>
  </div>
</template>

<script>
import UIButton from "@/components/UI/UIButton.vue";

export default {
  components: { UIButton },
  data() {
    return {
      questions: [
        { text: "Что такое инерция?", options: ["Свойство сохранять скорость", "Сопротивление движению", "Сила трения"], correct: 0 },
        { text: "Импульс тела (p) выражается формулой:", options: ["p = mv", "p = m/v", "p = v/m"], correct: 0 },
        { text: "Как обозначается ускорение свободного падения?", options: ["g", "a", "v"], correct: 0 },
        { text: "Единица измерения силы", options: ["Ньютон", "Джоуль", "Паскаль"], correct: 0 },
        { text: "Формула для расчёта работы силы", options: ["A = F * s", "A = m * g", "A = p * v"], correct: 0 },
        { text: "Время подъема на максимальную высоту", options: ["v₀/g", "v₀*t", "g*t"], correct: 0 },
        { text: "Какая из формул выражает второй закон Ньютона?", options: ["F = m*a", "F = p*t", "F = v*m"], correct: 0 },
        { text: "Закон сохранения энергии применим в замкнутой системе?", options: ["Да", "Нет"], correct: 0 },
        { text: "Какая формула определяет мощность?", options: ["P = A/t", "P = m*g", "P = F*s"], correct: 0 },
        { text: "Механическая энергия тела складывается из:", options: ["Кинетической и потенциальной", "Электрической и тепловой", "Магнитной и химической"], correct: 0 }
      ],
      currentQuestion: 0,
      answers: new Array(10).fill(null),
      testCompleted: false
    };
  },
  computed: {
    allAnswered() {
      return this.answers.every(answer => answer !== null);
    },
    score() {
      return this.answers.filter((answer, index) => answer === this.questions[index].correct).length;
    },
    level() {
      let score = this.score;
      return score <= 3 ? "Новичок" : score <= 6 ? "Любитель" : score <= 8 ? "Знаток" : "Учёный";
    }
  },
  methods: {
    setCurrentQuestion(index) {
      this.currentQuestion = index;
    },
    selectAnswer(index) {
      this.answers[this.currentQuestion] = index;
    },
    nextQuestion() {
      if (!this.testCompleted && this.allAnswered) {
        this.testCompleted = true;
      } else if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
      }
    },
    prevQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
      }
    },
    restartTest() {
      this.currentQuestion = 0;
      this.answers = new Array(10).fill(null);
      this.testCompleted = false;
    }
  }
};
</script>

<style scoped>
.quiz-container {
  background: white;
  width: 50%;
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.numbers {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 15px;
}

.numbers span {
  display: inline-block;
  padding: 8px 12px;
  background: #ddd;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.numbers .active {
  background: #7a9efc;
  color: white;
}

.numbers .answered {
  background: #b0b0b0;
  color: white;
}

h2 {
  font-weight: 600;
  line-height: 40px;
  font-size: 22px;
}

.option {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f4f4f4;
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.option input {
  margin-right: 10px;
}

.option.correct {
  background: #a8f0c6;
}

.option.wrong {
  background: #f5a6a6;
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 18px;
}

.back {
  background: #777;
  color: white;
}

.next {
  background: #7a9efc;
  color: white;
}

.result {
  text-align: center;
  margin-top: 20px;
}

.result button {
  margin-top: 10px;
}
</style>