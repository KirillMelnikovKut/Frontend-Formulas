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
</script>

<style scoped>
</style>
