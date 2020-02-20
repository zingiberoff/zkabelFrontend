<template>
  <category :key="'cat_0'"
            :id="0"
            type="sectionList"/>
</template>

<script>
  import Category from '../components/Category.vue'

  export default {
    components: {Category},
    fetch({store}) {
      return store.dispatch('loadCatalog');
    },
  }
</script>
