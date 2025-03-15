<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from "@/api/index";

interface User {
  avatar: string;
  name: string;
  status: string;
}

interface Test {
  date: string;
  success_rate: number;
  section: string;
}

interface Topic {
  name: string;
  tests_passed: number;
  success_rate: number;
}

interface ProfileData {
  user: User;
  tests: Test;
  topics: Topic;
}

const profileData = ref<ProfileData>();
const isLoading = ref(true);
const errorMessage = ref('');

onMounted(async () => {
  try {
    const response = await api.get('/user/profile');
    profileData.value = response.data;
  } catch (error) {
    errorMessage.value = 'Ошибка при загрузке данных профиля';
    console.error('Ошибка:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>


<template>
  <div class="profile-page">
    <div v-if="isLoading" class="loading">Загрузка...</div>

    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>

    <div v-else>
      <div class="profile-header">
        <img :src="profileData?.user.avatar" alt="Avatar" class="avatar" />
        <div class="user-info">
          <h1>{{ profileData?.user.name }}</h1>
          <p class="status">СТАТУС: <span class="novice">{{ profileData?.user.status }}</span></p>
        </div>
      </div>
      
      <div class="content">
        <div class="card">
          <h2>ПРОЙДЕННЫЕ ТЕСТЫ</h2>
          <div class="card-inner">
            <div class="card-content">
              <div class="left">
                <p>Дата создания: {{ profileData?.tests.date }}</p>
                <p>- Процент выполнения: <span class="success">{{ profileData?.tests.success_rate }}%</span></p>
                <p>- Раздел: {{ profileData?.tests.section }}</p>
              </div>
              <div class="right">
                <p>Знания в теме</p>
                <p class="arrow-up">⬆</p>
                <p class="success">повышены</p>
              </div>
            </div>
          </div>
          <button class="expand-btn">развернуть</button>
        </div>
        
        <div class="card">
          <h2>ТЕМЫ</h2>
          <div class="card-inner">
            <div class="card-content">
              <div class="left">
                <p>{{ profileData?.topics.name }}</p>
                <p>- Тестов пройдено: {{ profileData?.topics.tests_passed }}</p>
              </div>
              <div class="right">
                <p>Процент успешного выполнения</p>
                <p class="failure">{{ profileData?.topics.success_rate }}%</p>
              </div>
            </div>
          </div>
          <button class="expand-btn">развернуть</button>
        </div>
      </div>
    </div>
  </div>
</template>




<style scoped>
.profile-page {
  background: url('@/assets/backgrounds/MainPageBackground.png') no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.user-info {
  color: #000;
  text-align: center;
}

.status .novice {
  color: green;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 500px;
  margin-bottom: 20px;
  text-align: center;
}

.card h2 {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.card-box {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right {
  text-align: right;
}

.arrow-up {
  font-size: 24px;
  color: green;
}

.success {
  color: green;
  font-weight: bold;
}

.failure {
  color: red;
  font-weight: bold;
}

.expand-btn {
  background: linear-gradient(90deg, #C89FF5, #7DA1EF);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 10px auto 0;
}

.card-inner {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

</style>