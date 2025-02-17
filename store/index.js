import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let $axios = axios.create(
    {
        requestCert: false,
        rejectUnauthorized: false,
        baseURL: 'https://www.zkabel.ru',
        withCredentials: true,
        headers: {'Authorization-Token': false}
    }
);


Vue.use(Vuex);
const store = () => new Vuex.Store({
    state: {
        loading: false,
        user: {
            userToken: false,
            discounts: {}

        },

        catalogTree: [],
        products: [],
        cart: [],
        currentCatalogPage: '/catalog/',
        orderProperties: {
            userTypes: [],
            userProfiles: [],
            orderProperties: [],
            deliveries: [],
            payments: [],
        },
        order: {
            userType: '',
            userProfile: '',
            properties: {
                LOCATION: '',
                ADDRESS_STREET: ''
            },
            delivery_id: '',
            payment_id: '',
        },
        searchResult: {ITEMS: {}},
        news: []
    },
    mutations: {
        loading: (state, status) => {
            state.loading = status
        },
        saveDiscounts: (state, val) => {
            state.user.discounts = val;
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
                let index = state.products.findIndex(product => product.id == id)
                if (~index) {
                    state.products[index] = items[id];
                } else {
                    state.products.push(items[id]);

                }
            }
        },

        saveAuth: (state, token) => {
            state.user.userToken = token
        },
        saveCart: (state, cartItems) => {
            let NewCart = [];
            for (let id in cartItems) {
                NewCart.push(cartItems[id]);

            }
            state.cart = NewCart;
        },
        saveCartItem: (state, cartItems) => {
            let i = state.cart.findIndex(cartItem => cartItem.PRODUCT_ID == cartItems.PRODUCT_ID);
            if (~i) {
                state.cart[i].QUANTITY = cartItems.RESULT_QUANTITY;
            }
        },
        saveUserTypes: (state, userTypes) => {
            state.orderProperties.userTypes = userTypes
        },
        saveUserProfiles: (state, userProfiles) => {
            state.orderProperties.userProfiles = userProfiles
        },
        loadOrderProperties: (state, props) => {
            state.orderProperties.orderProperties = props
        },
        /** /////////// setOrderOptions /////////// */
        setUserType: (state, id) => {
            state.order.userType = id
        },
        setProfile: (state, id) => {
            state.order.userProfile = id
        },
        setOrderProperty: (state, prop) => {
            state.order.properties[prop.code] = prop.value;
        },
        saveProductDetail: (state, params) => {
            let i = state.products.findIndex(product => product.id == params.id);
            if (~i) {
                state.products[i].detail = params.product;
            }
        },
        saveDelivery: (state, delivery_id) => {
            state.order.delivery_id = delivery_id;
        },
        savePayment: (state, payment_id) => {
            state.order.payment_id = payment_id;
        },
        resetOrder: state => {
            state.order = {
                userType: '',
                userProfile: '',
                properties: {
                    LOCATION: '',
                    ADDRESS_STREET: ''
                },
                delivery_id: '',
                payment_id: '',
            }
        },
        saveSearchResult: (state, ids) => {
            state.searchResult = ids;
        },


        saveNews: (state, news) => {
            state.news = news;
        }


    },
    getters: {
        catFromSlug: state => slug => {
            return state.catalogTree.find(section => section.url === slug);
        },
        productFromSlug: state => slug => {
            return state.products.find(product => product.url === slug);
        },
        sectionProducts: state => id => {
            return state.products.filter(product => product.parent === id);
        },
        childSections: state => id => {
            return state.catalogTree.filter(section => section.parent === id);
        },
        parentSections: state => id => {

            let current = state.catalogTree.find(section => section.id == id);
            let parent = state.catalogTree.find(section => section.id == current.parent);
            return parent
        },
        section: state => id => {
            return state.catalogTree.find(section => section.id === id);
        },
        product: state => id => {
            return state.products.find(product => product.id == id);
        },
        productsList: state => {
            return state.products.map(product => product.id);
        },
        /** /////////// CART /////////// */
        cartItem: state => id => {
            if (state.cart === undefined) return 0;
            return state.cart.find(cartItem => cartItem.PRODUCT_ID == id)

        },
        cartSumm: state => {
            if (state.cart.length === 0) return 0;
            return state.cart.reduce((summ, cartItem) => {
                    return parseFloat(summ) + parseFloat(cartItem.PRICE) * parseInt(cartItem.QUANTITY)
                }, 0
            )

        },
        cartSummBase: state => {
            if (state.cart.length === 0) return 0;
            return state.cart.reduce((summ, cartItem) => {
                    return parseFloat(summ) + parseFloat(cartItem.BASE_PRICE) * parseInt(cartItem.QUANTITY)
                }, 0
            )

        },
        location: state => {
            return state.order.properties.LOCATION;
        },

        inCart: state => {
            let cartCount = {};
            if (state.cart === undefined) return cartCount;
            state.cart.forEach(function (cartItem) {
                cartCount[cartItem.PRODUCT_ID] = parseInt(cartItem.QUANTITY)
            });
            return cartCount;
        },
        prices: (state, getters) => {
            let prices = {};
            let priceCode = '5';
            if (getters.cartSumm >= 5000) {
                priceCode = '6'
            }
            if (state.user.discounts.base_price_type !== undefined) {
                priceCode = state.user.discounts.base_price_type;
            }
            state.products.forEach(function (product) {
                if (product.prices[priceCode] !== undefined) {
                    prices[product.id] = product.prices[priceCode].DISCOUNT_VALUE.toFixed(2) + ' ₽'
                } else {
                    prices[product.id] = null
                }

            });
            return prices;
        },

        cartCountItems: state => {
            return state.cart.length
        },
        newsFromSlug: state => slug => state.news.find(news => news.url === slug),
    },
    actions: {
        loadDiscounts: (store, slug) => {
            return new Promise((resolve, reject) => {
                    $axios.get('/api/profile/getGroupsDiscount/')
                        .then(response => {
                                if (response.data.result !== undefined) {
                                    console.log(response.data.result);
                                    if (response.data.result.base_price_type !== undefined && response.data.result.base_price_type == 7) {
                                        store.dispatch('loadProducts', {id: store.getters.productsList}).then(() => {
                                                store.commit('saveDiscounts', response.data.result);
                                                resolve();
                                            }
                                        ).catch(reject())
                                    } else {
                                        store.commit('saveDiscounts', response.data.result);
                                        resolve();
                                    }

                                }
                            }
                        ).catch(e => {
                        console.log(e)

                    })
                }
            )

        },
        loadCatalogAll: (store, slug) => {

            store.commit('currentCatalogPage', slug);

            let promises = [];
            if (store.state.catalogTree.length === 0) {
                promises.push(store.dispatch('loadCatalog'));
                promises.push(store.dispatch('loadProducts', {slug: slug}));

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
        loadProducts(store, params) {
            return new Promise((resolve, reject) => {
                if (params.id !== undefined && params.id.length === 0) {
                    resolve();
                    return;
                }
                $axios.post('/api/catalog/getItems/', params).then(response => {
                        store.commit('saveProducts', response.data.result);
                        resolve();
                    }
                ).catch(e => {
                    console.log(e);
                    resolve();
                })
            });
        },
        loadDetailProduct: (store, id) => {
            return new Promise((resolve, reject) => {

                $axios.post('/api/catalog/getItemDetail/', {id: id}).then(response => {
                        store.commit('saveProductDetail', {id: id, product: response.data.result});
                        resolve();
                    }
                ).catch(e => {
                    console.log(e)
                    resolve();
                })
            });
        },
        loadSession: (store, params) => {
            return new Promise((resolve, reject) => {
                $axios.get('/api/profile/getSessionId/')
                    .then(response => {
                            if (response.data.result !== undefined) {
                                const token = response.data.result;
                                if (token !== null) {
                                    console.log(token);
                                    store.commit('saveAuth', token);
                                    $axios.defaults.headers['Authorization-Token'] = token;
                                } else {
                                    store.commit('saveAuth', false);
                                    $axios.defaults.headers['Authorization-Token'] = false;
                                }
                            }
                            resolve();
                        }
                    ).catch(e => {
                    reject(e);
                    console.log(e)
                })
            })

        },
        loadCart(store) {
            return new Promise((resolve, reject) => {
                $axios.post('/api/basket/getBasketItems/').then(response => {
                        store.commit('saveCart', response.data.result.ITEMS);

                        resolve();
                    }
                ).catch(e => {
                    console.log(e)
                    reject();
                })
            });
        },
        addToCart(store, params) {
            return new Promise((resolve, reject) => {
                $axios.post('/api/basket/addToBasket/', params).then(response => {
                        store.commit('saveCartItem', response.data.result);
                        store.dispatch('loadCart').then(() => {
                            resolve()
                        });
                    }
                ).catch(e => {
                    console.log(e)
                    reject();
                });
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
        },
        getOrderProperties(store) {
            let userType = store.state.order.userType;
            let userProfile = store.state.order.userProfile;
            $axios.get('/api/order/getProps/?personType=' + userType + '&profileID=' + userProfile)
                .then(response => {
                    if (response.status == '200' && response.data != "") {
                        store.commit('loadOrderProperties', response.data.result)

                    }
                })
                .catch(e => {
                })
        },
        register(store, params) {
            return new Promise((resolve, reject) => {
                $axios.post('/api/profile/register/', params)
                    .then(response => {
                        if (response.status == '200' && response.data != "") {
                            resolve(response.data);
                        }
                    })
            });
        },
        logout(store, params) {
            $axios.post('/api/profile/logout/');
            store.commit('saveAuth', false);
            $axios.defaults.headers['Authorization-Token'] = ''
        },
        auth(store, params) {
            $axios.post('/api/profile/auth/', params)
                .then(resp => {

                    if (resp.status === 200) {
                        if (resp.data.result.STATUS === true) {
                            const token = resp.data.result.token;
                            if (token !== null) {
                                console.log(token)
                                store.commit('saveAuth', token)
                                $axios.defaults.headers['Authorization-Token'] = token
                            }
                        }
                    }
                })
                .catch(err => {
                    localStorage.removeItem('user-token');
                    $axios.defaults.headers['Authorization-Token'] = false;
                })
        },
        saveOrder(store, params) {
            return new Promise((resolve, reject) => {
                $axios.post('/api/order/saveOrder/', params)
                    .then(response => {
                        if (response.status == '200' && response.data != "") {
                            if (response.data.result.ORDER.ID > 0) {
                                resolve(response.data.result)
                            } else {
                                reject({error: 'неверный ответ сервера'})
                            }

                        }
                    }).catch(e => {
                    reject(e)
                })
            });
        },
        fastOrder(store, params) {
            return new Promise((resolve, reject) => {
                $axios.post('/api/order/fastOrder/', params)
                    .then(response => {
                        if (response.status == '200' && response.data != "") {
                            if (response.data.result != undefined) {
                                resolve(response.data.result)
                            } else {
                                reject({error: 'неверный ответ сервера'})
                            }

                        }
                    }).catch(e => {
                    reject(e)
                })
            });
        },
        search(store, params) {
            return new Promise((resolve, reject) => {
                $axios.post('/api/search/query/', params)
                    .then(response => {
                        if (response.status == '200' && response.data != "") {
                            if (response.data.result != undefined) {
                                console.log(Object.keys(response.data.result.ITEMS));
                                store.commit('saveSearchResult', response.data.result);

                                store.dispatch('loadProducts',
                                    {id: Object.keys(response.data.result.ITEMS)}
                                ).then(() => {
                                        console.log(1);
                                        resolve(response.data.result)
                                    }
                                ).catch(() => {
                                        console.log(1);
                                        reject();
                                    }
                                )
                            } else {
                                reject({error: 'неверный ответ сервера'})
                            }

                        }
                    }).catch(e => {
                    reject(e)
                })
            });
        },
        loadNews(store, params) {
            return new Promise((resolve, reject) => {
                $axios.post('/api/news/get/', params)
                    .then(response => {
                        if (response.status == '200' && response.data != "") {
                            if (response.data.result != undefined) {
                                store.commit('saveNews', response.data.result);
                                resolve(response.data.result)
                            } else {
                                reject({error: 'неверный ответ сервера'})
                            }

                        }
                    }).catch(e => {
                    reject(e)
                })
            });
        },
        name(store, params) {
            return new Promise((resolve, reject) => {
                $axios.post('', params)
                    .then(response => {
                        reject();
                    }).catch(e => {
                    reject(e)
                })
            });
        },
    },

})
export default store
