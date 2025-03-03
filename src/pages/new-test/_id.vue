<template>  
    <div class="wrapper">
        <p class="test__progressOf">
            {{ progress }} из {{ questionsPull.length }}
        </p>
        <ul class="test__progress-wrapper">
            <li v-for="n in questionsPull.length" @click="progressClickHandler">
                <p v-if="n == progress && questionsPull[n-1].givenAnswer == -1" class="test__progress test__progress--current">{{ n }}</p>
                <p v-if="n == progress && questionsPull[n-1].givenAnswer != -1" class="test__progress test__progress--currentGiven">{{ n }}</p>
                <p v-if="n != progress && questionsPull[n-1].givenAnswer != -1" class="test__progress test__progress--given">{{ n }}</p>
                <p v-if="n != progress && questionsPull[n-1].givenAnswer == -1" class="test__progress">{{ n }}</p>
            </li>
        </ul>

        <div id="formula" class="formula"/>
        <div class="test__formula">
        <div class="symbols">
            <img src="@/assets/symbols/velocity_outline.svg" alt="скорость" class="symbol">
            <img src="@/assets/symbols/equality_outline.svg" alt="знак равно" class="symbol">
        </div>
        </div>

        <div class="symbols">
            <img src="@/assets/symbols/equality.svg" alt="равно" class="symbol">
            <img src="@/assets/symbols/initial_velocity.svg" alt="начальная скорость" class="symbol">
            <img src="@/assets/symbols/g.svg" alt="ускорение свободного падения" class="symbol">
            <img src="@/assets/symbols/s.svg" alt="расстояние" class="symbol">
            <img src="@/assets/symbols/t.svg" alt="время" class="symbol">
            <img src="@/assets/symbols/division.svg" alt="деление" class="symbol">
            <img src="@/assets/symbols/degree.svg" alt="степень" class="symbol">
            <img src="@/assets/symbols/square_root.svg" alt="квадратный корень" class="symbol">
        </div>

        <!-- <div v-for="i in questionsPull.length" class="test__options-wrapper">
            <fieldset v-if="i == progress" class="test__options options">
                <div v-for="(option, index) in questionsPull[progress - 1].options" :key="index" class="options__wrapper">
                    <input
                    class="options__radio"
                    type="radio"
                    :name="'question' + progress"
                    :id="progress + ' ' + (index + 1)"
                    :value="option"
                    v-model="questionsPull[progress - 1].givenAnswer"
                    />
                    <label :for="progress + ' ' + (index + 1)" class="options__label">{{ option }}</label>
                </div>
            </fieldset>
        </div> -->
        
        <div class="test__buttons">
            <button class="test__button" @click="decrease">Назад</button>
            <button v-if="progress != questionsPull.length" class="test__button" @click="increase">Вперёд</button>
            <!-- <RouterLink v-if="progress == questionsPull.length" class="test__button" to="/results">Завершить</RouterLink> -->
            <button v-if="progress == questionsPull.length" class="test__button" @click="sendResults">Завершить</button>

        </div>
    </div>
</template>

<script>
import katex from 'katex'
import { RouterLink } from 'vue-router';
    export default {
        data() {
            return {
                progress: 1,
                questionsPull: [],
                results: [],
                startTime: 0,
                endTime: 0,
                completionTime: 0,
                timer: null,
            }
        },
        methods: {
            increase() {
                if (this.progress < this.questionsPull.length) {
                    this.progress += 1
                    this.renderFormula()                    
                }
            },
            decrease() {
                if (this.progress > 1) {
                    this.progress -= 1
                    this.renderFormula()
                } 
            },
            renderFormula() {
                let formula = document.getElementById('formula')
                formula.innerHTML = this.questionsPull[this.progress - 1].question
            },
            async getQuestions() {
                await fetch(`http://formulas.std-2585.ist.mospolytech.ru/quiz/start/${this.$route.params.id}`).then(resp => {
                    resp.json().then(res => {
                        this.questionsPull = res.questions
                        this.questionsPull.forEach(elem => {
                            elem.givenAnswer = -1
                        })
                        this.renderFormula()
                    })
                })
            },  
            sendAnswers() {

            },
            progressClickHandler(e) {
                let index = e.currentTarget.children[0].innerHTML
                this.progress = Number(index)
                this.renderFormula()
            },
            selectAnswer(e, n) {
                this.questionsPull[this.progress - 1].givenAnswer = this.questionsPull[this.progress - 1].options[n - 1]
            },
            startTimer() {
                this.startTime = Date.now();
                this.timer = setInterval(() => {
                }, 1000);
            },
            async sendResults() {
                if (this.timer) clearInterval(this.timer); //Остановка таймера
                this.endTime = Date.now(); //Получаем текущее время

                const elapsedTime = (this.endTime - this.startTime) / 1000; // Высчитываем прошедшее время
                const minutes = Math.floor(elapsedTime / 60);
                const seconds = Math.floor(elapsedTime % 60);

                this.completionTime = `${minutes} мин ${seconds} сек`;

                let results = []
                for(let i = 0; i < this.questionsPull.length; i++) {
                    results.push(JSON.stringify({
                        question: this.questionsPull[i].description,
                        correct_answer: this.questionsPull[i].correct_formula_latex.replace(/^\\\(|\\\)$/g, ""),
                        selected_answer: this.questionsPull[i].givenAnswer,
                        is_correct: this.questionsPull[i].givenAnswer == this.questionsPull[i].correct_formula_latex.replace(/^\\\(|\\\)$/g, ""),
                    }))
                }
                this.$router.push({
                    path: '/results',
                    query: {formulasWithAnswers: results, completionTime: this.completionTime}
                })
                // await fetch('http://formulas.std-2585.ist.mospolytech.ru/quiz/submit_answers', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     answers: results,
                // }).then(resp => {
                //     resp.json().then(res => {
                //         console.log(res)
                //     })
                // })
            }
        },
        mounted: function() {
            this.getQuestions()
            this.sendAnswers()
            this.startTimer()
        }
    }
</script>

<style lang="css" scoped>
.wrapper {
    min-width: 560px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 746px;
    margin: 0 auto;
}

.test__progress-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    width: 600px;
    max-width: 100%;
    margin: 0 auto;
}

.test__progressOf {
    font-family: Gilroy;
    font-weight: 800;
    font-size: 24px;
    line-height: 29.4px;
    letter-spacing: 0%;
    text-align: center;
    margin-top: 89px;
    color: #868686;
}

.test__progress {
    flex: 1 0 21%;
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 17px;
    width: 32px;
    height: 32px;
    background-color: #D9D9D9;
    color: #777777;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
}

.test__progress--current {
    color: #7DA1EF;
    background-color: white;
    border: 3px solid #7DA1EF;
}

.test__progress--given {
    color: white;
    background-color: #7DA1EF;
}

.test__progress--currentGiven {
    color: white;
    background-color: #7DA1EF;
    border: 3px solid #4061a8;
}

#formula {
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 2rem;
    font-family: Gilroy;
    font-weight: 600;
    line-height: 40px;
    text-align: center;
    margin-top: 33px;
}

.test__formula {
    display: flex;
    width: 736px;
    height: 128px;
    top: 400px;
    left: 592px;
    border-bottom: 4px solid #C1C1C1;
}

.symbols {
    display: flex;
    width: 736px;
    height: 160px;
    top: 560px;
    left: 592px;
    gap: 32px;
    margin-top: 32px;
    gap: 32px;
    flex-wrap: wrap;
}

.symbol {
    height: 64px;
}

.test__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 32px;
    margin-top: 64px;
}

.test__button {
    background-color: #7DA1EF;
    color: white;
    font-size: 1.5rem;
    border-radius: 4px;
    width: 352px;
    height: 64px;
}

.test__options-wrapper {
    width: 100%;
}

.options__wrapper {
    display: flex;
    align-items: center;
}

.options__radio {
    width: 20px;
    height: 20px;
    accent-color: #7DA1EF;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: #7DA1EF;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid #7DA1EF;
}

.options__radio:checked:after {
    width: 20px;
    height: 20px;
    border-radius: 15px;
    position: relative;
    background-color: #7DA1EF;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid #7DA1EF;
}

.options__label {
    margin-left: 10px;
    font-size: 1.3rem;
}

.options {
    margin-top: 40px;
}
</style>