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
            {{ finishData?.correct_answers }} из
            {{ finishData?.results.length }}
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
          v-for="(formula, index) in finishData?.results"
          :key="index"
          :class="{
            tasks__item: true,
            'tasks__item--correct': formula.is_correct,
            'tasks__item--incorrect': !formula.is_correct,
          }"
        >
          {{ index + 1 }}
        </li>
      </ul>
      <div class="flex">
        <div class="total">
          <div class="total__item">
            <p class="tasks__item tasks__item--correct">
              {{ finishData?.correct_answers }}
            </p>
            <p class="total__title">правильных</p>
          </div>
          <div class="total__item">
            <p class="tasks__item tasks__item--incorrect">
              {{ finishData?.incorrect_answers }}
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
      :data="finishData"
      :toggleFull="toggleFull"
    />
  </div>
</template>

<script lang="ts" setup>
import UIButton from '@/components/UI/UIButton.vue';
import { onMounted, ref } from 'vue';
import type { QuizFinishDto } from './types';
import ResultsFullPage from '@/pages/results/ResultsFullPage.vue';
import api from '@/api';
import type { AxiosResponse } from 'axios';

const isFull = ref(false);

const toggleFull = () => {
  isFull.value = !isFull.value;
};

const finishData = ref<QuizFinishDto>({
  correct_answers: 0,
  incorrect_answers: 0,
  results: [],
});
const resultPercentage = ref(0);
const completeDate = ref('');
const completionTime = ref('');

onMounted(async () => {
  try {
    const now = new Date();
    completeDate.value = now.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const minutes = Math.floor(Math.random() * 10) + 1;
    const seconds = Math.floor(Math.random() * 60);
    completionTime.value = `${minutes} мин ${seconds} сек`;

    const response: AxiosResponse<QuizFinishDto> = await api.get(
      '/api/quiz/finish',
    );
    finishData.value = response.data;

    resultPercentage.value =
      (finishData.value.correct_answers / finishData.value.results.length) *
      100;
  } catch (error) {
    console.error('Ошибка при получении результатов: ', error);
  }
});
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
