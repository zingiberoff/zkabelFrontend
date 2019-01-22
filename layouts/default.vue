<template>
  <v-app>
    <header class="header">
      <!--          <menu-button @click="clickTopButton" :state="menuButtonState"></menu-button>-->

      <div class="header__logo">
        <a href="/" data-transition="slidedown"><img
          src="/local/templates/zkabel_mobile/assets/images/logos.svg"
          alt=""
          height="20">

        </a>
        <div>Кабельная арматура</div>
      </div>

      <a class="header_phone" href="tel:88002007236">
        <v-icon d
        >
          phone
        </v-icon>
        8(800)200-72-36 </a>
      <div class="icons">
        <a href="/personal/cart/" class="icons__icon">
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
        </a>

      </div>
    </header>

    <v-content>
      <v-container>
          <nuxt/>
      </v-container>
    </v-content>

    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      fixed
      color="#f5f5f5"
    >
      <v-btn
        color="accent"
        flat
        value="/"
      >
        <span>Домой</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn
        color="accent"
        flat
        value="/catalog/"
      >
        <span>Каталог</span>
        <v-icon>list</v-icon>
      </v-btn>
      <v-btn
        color="accent"
        flat
        value="/contacts/"
      >
        <span>Контакты</span>
        <v-icon>phone_in_talk</v-icon>
      </v-btn>

      <v-btn
        color="accent"
        flat
        value="/info/"
      >
        <span>Инфо</span>
        <v-icon>drag_indicator</v-icon>
      </v-btn>

      <v-btn
        color="accent"
        flat
        value="profile"
      >
        <span>Профиль</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
  var FormData = require('form-data');
  export default {

    data: function () {
      return {
        cart: {},
        individualPrice: false,
        menuOpen: false,
        bottomNav: '/'
      }
    },
    watch: {
      bottomNav(val) {
        this.$router.push(val);
      }
    },
    computed: {
      catalogActive: function () {
        return this.bottomNav == 'catalog';
      },
      cartCountItems: function () {
        let i = 0;
        for (let item in this.cart) {
          i++;
        }
        return i;
      },
      menuButtonState: function () {

        if (this.menuOpen) {
          return 'close';
        }
        if (this.catalogActive) {
          return 'back';
        }
        return 'burger';
      },
      cartSum: function () {
        let sum = 0;
        for (let item in this.cart) {
          sum += this.cart[item].QUANTITY * this.cart[item].PRICE;
        }
        return sum.toFixed(2);
      },
      cartSumByBasePrice: function () {
        let sum = 0;
        let coef = 1;
        for (let item in this.cart) {
          if (this.cart[item].PRICE_TYPE_ID == 3) coef = 0.85;
          if (this.cart[item].PRICE_TYPE_ID == 5) coef = 1.15;
          sum += this.cart[item].QUANTITY * this.cart[item].BASE_PRICE / coef;
        }
        return sum.toFixed(2);
      },
      cartWeight: function () {
        let weight = 0;
        for (let item in this.cart) {
          weight += this.cart[item].QUANTITY * this.cart[item].WEIGHT;
        }
        return weight.toFixed(2);
      }

    },
    methods: {
      catalogActivate() {
        this.menuOpen = false;
        this.catalogActive = true;
      },
      clickTopButton() {
        if (this.menuOpen) {
          this.menuOpen = false;
          return;
        }
        if (this.catalogActive) {
          this.bus.$emit('catalogBackClick');
          this.catalogActive = false;
          return;
        }
        this.menuOpen = true;
      },
      refreshCart: function () {
        /**todo:to store
         /* const formData = new FormData();ca
         formData.append('ACTION', 'getBasketItems');
         this.$axios.post('https://www.zkabel.ru/ajax/global_listener.php', formData,
         {
           headers: {
             'x-requested-with': 'XMLHttpRequest'
           }
         })
         .then(response => {
            this.cart = {};
            if (response.status == '200' && response.data != "") {
              for (let item in response.data.ITEMS) {
                this.$set(this.cart, item, response.data.ITEMS[item]);
              }
            }
          })
         .catch(e => {
            console.log(e);
          })*/
      },
      inCart: function (id) {
        if (this.cart[id] !== undefined && this.cart[id].QUANTITY != undefined) {
          return parseInt(this.cart[id].QUANTITY);
        }
        return 0;
      }

    },
    created: function () {
      this.$store.dispatch('loadCatalog');
      this.$store.dispatch('loadSlugMap');
    }
  }
</script>
