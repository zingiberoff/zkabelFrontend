<template>
  <v-autocomplete
    v-if="street"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    v-model="select"
    item-text="name"
    item-value="id"
    cache-items
    hide-no-data
    require
    hide-details
    :label="property.NAME"
  ></v-autocomplete>


</template>

<script>
  import axios from 'axios';

  export default {
    name: "AddressBuilding",
    props: ['property'],
    computed: {},
    data: function () {
      return {
        loading: false,
        items: [],
        search: null,
        select: null,

      }
    },
    computed:
      {
        street() {
          return this.$store.state.order.properties.ADDRESS_STREET;
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
          this.$emit('change', val.trim());
        }
      }
    },
    methods: {
      querySelections(v) {

        let data = {
          STREET_ID: this.street,
          BUILDING: v,
        };
        this.loading = true;

        axios.post('https://www.zkabel.ru/api/kladrapi/searchBuilding/', data).then(response => {
          if (response.status == '200' && response.data != "") {
            console.log(response.data)
            this.items = response.data.result.ITEMS;
            console.log(this.items);
            this.loading = false;
          }
        }).catch(e => {
          console.log(e)
        });

      }
    },
    mounted: function () {
      this.value = this.property.VALUE;
    },
    created() {
    }
  }
</script>

<style scoped>

</style>
