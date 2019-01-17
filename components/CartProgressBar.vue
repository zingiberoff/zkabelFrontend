<template>
    <div class="pb" v-if="sum>0">
        <div class="progress-bar" :style="progress">
        </div>
        <div class="labels">
            <div v-for="(step, index) in steps" :class="step.classList" v-if="step.name">{{step.name}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CartProgressBar",
        props: ['sum'],
        data: function () {
            return {
                steps: [
                    {
                        name: 'Розничная цена',
                        pos: 69,
                        sum: 0,
                        classList: 'active'
                    },
                    {
                        name: 'Оптовая цена',
                        pos: window.innerWidth - 55,
                        sum: 5000,
                        classList: ''
                    },

                ],


            }
        },
        created: function () {
        },
        computed: {
            progress: function () {
                let start = 0;
                let result = 0;
                let curLenght = 0;
                let coef = 0;
                let sum = parseInt(this.sum);
                for (let i = 0; i < this.steps.length; i++) {
                    let prev = this.steps[i - 1];
                    let cur = this.steps[i];
                    let next = this.steps[i + 1];
                    if (sum > cur.sum) {
                        cur.classList = 'check active';
                        start = cur.pos;
                        if (prev) prev.classList = 'check';

                        if (next && sum < next.sum) {
                            next.classList = '';
                            coef = (sum - cur.sum) / (next.sum - cur.sum);
                            curLenght = next.pos - cur.pos;
                            break;
                        }
                        if (!next) {
                            coef = sum / (sum + 80000);
                            curLenght = window.innerWidth - cur.pos;
                            break
                        }
                    }

                }
                result = start + curLenght * coef;


                return 'width: ' + result + 'px;';
            }
        }
    }
</script>

<style scoped>

    .pb {
        background-color: #f5f5f5;
        height: 18px;
        width: 100%;
        position: fixed;
        bottom: 55px;
        z-index: 10;
    }

    .progress-bar {
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