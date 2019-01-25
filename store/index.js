import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


let $axios = axios.create(
  {
    requestCert: false,
    rejectUnauthorized: false,
    baseURL: 'https://api.m.zkabel.ru',
    withCredentials: true,
  }
);


Vue.use(Vuex)
const store = () => new Vuex.Store({
  state: {
    loading: false,
    userID: '',
    catalogTree: [],
    products: [],
    cart: [],
    currentCatalogPage: '',
    orderProperties: {
      userTypes: [],
      userProfiles: [],
      deliveries: [],
      payments: [],
    },
    order: {
      userType: '',
      userProfiles: [],
      deliveries: [],
      payments: [],
    }
  },
  mutations: {
    loading:(state, status) => {
      state.loading = status
    },
    saveCatalog: (state, catalog) => {
      state.catalogTree = catalog
    },
    currentCatalogPage: (state, page) => {
      state.currentCatalogPage = page;
    },
    saveSlugMap: (state, map) => {
      state.slugMap = map
    },
    saveProducts: (state, items) => {

      for (let id in items) {
        if (state.products.find(product => {
          return product.id == id
        }) === undefined) {
          state.products.push(items[id]);
        }
      }
    },
    saveCart: (state, cartItems) => {
      for (let id in cartItems) {
        if (state.cart.find(cartItem => {
          return cartItem.PRODUCT_ID == id
        }) === undefined) {
          state.cart.push(cartItems[id]);
        }
      }
    },

    saveUserTypes: (state, userTypes) => {
      state.orderProperties.userTypes = userTypes
    },
    saveUserProfiles: (state, userProfiles) => {
      state.orderProperties.userProfiles = userProfiles
    },
    /** /////////// setOrderOptions /////////// */
    setUserType: (state, id) => {
      state.order.userType = id
    }
  },
  getters: {
    catFromSlug: state => slug => {
      return state.catalogTree.find(section => section.url === slug);
    },
    productFromSlug: state => slug => {
      let product = state.products.find(product => product.url === slug);
      return product;
    },
    sectionProducts: state => id => {
      return state.products.filter(product => product.parent === id);
    },
    childSections: state => id => {
      return state.catalogTree.filter(section => section.parent === id);
    },
    section: state => id => {
      return state.catalogTree.find(section => section.id === id);
    },
    product: state => id => {
      return state.products.find(product => product.id == id);
    },
    /** /////////// CART /////////// */
    cartItem: state => id => {
      if (state.cart === undefined) return 0;
      return state.cart.find(cartItem => cartItem.PRODUCT_ID == id)

    },
    cartSumm: state => {

      if (state.cart.length === 0) return 0;
      return state.cart.reduce((summ, cartItem) => summ + cartItem.PRICE * cartItem.QUANTITY)

    },
    inCart: state => id => {
      if (state.cart === undefined) return 0;
      let cartItem = state.cart.find(cartItem => cartItem.PRODUCT_ID == id);
      if (cartItem === undefined) return 0;
      return parseInt(cartItem.QUANTITY)
    },
    cartCountItems: state => {
      return state.cart.length
    }
  },
  actions: {
    loadCatalogAll: (store, slug) => {

      store.commit('currentCatalogPage', slug);

      let promises = [];
      if (store.state.catalogTree.length === 0) {
        promises.push(store.dispatch('loadCatalog'));
        promises.push(store.dispatch('loadProducts', {slug: slug}));
        promises.push(store.dispatch('pageFromSlug', slug));

      } else {
        let cat = store.getters.catFromSlug(slug);
        if (cat !== undefined) {
          if (cat.type == 'productList') {
            let items = cat.items.filter(id => {
              return (store.getters.product(id) === undefined)
            });
            promises.push(store.dispatch('loadProducts', {id: items}))
          }
        } else {
          let product = store.getters.productFromSlug(slug);
          if (product === undefined) {
            promises.push(store.dispatch('pageFromSlug', slug))
          }
        }
      }

      return Promise.all(promises)
    },
    loadCatalog: (store) => {

      return new Promise((resolve, reject) => {
          console.log()
          $axios.get('/api/catalog/getCatalogSections/')
            .then(response => {
                if (response.data.result !== undefined) {
                  store.commit('saveCatalog', response.data.result);
                  resolve();
                }
              }
            ).catch(e => {
            console.log(e)

          })
        }
      )

    },
    pageFromSlug(store, params) {
      return new Promise((resolve, reject) => {
        console.log('pageFromSlug');
        $axios.get('/api/catalog/pageFromSlug/?slug=' + params).then(response => {
            if (response.status == 404) {
              reject();
            }
            if (response.data.result !== undefined) {
              console.log('pageFromSlugComplete');
              resolve(response.data.result)
            }
            reject();

          }
        ).catch(e => {
          console.log(e)
          reject()
        })

      });
    },
    loadProducts(store, params) {
      return new Promise((resolve, reject) => {
        if (params.id !== undefined && params.id.length === 0) {
          resolve();
          return;
        }
        console.log('loadProducts');
        $axios.post('/api/catalog/getItems/', params).then(response => {
            console.log('loadProductsComplete');
            store.commit('saveProducts', response.data.result);
            resolve(response.data.result);
          }
        ).catch(e => {
          console.log(e)
        })
      });
    },
    loadSession: (store, params) => {
      //  if (store.state.catalogTree.length == 0) {
      console.log($axios.defaults.headers);
      console.log('LoadSession');
      $axios.get('/api/basket/getSessionId/')
        .then(response => {
            if (response.data.result !== undefined) {
              localStorage.setItem('php_session', response.data.result);
            }
          }
        ).catch(e => {
        console.log(e)
      })

    },
    loadCart(store, params) {
      $axios.post('/api/basket/getBasketItems/').then(response => {
          store.commit('saveCart', response.data.result.ITEMS)
        }
      ).catch(e => {
        console.log(e)
      })
    },
    addToCart(store, params) {
      $axios.post('/api/basket/addToBasket/', params).then(response => {
          store.commit('saveCart', response.data.result)
          store.dispatch('loadCart')
        }
      ).catch(e => {
        console.log(e)
      })
    },
    /** /////////// LoadOrderOptions /////////// */
    getUserType(store) {
      $axios.get('/api/order/getUserType/')
        .then(response => {
          if (response.status == '200' && response.data != "") {
            store.commit('saveUserTypes', response.data.result);
          }
        })
        .catch(e => {

        })
    },
    getProfiles(store, userType) {
      $axios.get('/api/order/getProfiles/?personType=' + store.state.order.userType)
        .then(response => {
          if (response.status == '200' && response.data != "") {
            store.commit('saveUserProfiles', response.data.result);
          }
        })
        .catch(e => {

        })
    }


  }

})
export default store
