import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


let $axios = axios.create({
  baseURL: 'https://www.zkabel.ru',
  withCredentials: true
})

Vue.use(Vuex)
const store = () => new Vuex.Store({
  state: {
    catalogTree: {},
    products: [],
    cart: {},
    slugMap: {}

  },
  mutations: {
    saveCatalog: (state, catalog) => {
      state.catalogTree = catalog
    },
    saveSlugMap: (state, map) => {
      state.slugMap = map
    },
    saveProductList: (state, params) => {
      state.catalogTree[params.section].items = params.items;
    },
    saveProducts: (state, items) => {
      for (let id in items) {
        if (state.products.find(
          product => {
            return product.id == id
          }
        ) === undefined) {
          state.products.push(items[id]);
        }
      }
    }
  },
  getters: {
    sectionProducts: state => id => {
      return state.products.filter(product => product.parent === id);
    },
    inCart: state => id => {
      console.log(id);
      return 0;
    }
  },
  actions: {
    loadCatalog: (store, params) => {
      $axios.get('/api/catalog/getCatalogSections/').then(response => {
          if (response.data.result !== undefined) {
            //  console.log(response.data);
            store.commit('saveCatalog',
              response.data.result
            );
          }
        }
      ).catch(e => {
        console.log(e)
      })

    },
    pageFromSlug(store, params) {
      $axios.get('/api/catalog/getSectionId/?slug=' + params).then(response => {
          if (response.data !== undefined) {
            console.log(response.data);
          }
        }
      ).catch(e => {
        console.log(e)
      })
    },
    loadSlugMap(store, params) {
      $axios.get('/api/catalog/getSlugSections/').then(response => {
          store.commit('saveSlugMap',
            response.data.result
          );
        }
      ).catch(e => {
        console.log(e)
      })
    },
    loadProductslist(store, id) {
      $axios.get('/api/catalog/getSectionItems/?id=' + id).then(response => {
          store.commit('saveProductList', {
              items: response.data.result,
              section: id,
            }
          );
          store.dispatch('loadProducts', response.data.result);
        }
      ).catch(e => {
        console.log(e)
      })
    },
    loadProducts(store, id) {
      $axios.post('/api/catalog/getItems/', {
        id: id
      }).then(response => {
          store.commit('saveProducts', response.data.result)
        }
      ).catch(e => {
        console.log(e)
      })
    },
  addToCart(store, params) {
      console.log(params);
    /*$axios.post('/api/catalog/getItems/', {
      id: id
    }).then(response => {
        store.commit('saveProducts', response.data.result)
      }
    ).catch(e => {
      console.log(e)
    })*/
  }

  }

})
export default store
