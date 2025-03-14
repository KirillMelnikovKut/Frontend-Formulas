<template>
  <div>
    <form @submit.prevent="handleRegister">
      <p class="title">Регистрация</p>
      <p v-if="errorMessage" class="errorMsg">{{ errorMessage }}</p>
      <p class="description">Заполните все поля, чтобы создать аккаунт</p>
      <div class="input-container">
        <span class="icon"><img src="@/assets/login.svg" alt=""></span>
        <input type="text" placeholder="Логин" name="login" v-model="login" required />
      </div>
      <div class="input-container">
        <span class="icon"><img src="@/assets/login.svg" alt=""></span>
        <input type="text" placeholder="Никнейм" name="nickname" v-model="nickname" required />
      </div>
      <div class="input-container">
        <span class="icon"><img src="@/assets/password.svg" alt=""></span>
        <input type="password" placeholder="Пароль" name="pass1" v-model="password1" required />
      </div>
      <div class="input-container">
        <span class="icon"><img src="@/assets/password.svg" alt=""></span>
        <input type="password" placeholder="Повторите пароль" name="pass2"  v-model="password2" required/>
      </div>
      <div class="checkbox-container">
        <input type="checkbox" name="save_pass" id="">
        <p>Запомнить пароль</p>
      </div>
      <button type="submit">Зарегистрироваться</button>
      <p class="login-link">Уже зарегистрированы? <a href="/auth">Войти в систему</a></p>
    </form>
  </div>
</template>

<script setup lang="ts">
import api from "@/api/index.ts"; // Импортируйте ваш API
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const login = ref('');
const password1 = ref('');
const password2 = ref('');
const nickname = ref('');
const errorMessage = ref('');
const router = useRouter();

const validPassword = (p1: string, p2: string) => {
  return p1 === p2;
};

const handleRegister = async () => {
  errorMessage.value = '';

  const valid = validPassword(password1.value, password2.value);
  if (valid) {
    try {
      const response = await api.post('/user/register', {
        login: login.value,
        password: password1.value,
        nickname: nickname.value
      });
      localStorage.setItem('authenticated', 'true');
      await router.push('/intro');
    } catch (error) {
      errorMessage.value = 'Ошибка регистрации';
      console.error('Ошибка регистрации:', error);
    }
  } else {
    errorMessage.value = 'Пароли не совпадают. Попробуйте еще раз.';
  }
};
</script>

<style scoped>
form {
  max-width: 407px;
  width: 100%;
  min-height: 475px;
  margin: 70px auto 50px;
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
}
.description {
  font-size: 12px;
  margin-left: 36px;
  margin-bottom: 20px;
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
.login-link {
  margin-left: 36px;
  font-size: 14px;
}
a {
  text-decoration: underline;
  color: #4A6EBA;
}
.errorMsg {
  color: red;
  margin: 0 0 10px 36px;
}
</style>
