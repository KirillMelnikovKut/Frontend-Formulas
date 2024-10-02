<template>
  <header class="header">
    <div class="header__container">
      <a href="#" class="header__logo">
        <img src="@/assets/icons/logo.svg" alt="physics-logo">
      </a>
      <nav class="header__menu menu">
        <ul class="menu__list">
          <li class="menu__item">
            <a href="#" class="menu__link">теория</a>
          </li>
          <li class="menu__item">
            <a href="#" class="menu__link">практика</a>
          </li>
          <li class="menu__item">
            <a href="#" class="menu__link">
              <img class="menu__icon" src="@/assets/icons/profile.svg" alt="profile">
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    width: 100%;
    background-color: #241E20;
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
      color: #FFFFFF;
      &:hover {
        text-decoration-color: #FFFFFF;
      }
    }

    &__icon {
      width: 38px;
      height: 38px;
    }
  }
</style>
