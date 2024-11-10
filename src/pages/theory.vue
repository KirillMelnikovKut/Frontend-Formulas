<template>
  <div class="section-selector">
    <h1>Выберите раздел физики</h1>
    <div class="sections">
      <div
        v-for="section in sections"
        :key="section.name"
        class="section"
      >
        <div class="section__button">
          <h2>{{ section.name }}</h2>
          <p>{{ section.description }}</p>
        </div>
        <button :class="section.completed ? 'completed' : 'default'">
          {{ section.completed ? 'Пройдено' : 'Перейти' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Section {
  name: string;
  description: string;
  completed: boolean;
}

export default defineComponent({
  name: 'theory',
  data() {
    return {
      sections: [
        {
          name: 'Кинематика',
          description: 'Раздел формул, описывающих движение тел',
          completed: false,
        },
        {
          name: 'Динамика',
          description: 'Раздел формул, связанных с силами и движением',
          completed: true,
        },
        {
          name: 'Статика',
          description:
            'Раздел формул, описывающих равновесие тел и условия, при которых они не движутся',
          completed: false,
        },
        {
          name: 'Энергетика',
          description:
            'Раздел формул, связанных с энергией и ее преобразованиями',
          completed: false,
        },
        {
          name: 'Термофизика',
          description:
            'Раздел формул, описывающих тепловые процессы и законы термодинамики',
          completed: false,
        },
      ] as Section[],
    };
  },
});
</script>

<style scoped>
.section-selector {
  text-align: center;
  margin: 20px;
}

.sections {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.section {
  width: 250px;
  margin: 0 20px 40px 20px;
  text-align: left;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 40px;
}

h2 {
  font-size: 1.5rem;
  font-weight: bold;
}

p {
  margin-top: 15px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 1rem;
}

button.default {
  background-color: #4a69bd;
}

button.completed {
  background-color: #78e08f;
}
</style>
