<template>
  <UIHeader></UIHeader>
  <UIButton variant='primary' label='Челты'/>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import UIButton from '@/components/UI/UIButton.vue';
import UIHeader from '@/components/UI/UIHeader.vue';
import $router from '@/router/index.ts'

const isAuth = localStorage.getItem("isAuth") === "true";

if (!isAuth) $router.push({ path: 'auth' });
</script>

<style scoped>
</style>
