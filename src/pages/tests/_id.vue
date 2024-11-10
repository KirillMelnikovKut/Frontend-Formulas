<template>  
    <RouterLink to="/test" class="test__return">
        <- Назад
    </RouterLink>
    <div class="wrapper">
        <p class="test__heading">
            Тест по физике № {{ $route.params.id }}.  
        </p>
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
        <div v-for="i in questionsPull.length" class="test__options-wrapper">
            <fieldset v-if="i == progress" class="test__options options">
                <div v-for="n in questionsPull[progress - 1].answersPull.length" class="options__wrapper" v-on:click="selectAnswer($event, n)">
                    <input class="options__radio" type="radio" name="pull" :id="i + ' ' + n" :value="questionsPull[progress - 1].answersPull[n - 1]"/>
                    <label :for="i + ' ' + n" class="options__label">{{ questionsPull[progress - 1].answersPull[n - 1] }}</label>
                </div>
            </fieldset>
        </div>
        
        <div class="test__buttons">
            <button class="test__button" @click="decrease">Назад</button>
            <button v-if="progress != questionsPull.length" class="test__button" @click="increase">Вперёд</button>
            <button v-if="progress == questionsPull.length" class="test__button" @click="sendResults">Завершить</button>

        </div>
    </div>
</template>

<script>
    import katex from 'katex'
    export default {
        data() {
            return {
                progress: 1,
                questionsPull: [
                    {
                        formula: "c = \\pm\\sqrt{a^2 + b^2}",
                        correctAnswer: 0,
                        givenAnswer:-1,
                        answersPull: [
                            'Ответ 1.',
                            'Ответ 2.',
                            'Ответ 3.',
                            'Ответ 4.',
                        ]
                    },
                    {
                        formula: "f(a,b,c) = (a^2+b^2+c^2)^3",
                        correctAnswer: 1,
                        givenAnswer: -1,
                        answersPull: [
                            'Ответ 5.',
                            'Ответ 6.',
                            'Ответ 7.',
                            'Ответ 8.',
                        ]
                    },
                    {
                        formula: "c = \\sum_{i=1}^\\infty\\frac{1}{n^2}=\\frac{\\pi^2}{6}",
                        correctAnswer: 2,
                        givenAnswer: -1,
                        answersPull: [
                            'Ответ 1.',
                            'Ответ 2.',
                            'Ответ 3.',
                            'Ответ 4.',
                        ]
                    },
                    {
                        formula: "c = \\frac{d }{dx}\\in \\overline{B}\\cos30",
                        correctAnswer: 0,
                        givenAnswer: -1,
                        answersPull: [
                            'Ответ 1.',
                            'Ответ 2.',
                            'Ответ 3.',
                            'Ответ 4.',
                        ]
                    },
                    {
                        formula: "\\prod_{\\substack{p\\leq x\\\ }}\\left(1-\\dfrac{1}{p}\\right)",
                        correctAnswer: 1,
                        givenAnswer: -1,
                        answersPull: [
                            'Ответ 1.',
                            'Ответ 2.',
                            'Ответ 3.',
                            'Ответ 4.',
                        ]
                    },
                    {
                        formula: "c = \\pm\\sqrt{e^4 + f^4}",
                        correctAnswer: 2,
                        givenAnswer: -1,
                        answersPull: [
                            'Ответ 1.',
                            'Ответ 2.',
                            'Ответ 3.',
                            'Ответ 4.',
                        ]
                    },
                    {
                        formula: "c = \\pm\\sqrt{a^2 + b^2}",
                        correctAnswer: 0,
                        givenAnswer:-1,
                        answersPull: [
                            'Ответ 1.',
                            'Ответ 2.',
                            'Ответ 3.',
                            'Ответ 4.',
                        ]
                    },
                    {
                        formula: "c = \\pm\\sqrt{c^3 + d^3}",
                        correctAnswer: 1,
                        givenAnswer: -1,
                        answersPull: [
                            'Ответ 1.',
                            'Ответ 2.',
                            'Ответ 3.',
                            'Ответ 4.',
                        ]
                    },
                    {
                        formula: "c = \\pm\\sqrt{e^4 + f^4}",
                        correctAnswer: 2,
                        givenAnswer: -1,
                        answersPull: [
                            'Ответ 1.',
                            'Ответ 2.',
                            'Ответ 3.',
                            'Ответ 4.',
                        ]
                    },
                    {
                        formula: "c = \\pm\\sqrt{a^2 + b^2}",
                        correctAnswer: 0,
                        givenAnswer:-1,
                        answersPull: [
                            'Ответ 1.',
                            'Ответ 2.',
                            'Ответ 3.',
                            'Ответ 4.',
                        ]
                    },
                    {
                        formula: "c = \\pm\\sqrt{c^3 + d^3}",
                        correctAnswer: 1,
                        givenAnswer: -1,
                        answersPull: [
                            'Ответ 1.',
                            'Ответ 2.',
                            'Ответ 3.',
                            'Ответ 4.',
                        ]
                    },
                    {
                        formula: "c = \\pm\\sqrt{e^4 + f^4}",
                        correctAnswer: 2,
                        givenAnswer: -1,
                        answersPull: [
                            'Ответ 1.',
                            'Ответ 2.',
                            'Ответ 3.',
                            'Ответ 4.',
                        ]
                    }
                ]
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
                let katexFormula = katex.renderToString(this.questionsPull[this.progress - 1].formula, {throwOnError: false})
                let formula = document.getElementById('formula')
                formula.innerHTML = katexFormula.trim()
                document.getElementsByClassName('katex-html')[0].remove()

                if(this.questionsPull[this.progress - 1].givenAnswer != -1) {
                    this.$nextTick(() => {
                        document.getElementById(`${this.progress} ${this.questionsPull[this.progress - 1].givenAnswer}`).checked = true
                    })
                }
            },
            sendAnswers() {

            },
            progressClickHandler(e) {
                let index = e.currentTarget.children[0].innerHTML
                this.progress = Number(index)
                this.renderFormula()
            },
            selectAnswer(e, n) {
                this.questionsPull[this.progress - 1].givenAnswer = n
            },
            sendResults() {
                for(let i = 0; i < this.questionsPull.length; i++) {
                    console.log(this.questionsPull[i].givenAnswer)
                }
            }
        },
        mounted: function() {
            this.renderFormula()
            this.sendAnswers()
        }
    }
</script>

<style lang="css" scoped>
.wrapper {
    min-width: 560px;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 40%;
    margin: 0 auto;
}

.test__heading {
    font-size: 2rem;
    font-weight: 500;
    color: #777777;
}

.test__return { 
    margin-left: 20px;
}

.test__progress-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 600px;
    max-width: 100%;
    margin: 0 auto;
}

.test__progressOf {
    color: #777777;
    font-size: 1.3rem;
    font-weight: 900;
    margin-top: 20px;
}

.test__progress {
    flex: 1 0 21%;
    margin: 8px;
    margin-top: 20px;
    width: 40px;
    height: 40px;
    background-color: #D9D9D9;
    color: #777777;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
}

.test__progress--current {
    color: #7DA1EF;
    background-color: white;
    border: 4px solid #7DA1EF;
}

.test__progress--given {
    color: white;
    background-color: #7DA1EF;
}

.test__progress--currentGiven {
    color: white;
    background-color: #7DA1EF;
    border: 4px solid #5d85db;
}

#formula {
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 3rem;
    font-weight: 900;
    min-height: 140px;
    width: 100%;
    border: 4px solid #7DA1EF;
    border-radius: 3px;
    margin-top: 20px
}

.test__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.test__button {
    background-color: #7DA1EF;
    color: white;
    font-size: 1.5rem;
    border-radius: 4px;
    padding: 10px;
    min-width: 250px;
    margin-top: 40px;
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