<template>
    <div class="section-selector">
      <h1>{{ sectionName }}</h1>
      <div class="sections">
        <div
          v-for="formula in formulas"
          :key="formula.id"
          class="section"
          :class="{ 'selected': selectedFormula && selectedFormula.id === formula.id }" 
          @click="selectFormula(formula)"
        >
          <p>{{ formula.name }}</p>
        </div>
      </div>
  
      <div v-if="selectedFormula" class="formula-details">
        <h2>Формула</h2>
        <p class="formula">{{ selectedFormula.formula }}</p>
        <h2 class="desc">Описание</h2>
        <p> {{ selectedFormula.description }}</p>
        
      </div>
  
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  interface Formula {
    id: number;
    name: string;
    description: string;
    formula: string;
    idmodul: number;
  }
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const formulas = ref<Formula[]>([]);
      const error = ref<string | null>(null);
      const sectionName = ref<string | null>(null);
      const selectedFormula = ref<Formula | null>(null);
  
      const sections = [
        { id: 1, name: 'Кинематика' },
        { id: 2, name: 'Динамика' },
        { id: 3, name: 'Статика' },
        { id: 4, name: 'Энергетика' },
        { id: 5, name: 'Термофизика' },
      ];
  
      const fetchFormulas = async () => {
        const moduleId = Number(route.params.id);
        const url = `http://formulas.std-2585.ist.mospolytech.ru/module/api/module/${moduleId}/formulas`;
  
        try {
          const response = await fetch(url);
  
          if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
          }
  
          const data = await response.json();
          formulas.value = data;
  
          const section = sections.find((section) => section.id === moduleId);
          if (section) {
            sectionName.value = section.name;
          }
        } catch (err: any) {
          error.value = `Ошибка: ${err.message}`;
          console.error('Error fetching data:', err);
        }
      };
  
      const selectFormula = (formula: Formula) => {
        selectedFormula.value = formula;
      };
  
      onMounted(() => {
        fetchFormulas();
      });
  
      return {
        formulas,
        error,
        sectionName,
        selectedFormula,
        selectFormula,
      };
    },
  });
  </script>
  
  <style scoped>
  h1 {
    font-size: 48px;
    grid-column: span 2;
    font-weight: 600;
  }

  h2 {
    font-size: 32px;
  }

  .desc {
    margin-top: 20px;
  }
  .section-selector {
    display: grid;
    grid-template-columns: 400px auto;
    gap: 0 40px;
    padding: 0 40px;
    margin: 0 auto;
  }
  
  .section {
    cursor: pointer;
    padding: 10px 0;
    border-color: #f4f4f4;
    margin: 5px 0;
    transition: border-color 0.3s ease;
    border-right: 5px solid transparent;
    font-size: 18px;
  }
  
  .section:hover {
    border-color: #e0e0e0;
  }
  
  .section.selected {
    border-color: #4a69bd;
  }
  
  .formula-details {
    padding: 0 15px;
    font-size: 18px;
  }
  
  .error {
    color: red;
    margin-top: 20px;
    font-size: 1.2rem;
  }

  .formula {
    font-weight: 600;
    font-size: 32px;
  }
  </style>
  