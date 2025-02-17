<template>
    <section class="main">
        <img class="main__logo" src="@/assets/icons/logo.svg" alt="physics-logo">
        <h1 class="main__heading">Добро пожаловать!</h1>
        <h2 class="main__subheading">Здесь вы сможете повторить физику и проверить свои знания</h2>
        <UIButton class="main__button" variant="secondary" label="начать"/>
    </section>
</template>

<script setup lang="ts">
import UIButton from '@/components/UI/UIButton.vue';
</script>

<style scoped>
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;

        padding-top: 60px;
        text-align: center;
    }

    .main__logo {
        height: 9rem;
    }

    .main__heading {
        font-size: 6rem;
    }

    .main__subheading {
        font-size: 3rem;
        max-width: 842px;
        text-align: center;
    }

    .main__button {
        width: fit-content;
        padding: 0 50px;
        margin-top: 1rem;
        font-size: 2rem;
    }
</style>