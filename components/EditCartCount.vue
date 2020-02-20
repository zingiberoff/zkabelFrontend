<template>
  <div class="cart-counter" v-if="active">
    <div class="minus" @click="minus()"></div>
    <input @change="changeCount" @input="" :value="count">
    <div class="plus" @click="plus()"></div>
  </div>
  <v-btn
    v-else
    large
    color='accent'
    style="width: 130px"
    :loading="true"
    :disabled="true"
  >

    <span :slot="true" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
  </v-btn>
</template>

<script>
  export default {
    name: "EditCartCount",
    props: {
      product_id: Number,
      step: Number,
    },
    data: function () {
      return {
        active: true,

        oldValue: 0,
      }
    }
    ,
    computed: {
      count: {
        get() {
          this.oldValue = this.$store.getters.inCart[this.product_id];
          return this.$store.getters.inCart[this.product_id]
        },
        set(val) {
          console.log(val - this.oldValue);
          this.active = false;
          this.$store.dispatch('addToCart', {id: this.product_id, count: val - this.oldValue}).then(() => {
            this.active = true;
          }).catch(e => console.log(e));
          this.oldValue = val
        }
      }
    },
    created() {
      this.oldValue = this.$store.getters.inCart[this.product_id]
    },
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
        this.count = count;
      }
    },

  }
</script>

<style scoped>

  .cart-counter {
    margin: 6px 8px;
    position: relative;
    display: flex;
    width: 130px;
    border: 1px solid #d3d3d3;
    padding: 6px;
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

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>
