<template>
    <v-layout class="progress-bar-layout" justify-center row v-if="percent>0">
        <v-flex class="special" xs8>
            Индивидуальная скидка {{percent}} %
        </v-flex>
    </v-layout>
    <div v-else>
        <div :style="left" class="progress-bar-layout pb" v-if="sum>0">
            <div :style="progress" class="progress-bar">
            </div>
            <div class="labels">
                <div :class="step.classList" :key="index" v-for="(step, index) in steps" v-if="step.name">
                    {{step.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",

        data: function () {
            return {
                steps: [
                    {
                        name: 'Розничная цена',
                        pos: 5,
                        sum: 0,
                        classList: 'active',
                        left: 0
                    },
                    {
                        name: 'Оптовая цена',
                        pos: 35,
                        sum: 30000,
                        classList: ''
                    },
                    {
                        name: '-5%',
                        pos: 65,
                        sum: 100000,
                        classList: ''
                    },
                    {
                        name: '-10%',
                        pos: 95,
                        sum: 200000,
                        classList: ''
                    }

                ],


            }
        },
        created: function () {
        },
        computed: {
            percent() {
                return this.$store.state.user.discounts.percent
            },
            sum() {
                return parseFloat(this.$store.getters.cartSummBase)
            },
            progress: function () {
                let start = 0;
                let result = 0;
                let curLenght = 0;
                let coef = 2;

                for (let i = 0; i < this.steps.length; i++) {
                    let prev = this.steps[i - 1];
                    let cur = this.steps[i];
                    let next = this.steps[i + 1];
                    if (this.sum > cur.sum) {
                        cur.classList = 'check active';
                        start = cur.pos;
                        if (prev) prev.classList = 'check';

                        if (next && this.sum < next.sum) {
                            next.classList = '';
                            coef = (this.sum - cur.sum) / (next.sum - cur.sum);
                            curLenght = next.pos - cur.pos;
                            break;
                        }
                        if (!next) {
                            coef = this.sum / (this.sum + 200000);
                            curLenght = 100 - cur.pos;
                            break
                        }
                    }

                }
                result = start + curLenght * coef;


                return 'width: ' + result + '%';
            },
            currStep() {

                for (let i = 0; i < this.steps.length; i++) {
                    if (this.sum > this.steps[i].sum && (this.steps[i + 1] === undefined || this.sum < this.steps[i + 1].sum)) {
                        return {item: this.steps[i], index: i};
                    }
                }

            },
            left() {
                let left = this.currStep.index * (-50)
                if (left < -100) left = "-100"
                return 'left:' + left + '%'
            }
        }
    }
</script>

<style scoped>
    .special {
        color: #f04801;
    }

    .progress-bar-layout {
        background-color: #f5f5f5;
        height: 18px;
        width: 100%;
        position: fixed;
        bottom: 55px;
        z-index: 10;
        transition: all 1s ease-in-out;
        overflow-y: hidden
    }

    .progress-bar-layout.pb {
        width: 200%;
    }

    .progress-bar {
        transition: all .5s ease-in-out;
        width: 0%;
        background-color: #f04801;
        z-index: 11;
        height: 3px;
        bottom: 0;
        position: absolute;
    }

    .pb .labels {
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-size: 10px;
    }

    .pb .labels > div {
        position: relative;
        text-align: center;
        width: 128px;
        line-height: 13px;
    }

    .pb .labels > div.active {
        font-weight: 900;
        font-size: 13px;
    }

    .pb .labels > div::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        background-color: white;
        bottom: -9px;
        left: 50%;
        border: 1px solid #f04801;
        border-radius: 50%;
        z-index: 12;
    }

    .pb .labels > div.check::before {
        background-color: #f04801;
        border: 2px solid white;
    }

    .pb .labels > div.active::before {
        transform: scale(1.5);
    }

</style>
