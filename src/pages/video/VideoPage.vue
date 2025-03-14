<template>
  <div class="container">
    <main>
      <h1 class="title">Видео</h1>
      <div class="categories">
        <button
          v-for="(category, index) in categories"
          :key="index"
          class="category"
        >
          {{ category }}
        </button>
      </div>

      <div class="video-grid">
        <div
          v-for="(video, index) in videos"
          :key="index"
          class="video-card"
        >
          <div class="video-thumb"></div>
          <h2 class="video-title">{{ video.title }}</h2>
          <p class="video-info">Данные о видео</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const categories = ref(['Категория', 'Категория', 'Категория', 'Категория']);
const videos = ref([
  { title: 'Название видео' },
  { title: 'Длинное название видео из двух строк' },
  { title: 'Длинное название видео из двух строк' },
  { title: 'Название видео' },
  { title: 'Длинное название видео из двух строк' },
  { title: 'Название видео' },
  { title: 'Название видео' },
]);
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  color: white;
  padding: 15px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.logo span {
  color: #4c8bf5;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav__link {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.title {
  font-size: 32px;
  margin: 20px 0;
}

.categories {
  display: flex;
  gap: 10px;
}

.category {
  background: #4c8bf5;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.video-card {
  background: #f3f3f3;
  padding: 15px;
  border-radius: 8px;
}

.video-thumb {
  width: 100%;
  height: 150px;
  background: gray;
  border-radius: 5px;
}

.video-title {
  font-size: 18px;
  margin: 10px 0;
}

.video-info {
  color: gray;
  font-size: 14px;
}
</style>
