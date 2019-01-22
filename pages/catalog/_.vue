<template>

  <v-layout class="katalog"
            row
            v-touch="{right: () => goUp()}">
<category
  :key="'cat_'+currentSectionId"
  :id="currentSectionId"
  :type="currentPageType"
>


</category>

  </v-layout>

</template>

<script>
  import Category from '../../components/Category.vue'
  export default {
    name: "catalog",
    components:{Category},
    key: "catalog",
    data: function () {
      return {
      }
    },
    computed: {
      currentPageType(){
        if (this.$store.state.slugMap['/catalog/' + this.$route.params.pathMatch] !== undefined) {
          return this.$store.state.slugMap['/catalog/' + this.$route.params.pathMatch].type
        } else {
          return 'productDetail';
        }
      },
      currentSectionId() {
        if (this.$store.state.slugMap['/catalog/' + this.$route.params.pathMatch] !== undefined) {
          return this.$store.state.slugMap['/catalog/' + this.$route.params.pathMatch].id
        }
        //return 0;
      }

    },
    watch: {
      currentSectionId(id) {
        if (this.currentPageType == 'productList') {
          this.$store.dispatch('loadProductslist', id);
        }
      }
    },

    methods: {
      goUp() {
        this.$router.back();
      }
    },
    created() {

    }
  }
</script>

<style scoped>


  .sub_cat {
    min-height: 100vh;
    display: none;
    position: fixed;
    top: 0;
    background: white;
    width: 100%;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }

  .list-enter-active, .list-leave-active {
    transition: all .1s;
  }

  .list-enter-active {
    transition-delay: .1s;
  }

  .list-enter /* .list-leave-active до версии 2.1.8 */
  {
    opacity: 0;
    transform: scaleY(0);
  }

  .list-leave-to /* .list-leave-active до версии 2.1.8 */
  {
    opacity: 0;
    transform: scaleY(0);
  }
</style>
