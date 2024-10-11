<template >
    <div class="wrapper">
        <p class="test__heading">
            Тесты по физике 
        </p>
        <ul class="test__list">
            <li class="test__item">
                <RouterLink to="/test/1" class="test__link">
                    1
                </RouterLink>
            </li>
            <li class="test__item">
                <RouterLink to="/test/2" class="test__link">
                    2
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<style lang="css" scoped>
.wrapper {
    padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
}

.test__heading {
    font-size: 2rem;
}

.test__item {
    margin-top: 15px;
}

.test__link {
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    background-color: rgb(136, 136, 240);
    border-radius: 3px;
    border: 1px solid rgb(111, 111, 233);
}


</style>