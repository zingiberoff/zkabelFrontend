<template>
  <v-autocomplete
    v-if="location"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    v-model="select"
    item-text="name"
    item-value="id"
    cache-items
    hide-no-data
    hide-details
    :label="property.NAME"
  ></v-autocomplete>


</template>

<script>
  import axios from 'axios';

  export default {
    name: "AddressStreet",
    props: ['property'],
    computed: {
      location() {
        return this.$store.getters.location
      }
    },
    data: function () {
      return {
        loading: false,
        items: [],
        search: null,
        select: null,
      }
    },
    watch: {
      search(val) {
        val && val !== this.select && this.querySelections(val)
      },
      select: function (val, old) {
        if (old == undefined) {
          old = ''
        }
        if (val != null && val.trim() !== old.trim()) {
          this.$store.commit('setOrderProperty', {code: this.property.CODE, value: val})
        }
      }
    },
    methods: {
      querySelections(v) {
        let data = {
          LOCATION: this.location,
          ACTION: 'searchStreet',
          STREET: v
        };
        this.loading = true;
        axios.post('https://www.zkabel.ru/api/kladrapi/searchStreet/', data).then(
          response => {
            if (response.status == '200' && response.data != "") {
              this.items = response.data.result.ITEMS;
              this.loading = false;
            }
          }).catch(e=>{console.log(e)});
      }


    },
      beforeMount: function () {
          this.querySelections(this.property.VALUE);

      this.search = this.property.VALUE;
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
