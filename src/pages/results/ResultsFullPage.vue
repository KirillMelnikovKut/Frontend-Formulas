<template>
  <div>
    <ul class="tasks">
      <li
          class="tasks__item"
          v-for="(result, index) in props.data.results"
          :key="index"
      >
        <div class="tasks__desc">
          <p>
            Задача {{ index + 1 }}:
            <strong class="strong">{{ result.question }}</strong>
          </p>
          <div class="tasks__answers">
            <p class="tasks__p">Ваш ответ:</p>
            <p
                :class="[
                'tasks__answer',
                Boolean(result.is_correct)
                  ? 'tasks__answer--correct'
                  : 'tasks__answer--incorrect',
              ]"
            >
              {{ result.selected_answer || "—" }}
            </p>
            <p class="tasks__p">Правильный ответ:</p>
            <p class="tasks__answer tasks__answer--correct">
              {{ result.correct_answer || "—" }}
            </p>
          </div>
        </div>
        <div class="tasks__score">{{ Boolean(result.is_correct) ? 1 : 0 }}/1</div>
        <div class="tasks__theory">
          <RouterLink class="theory__button" to="/theory">
            <p class="theory__p">Вернуться к теории</p>
            <div class="gradient-rectangle">
              <div class="circle"></div>
            </div>
          </RouterLink>
        </div>
      </li>
    </ul>

    <div class="buttons">
      <UIButton
          class="buttons__item"
          @click="props.toggleFull"
          label="Назад"
      />
      <UIButton
          class="buttons__item"
          label="На главную"
          href="/"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import UIButton from '@/components/UI/UIButton.vue';
import type { QuizFinishDto } from './types';

const props = defineProps<{
  data: QuizFinishDto;
  toggleFull: () => void;
}>();
</script>


<style lang="scss" scoped>
$correct-color: #55b432;
$incorrect-color: #e53247;
$fz--huge: 24px;
$fz--big: 22px;
$fz--medium: 20px;
$fz--tiny: 18px;

.strong {
  margin-left: 15px;
  font-size: $fz--huge;
  font-weight: 500;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 45px;

  &__item {
    &:not(:first-child) {
      animation: dropdown 0.3s ease;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px 100px;
  }

  &__desc {
    min-width: 300px;
    flex: 1;
  }

  &__answers {
    margin-left: 80px;
  }

  &__answer {
    margin-bottom: 8px;
    &--correct {
      color: $correct-color;
      font-size: $fz--tiny;
    }

    &--incorrect {
      color: $incorrect-color;
      font-size: $fz--tiny;
    }
  }

  &__p {
    font-size: $fz--medium;
  }

  &__score {
    font-weight: 500;
    font-size: $fz--huge;
  }

  &__theory {
    flex: 1;
    display: flex;
    justify-content: end;
  }
}

.theory {
  &__button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 5px;
    border: 1px solid #00000099;
    padding: 12px 18px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__p {
    font-weight: 500;
  }
}

.gradient-rectangle {
  position: relative;
  width: 120px;
  height: 25px;
  background: linear-gradient(to right, white, rgb(32, 32, 32));
  border-radius: 20px;
  overflow: hidden;
}

.circle {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  background-color: black;
  border-radius: 50%;
}

.buttons {
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px 160px;

  &__item {
    width: 195px;
  }
}

@keyframes dropdown {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
