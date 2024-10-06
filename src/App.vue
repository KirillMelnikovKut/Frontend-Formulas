<template>
  <UIHeader></UIHeader>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import UIHeader from '@/components/UI/UIHeader.vue';
import $router from '@/router/index'

// const isAuth = localStorage.getItem("isAuth") === "true";
const isAuth = "true";


if (!isAuth) $router.push({ path: 'auth' });
</script>

<style scoped>
</style>
