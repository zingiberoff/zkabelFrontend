<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card>
        <v-carousel
          hide-delimiters
          height="300"
        >
          <v-carousel-item
            contain
            v-for="(item,i) in images"
            :key="'image_'+i"
            :src="item.SRC"
          />
        </v-carousel>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-title>{{product.name}}</v-card-title>
        <v-card-text>
          <div v-if="price" class="item_price">
            {{price}}
          </div>
          <div v-if="price" class="item_buy">
            <edit-cart-count v-if="inCart"
                             :product_id="product.id"
                             :count-in-cart="inCart"
                             @update="refreshCart()" v-bind:step="product.ratio"
            />
            <add-to-cart v-else
                         :product_id="product.id"
                         @update="refreshCart()"
                         :moq="product.moq"
            />
          </div>
        </v-card-text>

      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-title>Характеристики</v-card-title>
        <v-divider></v-divider>


        <v-container fluid class="">
          <v-layout row wrap>
            <v-flex xs6 v-for="item in product.detail.specification" :key="item.id">
              <span class="caption">
              <b>{{item.NAME}}:  </b> <br>

              {{item.DISPLAY_VALUE}}
              </span>

            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-title>Описание</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div v-html="product.detail.description">
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import EditCartCount from './EditCartCount.vue'
  import AddToCart from './AddToCart.vue'

  export default {
    name: "Product",
    props: ['id'],
    components: {EditCartCount, AddToCart},
    computed: {
      product() {
        return this.$store.getters.product(this.id);
      },
      images() {
        return this.product.detail.images;
      },
      price() {
        return this.$store.getters.prices[this.id]
      },
      inCart() {
        return this.$store.getters.inCart[this.id];
      }
    },
    created() {
      this.$store.dispatch('loadDetailProduct', this.id)
    }
  }
</script>

<style scoped>
  .v-carousel >>> i.v-icon {
    color: #FF8A66 !important;
  }

  .align-end {
    align-items: flex-end !important;
  }
</style>
