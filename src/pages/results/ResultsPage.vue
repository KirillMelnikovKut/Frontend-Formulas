<template>
  <div class="container">
    <h1 class="heading">Результат</h1>
    <div v-if="!isFull">
      <p>
        Дата прохождения:<strong class="strong">{{ completeDate }}.</strong>
      </p>
      <ul class="stat">
        <li class="stat__item">
          <p class="stat__score">
            {{ correctAnswers }} из {{ formulasWithAnswers.length }}
          </p>
          <p class="stat__title">Баллов набрано</p>
        </li>
        <li class="stat__item">
          <p class="stat__score">{{ resultPercentage }}%</p>
          <p class="stat__title">Общий результат</p>
        </li>
        <li class="stat__item">
          <p class="stat__score">{{ completionTime }}</p>
          <p class="stat__title">Время прохождения</p>
        </li>
      </ul>
      <p>Задания</p>
      <ul class="tasks">
        <li
          v-for="(formula, index) in formulasWithAnswers"
          :key="index"
          :class="{
            tasks__item: true,
            'tasks__item--correct': isAnswerCorrect(formula),
            'tasks__item--incorrect': !isAnswerCorrect(formula),
          }"
        >
          {{ index + 1 }}
        </li>
      </ul>
      <div class="flex">
        <div class="total">
          <div class="total__item">
            <p class="tasks__item tasks__item--correct">{{ correctAnswers }}</p>
            <p class="total__title">правильных</p>
          </div>
          <div class="total__item">
            <p class="tasks__item tasks__item--incorrect">
              {{ incorrectAnswers }}
            </p>
            <p class="total__title">неправильных</p>
          </div>
        </div>
        <button
          @click="toggleFull"
          class="full"
        >
          <img
            src="@/assets/icons/resize.svg"
            alt="развернуть-иконка"
          />
          <p class="full__title">Развернуть все</p>
        </button>
      </div>
      <div class="buttons">
        <UIButton
          class="buttons__again"
          label="Пройти снова"
          href="/test/1"
        />
      </div>
    </div>
    <ResultsFullPage
      v-if="isFull"
      :formulasWithAnswers="formulasWithAnswers"
      :toggleFull="toggleFull"
    />
  </div>
</template>

<script lang="ts" setup>
import UIButton from '@/components/UI/UIButton.vue';
import { computed, ref } from 'vue';
import type { ResultsProps, FormulaWithAnswer } from './types';
import ResultsFullPage from '@/pages/results/ResultsFullPage.vue';

const props = withDefaults(defineProps<ResultsProps>(), {
  formulasWithAnswers: () => [
    {
      formula: 'V = V₀ - gt',
      correctAnswer:
        'Скорость тела при движении с ускорением свободного падения',
      givenAnswer: 'Скорость тела при движении с ускорением свободного падения',
    },
    {
      formula: 'h = V₀² / 2g',
      correctAnswer:
        'Максимальная высота, на которую поднимется тело, брошенное вертикально вверх',
      givenAnswer: 'Максимальная высота падения с вершины горы',
    },
    {
      formula: 'T = 2π√(l/g)',
      correctAnswer: 'Период колебаний математического маятника',
      givenAnswer: 'Период колебаний математического маятника',
    },
    {
      formula: 'a = F / m',
      correctAnswer: 'Второй закон Ньютона',
      givenAnswer: 'Второй закон Ньютона',
    },
    {
      formula: 'Eк = mv² / 2',
      correctAnswer: 'Кинетическая энергия тела',
      givenAnswer: 'Кинетическая энергия тела',
    },
    {
      formula: 'Eп = mgh',
      correctAnswer: 'Потенциальная энергия тела на высоте',
      givenAnswer: 'Потенциальная энергия на максимальной высоте',
    },
    {
      formula: 's = V₀t + (at²)/2',
      correctAnswer: 'Перемещение тела при равномерно ускоренном движении',
      givenAnswer: 'Перемещение тела при равномерно ускоренном движении',
    },
    {
      formula: 'p = mv',
      correctAnswer: 'Импульс тела',
      givenAnswer: 'Мощность тела',
    },
    {
      formula: 'W = Fscos(θ)',
      correctAnswer: 'Работа силы под углом к направлению движения',
      givenAnswer: 'Работа силы под углом к направлению движения',
    },
    {
      formula: 'P = W / t',
      correctAnswer: 'Мощность, как работа за единицу времени',
      givenAnswer: 'Сила за единицу времени',
    },
  ],
  completeDate: '14 сентября 2024г',
  completionTime: '4 мин 56 сек',
});

const isFull = ref(false);

const toggleFull = () => {
  isFull.value = !isFull.value;
};

const correctAnswers = computed(() => {
  return props.formulasWithAnswers.filter(
    (formula) => formula.givenAnswer === formula.correctAnswer,
  ).length;
});

const incorrectAnswers = computed(() => {
  return props.formulasWithAnswers.length - correctAnswers.value;
});

const resultPercentage = computed(() => {
  return (correctAnswers.value / props.formulasWithAnswers.length) * 100;
});

const isAnswerCorrect = (formula: FormulaWithAnswer) => {
  return formula.givenAnswer === formula.correctAnswer;
};
</script>

<style lang="scss" scoped>
$correct-color: #55b432;
$incorrect-color: #e53247;
$fz--giant: 28px;
$fz--huge: 26px;
$fz--big: 24px;
$fz--medium: 22px;
$fz--tiny: 20px;

.container {
  margin: 0 auto;
  padding: 40px 83px;
  font-size: $fz--medium;
}

.heading {
  font-size: $fz--huge;
  font-weight: 600;
  margin-bottom: 43px;
}

.strong {
  margin-left: 15px;
  font-size: $fz--big;
  font-weight: 500;
}

.stat {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px 50px;
  margin: 25px 0;

  &__item {
    border-radius: 5px;
    border: 1px solid #00000099;
    padding: 15px 15px 5px;
    flex-grow: 1;
    flex-shrink: 1;
  }

  &__score {
    font-size: $fz--giant;
  }

  &__title {
    font-size: $fz--tiny;
  }
}

.tasks {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin: 11px 0 27px;

  &__item {
    font-size: $fz--big;
    border-radius: 5px;
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 2px;
    border-style: solid;

    &--correct {
      border-color: $correct-color;
    }

    &--incorrect {
      border-color: $incorrect-color;
    }
  }
}

.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 55px;
}

.total {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 60px;

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  &__title {
    font-size: $fz--tiny;
  }
}

.full {
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.3s ease;

  &__title {
    font-size: $fz--tiny;
  }
  &:hover {
    transform: scale(1.1);
  }
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;

  &__again {
    width: 195px;
  }
}
</style>
