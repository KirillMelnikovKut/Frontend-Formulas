<template>
    <div>
        <form action="">
            <p class="title">Авторизация</p>
            <div class="input-container">
                <span class="icon"><img src="./assets/login.svg" alt=""></span>
                <input type="text" placeholder="Логин" name="login" />
            </div>
            <div class="input-container">
                <span class="icon"><img src="./assets/password.svg" alt=""></span>
                <input type="text" placeholder="Пароль" name="pass1" />
            </div>
            <div class="checkbox-container">
                <input type="checkbox" name="save_pass" id="">
                <p>Запомнить пароль</p>
            </div>
            <button>Войти</button>
            <a href="#">Забыли пароль?</a>
        </form>
    </div>
</template>

<script></script>

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
</style>