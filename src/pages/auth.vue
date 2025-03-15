<template>
  <div>
    <form @submit.prevent="handleLogin">
      <p class="title">Авторизация</p>
      <p v-if="errorMessage" class="errorMsg">{{ errorMessage }}</p>
      <div class="input-container">
        <span class="icon"><img src="@/assets/login.svg" alt=""></span>
        <input type="text" placeholder="Логин" v-model="login" required />
      </div>
      <div class="input-container">
        <span class="icon"><img src="@/assets/password.svg" alt=""></span>
        <input type="password" placeholder="Пароль" v-model="password" required />
      </div>
      <div class="checkbox-container">
        <input type="checkbox" name="save_pass" id="">
        <p>Запомнить пароль</p>
      </div>
      <button type="submit">Войти</button>
      <a href="/register">Регистрация</a>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from "@/api/index";

const login = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = '';
  try {
    const response = await api.post('/user/login', {
      login: login.value,
      password: password.value
    });
    localStorage.setItem('authenticated', 'true');
    router.push('/');
  } catch (error) {
    errorMessage.value = 'Неверный логин или пароль!';
    console.error('Ошибка авторизации:', error);
  }
};
</script>

<style scoped>
form {
  max-width: 407px;
  width: 100%;
  min-height: 475px;
  margin: 70px auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.2), 0 8px 15px rgba(0, 0, 0, 0.5);
}
.input-container {
  max-width: 270px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: 36px;
  margin-bottom: 22px;
}
input {
  max-width: 207px;
  width: 100%;
  height: 45px;
  border: 2px solid black;
  border-radius: 0 5px 5px 0;
  padding: 10px;
}
.checkbox-container {
  display: flex;
  gap: 10px;
}
input[type="checkbox"] {
  max-width: 20px;
  width: 100%;
  height: 20px;
  border: 2px solid black;
  border-radius: 0 5px 5px 0;
  margin-left: 36px;
}
.title {
  font-size: 26px;
  margin-left: 36px;
  margin-bottom: 25px;
}
button {
  font-size: 16px;
  background-image: linear-gradient(to right, #C99FF5, #7EA2F0);
  max-width: 242px;
  width: 100%;
  height: 44px;
  font-weight: bold;
  border-radius: 5px;
  margin: 20px auto;
}
a {
  text-decoration: underline;
  margin-left: 36px;
  font-size: 14px;
}
.errorMsg {
  color: red;
  margin: 0 0 10px 36px;
}
</style>
