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
                <br>
                <a href="https://api.whatsapp.com/send?phone=+79137808939">
                    <svg aria-hidden="true" class="svg-inline--fa fa-whatsapp fa-w-14 fa-2x" data-icon="whatsapp"
                         data-prefix="fab" focusable="false"
                         heigth="20px" role="img" viewBox="0 0 448 512" width="20px"
                         xmlns="http://www.w3.org/2000/svg">
                        <path class=""
                              d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                              fill="#00C350"></path>
                    </svg>
                </a>
            </div>
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
          // "
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

          }, {
                img: '/images/img/e_schvareeva.jpg',
                name: "Елена Шварёва",
                contacts: {
                    email: '72@7899.ru'
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
