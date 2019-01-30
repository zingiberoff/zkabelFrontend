<template>
  <v-autocomplete
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    v-model="select"
    item-text="DISPLAY"
    item-value="VALUE"
    cache-items
    hide-no-data
    hide-details
    :label="property.NAME"
  ></v-autocomplete>


</template>

<script>
  import axios from 'axios';

  export default {
    name: "InputLocation",
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
    watch: {
      search(val) {
        val && val !== this.select && this.querySelections(val)
      },
      select: function (val, old) {
        if (old == undefined) {
          old = ''
        }
        if (val != null && val.trim() !== old.trim()) {
          this.$store.commit('setOrderProperty', {code: 'LOCATION', value: val.trim()});
        }

      }
    },
    methods: {
      querySelections(v) {

        const formData = new FormData();
        formData.append('select[1]', 'CODE');
        formData.append('select[2]', 'TYPE_ID');
        formData.append('select[VALUE]', 'ID');
        formData.append('select[DISPLAY]', 'NAME.NAME');
        formData.append('additionals[1]', 'PATH');
        formData.append('filter[=PHRASE]]', v);
        formData.append('filter[=NAME.LANGUAGE_ID]]', 'ru');
        formData.append('filter[=SITE_ID]]', 's1');
        formData.append('version', '2');
        formData.append('PAGE_SIZE', '10');
        formData.append('PAGE', '0');
        this.loading = true;
        axios.post('https://www.zkabel.ru/api/kladr/location/', formData, {}).then(response => {
          if (response.status == '200' && response.data != "") {
            let data = response.data.result.data;
            if (data && data.ETC) {
              let pathItems = data.ETC.PATH_ITEMS;
              for (let key in data.ITEMS) {
                let item = data.ITEMS[key];
                for (let pathKey in item.PATH) {
                  let id = item.PATH[pathKey];
                  item.DISPLAY += ', ' + pathItems[id].DISPLAY;
                }
                data.ITEMS[key] = item;
              }
            }
            this.items = data.ITEMS;
            this.loading = false;
          }
        });

        this.select = this.property.VALUE;

      }
    },
    mounted: function () {

      const formData = new FormData();
      formData.append('select[1]', 'CODE');
      formData.append('select[2]', 'TYPE_ID');
      formData.append('select[VALUE]', 'ID');
      formData.append('select[DISPLAY]', 'NAME.NAME');
      formData.append('additionals[1]', 'PATH');
      formData.append('filter[=ID]]', this.property.VALUE);
      formData.append('filter[=NAME.LANGUAGE_ID]]', 'ru');
      formData.append('filter[=SITE_ID]]', 's1');
      formData.append('version', '2');
      formData.append('PAGE_SIZE', '1');
      formData.append('PAGE', '0');
      this.loading = true;
      axios.post('https://www.zkabel.ru/api/kladr/location/', formData, {}).then(response => {
        if (response.status == '200' && response.data != "") {
          let data = response.data.result.data;
          if (data && data.ETC) {
            let pathItems = data.ETC.PATH_ITEMS;
            for (let key in data.ITEMS) {
              let item = data.ITEMS[key];
              for (let pathKey in item.PATH) {
                let id = item.PATH[pathKey];
                item.DISPLAY += ', ' + pathItems[id].DISPLAY;
              }
              data.ITEMS[key] = item;
            }
          }
          this.items = data.ITEMS;
          this.loading = false;
        }
      }).catch(e=>{console.log(e)});

      this.select = this.property.VALUE;

    }
  }
</script>

<style scoped>

</style>
