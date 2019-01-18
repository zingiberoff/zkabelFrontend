import Vue from 'vue'
import https from 'https'
import Vuex from 'vuex'
import axios from 'axios'


let $axios = axios.create({
  defaults: {

    headers: {
      'x-requested-with': 'XMLHttpRequest'
    },
    baseURL: 'https://www.zkabel.ru'
  }
})


Vue.use(Vuex)
const store = () => new Vuex.Store({
  state: {
    catalogTree: {},
    cart: {}

  },
  mutations: {
    saveCatalog: (state, catalog) => {
      state.catalogTree = catalog
    }
  },
  getters: {},
  actions: {
    loadCatalog: (store, params) => {
      console.log($axios.defaults)
      $axios.get('/local/templates/zkabel_mobile/catalog.php').then(response => {
          if (response.data !== undefined) {
            //  console.log(response.data);
            store.commit('saveCatalog',
              response.data
            );
          }
        }
      )

    }
  }

})
export default store
