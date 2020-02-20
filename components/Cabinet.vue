<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm8>
      <v-card>
        <v-card-title class="title">Личный кабинет</v-card-title>
        <v-list>
            <nuxt-link :to="item.link" v-for="(item,index) in items">
            <v-list-tile>
              {{item.title}}
            </v-list-tile>
                <v-divider/>
            </nuxt-link>
            <v-list-tile @click="logout()">
                Выход
            </v-list-tile>

        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

  export default {
    name: "Cabinet",
    data() {
      return {
        items: [
          {
              link: '/cart/',
            title: 'Корзина'
          },
          {
              link: '/orders/',
              title: 'Заказы'
          }
        ]
      }
    },
      methods: {
          logout() {
              this.$store.dispatch('logout');

          }
      }

  }
</script>

<style scoped>

</style>
