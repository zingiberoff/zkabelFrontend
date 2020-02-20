<template>
  <v-app>
    <header class="header elevation-2">
      <!--          <menu-button @click="clickTopButton" :state="menuButtonState"></menu-button>-->

      <div class="header__logo">
        <nuxt-link to="/catalog/" data-transition="slidedown"><img
          src="/logos.svg"
          alt=""
          height="20">

        </nuxt-link>
        <div>Кабельная арматура1</div>
      </div>

      <a class="header_phone" href="tel:88002007236">
        <v-icon d
        >
          phone
        </v-icon>
        8(800)200-72-36 </a>
      <div class="icons">
        <nuxt-link to="/cart/" class="icons__icon">
          <v-badge class="custom">
                        <span slot="badge" v-if="cartCountItems">
                          {{cartCountItems}}
                        </span>
            <v-icon
              color="deep-orange"
              class="cart-icon"
            >
              shopping_cart
            </v-icon>
          </v-badge>
        </nuxt-link>
      </div>
    </header>
    <search></search>

    <v-content class="custom">
      <v-container fluid
                   grid-list-md>
        <nuxt/>
      </v-container>
    </v-content>
    <no-ssr>
      <client-only/>
      <cart-progress-bar/>
    </no-ssr>

    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      fixed
      color="#f5f5f5"
    >

      <v-btn
        color="error"
        flat
        :value="$store.state.currentCatalogPage"
        class="pa-1"
        @click="bottomNav=$store.state.currentCatalogPage"
      >
        <span>Каталог</span>
        <v-icon>list</v-icon>
      </v-btn>
      <v-btn
        color="error"
        flat
        value="/contacts/"
        class="pa-1"
      >
        <span>Контакты</span>
        <v-icon>phone_in_talk</v-icon>
      </v-btn>

      <v-btn
        color="error"
        flat
        value="/info/"
        class="pa-1"
        @click="bottomNav='/info/'"
      >
        <span>Инфо</span>
        <v-icon>drag_indicator</v-icon>
      </v-btn>

      <v-btn
        color="error"
        flat
        value="/profile/"
        class="pa-1"
      >
        <span>Профиль1</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-bottom-nav>

  </v-app>
</template>

<script>


  import Search from '../components/Search.vue'
  import ClientOnly from "../components/ClientOnly";
  import CartProgressBar from "../components/CartProgressBar";

  export default {
    components: {ClientOnly, Search, CartProgressBar},
    data: function () {
      return {
        cart: {},
        individualPrice: false,
        menuOpen: false,

      }
    },
    computed: {
      bottomNav: {
        set(val) {
          console.log(val, this.$route.path);
          if (this.$route.path == val) {
            val = '/catalog/'
          }

          this.$router.push(val);
        },
        get() {
          let routerPath = this.$route.path;
          if (routerPath === '/') {
            return '/catalog/';
          }
          if (['/requisites/', '/news/', '/company/',].indexOf(routerPath) !== -1) {
            return '/info/';
          }
          if (/\/news\/.*\//.test(routerPath)) {
            return '/info/';
          }
          if (['/contacts/', '/info/', '/profile/', this.$store.state.currentCatalogPage].indexOf(routerPath) !== -1) {
            return routerPath;
          }

          return '/profile/';
        }

      },
      cartCountItems: function () {
        return this.$store.getters.cartCountItems;
      }
    },


  }
</script>
<style scoped>
  .header {
    background: #fafafa;
    z-index: 10;
    position: fixed;
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 8px 15px 2px;
    align-items: center;
    height: 50px;
    overflow: hidden;
  }

  .header__logo {
    font-size: 10px;
  }

  main.v-content.custom {
    margin-top: 50px;
    height: calc(100vh - 95px);
    position: fixed;
    overflow-y: scroll;
    width: 100%;
  }

  .custom >>> .v-badge__badge {
    font-size: 9px;
    top: -8px;
    right: 4px;
    height: 15px;
    width: 15px;
  }
</style>
