<template>

  <v-btn
    large
    color='accent'
    @click="add"
    :loading="loadingOr"
    :disabled="loadingOr"
  >
    Купить
    <span slot="loading" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
  </v-btn>
</template>

<script>
  export default {
    name: "AddToCart",
    props: ['product_id', 'moq'],
    data: function () {
      return {
        loading: false
      }
    }
    ,
    methods:
      {
        add() {

          this.loading = true;
          this.$store.dispatch('addToCart', {id: this.product_id, count: this.moq}).then(() => {
            this.loading = true
          }).catch((e)=>{ this.loading = true})
            this.$emit('click');
        }
      },
      computed:{
        loadingOr(){
         return this.loading||this.$store.state.loading
        }
      }


  }
</script>

<style scoped>
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
