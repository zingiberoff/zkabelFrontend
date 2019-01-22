<template>
    <div class="cart-counter">
        <div class="minus" @click="minus()"></div>
        <input @change="changeCount" :value="countInCart">
        <div class="plus" @click="plus()"></div>
    </div>
</template>

<script>
    export default {
        name: "EditCartCount",
        props: {
            product_id: Number,
            countInCart: Number,
            step: Number
        },
        data: function () {
            return {
                count: this.countInCart
            }
        }
        ,
        watch: {
            count: function (a, b) {
                console.log(a - b);
              $store.dispatch('addToCart',{id: this.product_id, count: a - b});
            }
        }
        ,
        methods: {
            plus: function (e) {
                this.count = this.count + this.step;
            }
            ,
            minus: function (e) {
                if (this.count - this.step > 0) {
                    this.count = this.count - this.step;
                } else {
                    this.count = 0;
                }
            }
            ,
            changeCount: function (e) {
                let count = parseInt(e.target.value);
                if (count > 0) {
                    if (count % this.step !== 0) {
                        count = count + this.step - count % this.step;
                    }
                } else {
                    count = 0;
                }
                console.log(count);
                this.count = count;
            }
        },
    }
</script>

<style scoped>

    .cart-counter {
        position: relative;
        display: flex;
        width: 130px;
        border: 1px solid #d3d3d3;
        padding: 7px 6px;
        justify-content: space-between;
    }

    .cart-counter input {
        text-align: center;
        width: 49px;
        border: none;
        font-size: larger;
        padding: 0 2px;
    }

    .cart-counter .minus,
    .cart-counter .plus {
        width: 30px;
        height: 30px;
        position: relative;
    }

    .cart-counter .minus::before,
    .cart-counter .plus::before {
        background-color: #f04801;
        content: " ";
        position: absolute;
        left: 7px;
        top: 14px;
        width: 16px;
        height: 2px;
    }

    .cart-counter .plus::after {
        background-color: #f04801;
        content: " ";
        top: 7px;
        left: 14px;
        position: absolute;
        width: 2px;
        height: 16px;
    }

</style>
