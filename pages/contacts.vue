<template>

  <v-layout row wrap>

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
          <v-flex xs5 class="py-0">
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
    <v-flex xs12>
      <v-card>
        <v-card-title class="card-orange">
          <h2>Москва</h2>
          <p><a href="geo:55.7350,38.0132">
            143986, Московская область, г.Балашиха, Железнодорожный м-н, ул.Автозаводская, 24 стр.1
          </a></p>
          <p>Тел. <a href="tel:+74956625649">+7 (495) 662-56-49</a>
          </p>
        </v-card-title>
        <yandex-map
          :coords="[55.7350 , 38.0132]"
          zoom="13"
          :controls="['fullscreenControl','trafficControl']"
          style="width: 100%; height: 60vh;"
          :placemarks="placemarks"
          map-type="map"
        >

          <ymap-marker
            marker-id="1"
            marker-type="placemark"
            :coords="[55.7350, 38.0132]"
            hint-content="143986, Московская область, г.Балашиха, Железнодорожный м-н, ул.Автозаводская, 24 стр.1"

          ></ymap-marker>


        </yandex-map>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-title class="card-orange">
          <h2>Новосибирск</h2>
          <p><a href="geo:54.95865,82.95035">630033, г.Новосибирск, ул.Тюменская, 4
            Для корреспонденции: 630501, г.Новосибирск, р.п.Краснообск, а/я 86
          </a></p>
          <p>Тел. <a href="tel: 88002007236">8 (800) 200-72-36</a></p>
        </v-card-title>
        <yandex-map
          :coords="[54.9650 , 82.935]"
          zoom="13"
          :controls="['fullscreenControl','trafficControl']"
          style="width: 100%; height: 60vh;"
          :placemarks="placemarks"
          map-type="map"
        >

          <ymap-marker
            marker-id="1"
            marker-type="placemark"
            :coords="[54.95865, 82.95035]"
            hint-content="630033, г.Новосибирск, ул.Тюменская, 4"

          ></ymap-marker>


        </yandex-map>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
  export default {
    name: "Contacts",
    data: function () {
      return {
        placemarks: [
          {
            coords: [54.8, 39.8],
            properties: {}, // define properties here
            options: {}, // define options here
            clusterName: "1",
            balloonTemplate: '<div>"Your custom template"</div>',
            callbacks: {
              click: function () {
              }
            }
          }
        ],
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
    },
    methods: {
      initHandler: (e) => {
        console.log(e)
      }
    }
  }
</script>

<style scoped>
  .card-orange {
    padding: 0;
  }

  .card-orange h2 {
    display: block;
    text-align: center;
    color: white;
    background-color: #d45615;
    width: 100%;
  }

  .card-orange p {
    padding: 0 10px;
    margin-bottom: 5px;
  }
</style>
