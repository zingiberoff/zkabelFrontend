<template>
    <v-container grid-list-lg>
        <v-flex xs12>
            <a href="/catalog/">
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Корзина пуста</h3>
                        </div>
                        <div class="bx-soa-empty-cart-desc">Нажмите здесь, чтобы продолжить покупки или перенесите
                            товары из отложенного в заказ
                        </div>
                    </v-card-title>
                </v-card>
            </a>
        </v-flex>
    </v-container>
</template>

<script>
    export default {
        name: "EmptyCart"
    }
</script>

<style scoped>
    a:hover{
        text-decoration: none;
    }
</style>