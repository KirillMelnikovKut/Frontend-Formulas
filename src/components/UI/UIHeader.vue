<template>
  <header class="header">
    <div class="header__container">
      <RouterLink to="/">
        <img
          src="@/assets/icons/logo.svg"
          alt="physics-logo"
        />
      </RouterLink>
      <nav class="header__menu menu">
        <ul class="menu__list">
          <li class="menu__item">
            <RouterLink to="/theory" class="menu__link">
              Теория
            </RouterLink>
          </li>
          <li class="menu__item">
            <RouterLink to="/test" class="menu__link">
              Практика
            </RouterLink>
          </li>
          <li class="menu__item">
            <RouterLink to="/video" class="menu__link">
              Видеолекции
            </RouterLink>
          </li>
        </ul>
        <div class="menu__profile">
            <RouterLink to="/" class="menu__link">
              <img
              class="menu__icon"
              src="@/assets/icons/profile.svg"
              alt="profile"
              />
            </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
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
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__item {
    width: 15vw;
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
