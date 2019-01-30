<template>
  <div class="katalog"
       row
       v-touch="{right: () => goUp()}">

    <category v-if="isCat"
              :key="'cat_'+entity.id"
              :id="entity.id"
              :type="entity.type"/>
    <product v-if="isProduct"
             :key="'product_'+entity.id"
             :id="entity.id"
    ></product>
  </div>
</template>

<script>
  import Category from '../../components/Category.vue'
  import Product from '../../components/Product.vue'

  export default {
    name: "catalog",
    components: {Category, Product},
    data: function () {
      return {
        entity: {}
      }
    },
    methods: {
      goUp() {
        let parent = this.$store.getters.section(this.entity.parent);
        if (parent !== undefined) {
          this.$router.push(parent.url)
        }

      }
    },
    computed: {
      isCat() {
        if (this.entity === undefined) {
          return false;
        }
        if (this.entity.type === undefined) {
          return false;
        }
        return true
      },
      isProduct() {
        if (this.isCat) {
          return false;
        }
        if (this.entity === undefined) {
          return false;
        }
        if (this.entity.id === undefined) {
          return false;
        }
        return true;
      }
    },

    created() {

      this.entity = this.$store.getters.catFromSlug(this.$route.path);

      if (this.entity === undefined) {
        this.entity = this.$store.getters.productFromSlug(this.$route.path);
      }
      if (this.entity === undefined) {
        this.entity = "404"
      }
    },

    fetch({store, params}) {
      return store.dispatch('loadCatalogAll', '/catalog/' + params.pathMatch);
    },

  }
</script>

<style scoped>
  .katalog {
    padding-bottom: 40px;
  }

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
