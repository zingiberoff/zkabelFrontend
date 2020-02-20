<template>
    <v-layout row wrap>
        <v-flex md4 sm5 xs12>
            <v-card>
                <v-carousel
                        :cycle="false"
                        height="250"
                        hide-delimiters
                >
                    <v-carousel-item
                            :key="'image_'+i"
                            :src="item.SRC"
                            contain
                            v-for="(item,i) in images"
                    />
                </v-carousel>
            </v-card>
        </v-flex>
        <v-flex md8 sm7 xs12>
            <v-card height="100%">
                <v-card-title>{{product.name}}</v-card-title>
                <v-card-text>
                    <div class="article">
                        арт.: {{product.article}}
                    </div>
                    <div class="item_main">
                        <div class="avability">
                            Наличие:
                            <div :key="index" v-for="(item,index) in avability">
                                <b>{{ item.NAME }}:</b> {{item.QUANTITY}}
                            </div>
                        </div>
                        <div>
                            <div class="item_price" v-if="price">
                                {{price}}
                            </div>
                            <div class="item_buy" v-if="price">
                                <edit-cart-count :count-in-cart="inCart"
                                                 :product_id="product.id"
                                                 @update="refreshCart()"
                                                 v-bind:step="product.ratio" v-if="inCart"
                                />
                                <add-to-cart :moq="product.moq"
                                             :product_id="product.id"
                                             @click="reachGoal('m-kupit-tovar')"
                                             @update="refreshCart()"
                                             v-else
                                />
                            </div>
                        </div>
                    </div>

                </v-card-text>

            </v-card>
        </v-flex>
        <v-flex xs12>
            <v-card>
                <v-card-title>Характеристики</v-card-title>
                <v-divider></v-divider>


                <v-container fluid>
                    <v-layout row wrap>
                        <v-flex :key="item.id" lg3 sm4 v-for="item in product.detail.specification" xs6>
              <span class="caption">
              <b>{{item.NAME}}:  </b> <br>

              {{item.DISPLAY_VALUE}}
              </span>

                        </v-flex>
                    </v-layout>
                </v-container>
                <v-container fluid>
                    <v-layout row wrap>
                        <v-flex :key="doc.ID" sm6 v-for="doc in docs" xs12>
                            <doc-icon

                                    :link="doc.SRC"
                                    :name="doc.FORMATTED_ORIGINAL_NAME"
                                    :size="doc.SIZE_FORMATTED"
                                    :type="doc.EXTENSION"
                            />
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
    import DocIcon from './DocIcon.vue'

    export default {
        name: "Product",
        props: ['id'],
        components: {EditCartCount, AddToCart, DocIcon},
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
            },
            docs() {
                return this.product.detail.files;
            },
            avability() {
                return this.product.stores.STORES_SORTED_BY_CITY;
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

    .item_main {
        display: flex;
        justify-content: space-between;
    }

    .avability {
        font-size: 12px;
    }

    .item_price {
        text-align: right;
        font-size: 20px;
        font-weight: 600;
    }
</style>
