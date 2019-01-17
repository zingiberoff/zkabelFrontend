<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <router-link to="/">Главная</router-link>
      <v-flex xs12>

        <v-card>
          <v-layout row wrap>
            <v-flex xs12 sm8>

              <div class="pa-3">
                <h3 class="headline mb-0">
                  {{contacts.worktime}}
                </h3>
                <a :href="contacts.telHref">

                  <h3 class="headline mb-0">
                    {{contacts.tel}}
                  </h3>
                </a>

                <a :href="contacts.emailHref">
                  {{contacts.email}}
                </a>
              </div>
            </v-flex>

            <v-flex xs12 sm4>
              <v-icon>vk</v-icon>
            </v-flex>


          </v-layout>
          <v-divider></v-divider>
        </v-card>

      </v-flex>
      <v-flex xs12 sm6 v-for="manager in managers" :key="manager.name">

        <v-card
        >
          <v-layout class="py-0">
            <v-flex xs5>
              <v-img
                :src="manager.img"

                width="100%"
              ></v-img>
            </v-flex>
            <v-flex xs7>
              <div>
                <div class="headline">
                  {{manager.name}}
                </div>

              </div>

              <span v-for="(contact, name) in manager.contacts">
                                {{name}}: {{contact}}<br>
                                </span>

            </v-flex>
          </v-layout>
          <v-divider light></v-divider>

        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Contacts",
    data: function () {
      return {
        contacts: {
          tel: "8-(800)200-72-36",
          telHref: "tel:88002007236",
          email: "manager@zkabel.ru",
          emailHref: "mailto:manager@zkabel.ru",
          worktime: "c 08:20 до 21:20 (НСК)"
        },
        managers: [
          {
            img: '/upload/img/irina.jpg',
            name: "Ирина Марова",
            contacts: {
              email: 'irina@zkabel.ru'
            }

          },
          {
            img: '/images/img/mariya.jpg',
            name: "Мария Андронова",
            contacts: {
              email: 'maryia@zkabel.ru',
              skype: '41@7899.ru'
            }

          }
        ],
        filials: []
      }
    }
  }
</script>

<style scoped>

</style>
