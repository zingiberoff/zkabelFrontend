<template>
  <v-list>
      <template v-for="(item, index) in links">
          <nuxt-link
                  :to="item.link"
                  v-if="/\/$/.test(item.link)">
              <v-list-tile>
                  <v-icon>{{item.icon}}</v-icon>
                  <v-list-tile-content class="pl-2">
                      {{item.title}}
                  </v-list-tile-content>
              </v-list-tile>
          </nuxt-link>
          <a :href="item.link" v-else>
              <v-list-tile>
                  <v-icon>{{item.icon}}</v-icon>
                  <v-list-tile-content class="pl-2">
                      {{item.title}}
                  </v-list-tile-content>
              </v-list-tile>
          </a>

      </template>
  </v-list>
</template>

<script>
  export default {
    name: "info",
    data() {
      return {
        links: [
          {
              icon: 'business',
              link: '/company/',
              title: 'О компании'
          },
            {
                icon: 'import_contacts',
                link: '/news/',
                title: 'Новости'
            },

            {
                icon: 'local_shipping',
                link: '/delivery/',
                title: 'Доставка'
            },
            {
                icon: 'credit_card',
                link: '/payment/',
                title: 'Оплата'
            },

          {
            icon: 'assignment',
            link: '/requisites/',
            title: 'Реквизиты'
          },
          {

              icon: 'security',
              link: '/upload/privacy-policy.pdf',
              title: 'Политика конфиденциальности'
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
