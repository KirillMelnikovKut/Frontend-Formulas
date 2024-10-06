<template>
  <header class="header">
    <div class="header__container">
      <a
        href="#"
        class="header__logo"
      >
        <img
          src="@/assets/icons/logo.svg"
          alt="physics-logo"
        />
      </a>
      <nav class="header__menu menu">
        <ul class="menu__list">
          <li class="menu__item">
            <a
              href="#"
              class="menu__link"
              @click="handleTheoryClick"
              >теория</a
            >
          </li>
          <li class="menu__item">
            <a
              href="#"
              class="menu__link"
              @click="handlePracticesClick"
              >практика</a
            >
          </li>
          <li class="menu__item">
            <a
              href="#"
              class="menu__link"
            >
              <img
                class="menu__icon"
                src="@/assets/icons/profile.svg"
                alt="profile"
              />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import $router from '@/router/index';

const handleTheoryClick = computed(() => {
  $router.push({ path: 'theory' });
});

const handlePracticesClick = computed(() => {
  $router.push({ path: 'practices' });
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: #241e20;
  z-index: 50;
  &__container {
    display: flex;
    min-height: 80px;
    align-items: center;
    padding: 0 40px;
  }
}

.menu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__list {
    margin-left: auto;
    display: flex;
    justify-content: center;
  }

  &__item {
    margin-left: 60px;
    display: flex;
  }

  &__link {
    text-decoration: underline 0.1em rgba(255, 255, 255, 0);
    transition: text-decoration-color 300ms;
    font-size: 24px;
    color: #ffffff;
    &:hover {
      text-decoration-color: #ffffff;
    }
  }

  &__icon {
    width: 38px;
    height: 38px;
  }
}
</style>
