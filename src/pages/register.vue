<template>
    <div>
        <form @submit.prevent="handleRegister">
            <p class="title">Регистрация</p>
            <p v-if="errorMessage" class="errorMsg">{{ errorMessage }}</p>
            <p class="description">Заполните все поля, чтобы создать аккаунт</p>
            <div class="input-container">
                <span class="icon"><img src="./assets/login.svg" alt=""></span>
                <input type="text" placeholder="Логин" name="login" v-model="login" required />
            </div>
            <div class="input-container">
                <span class="icon"><img src="./assets/login.svg" alt=""></span>
                <input type="text" placeholder="Никнейм" name="nickname" v-model="nickname" required />
            </div>
            <div class="input-container">
                <span class="icon"><img src="./assets/password.svg" alt=""></span>
                <input type="password" placeholder="Пароль" name="pass1" v-model="password1" required />
            </div>
            <div class="input-container">
                <span class="icon"><img src="./assets/password.svg" alt=""></span>
                <input type="password" placeholder="Повторите пароль" name="pass2"  v-model="password2" required/>
            </div>
            <div class="checkbox-container">
                <input type="checkbox" name="save_pass" id="">
                <p>Запомнить пароль</p>
            </div>
            <button type="submit">Зарегистрироваться</button>
            <p class="login-link">Уже зарегистрированы? <a href="#">Войти в систему</a></p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            login: '',
            password1: '',
            password2: '',
            nickname: '',
            errorMessage: ''
        };
    },
    methods: {
        validPassword(p1, p2) {
            return p1 === p2 ? true : false;
        },
        async handleRegister() {
            this.errorMessage = '';
            try {
                const valid = this.validPassword(this.password1, this.password2);
                if (valid) {
                    const response = await axios.post('http://formulas.std-2585.ist.mospolytech.ru/user/register', {
                        login: this.login,
                        password: this.password1,
                        nickname: this.nickname
                    });
                    if (response.data.success) {
                        console.log('Регистрация успешна:', response.data);
                    }
                } else {
                    this.errorMessage = 'Пароли не совпадают. Попробуйте еще раз.';
                }
            } catch (error) {
                this.errorMessage = 'Ошибка регистрации';
                console.error('Ошибка регистрации:', error);
            }
        }
    }
}
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