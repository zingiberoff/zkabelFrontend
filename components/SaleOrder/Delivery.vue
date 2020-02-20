<template>
  <v-layout v-if="show"
            row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Доставка</h3>
          </div>
        </v-card-title>
          <v-container fluid
                       grid-list-sm>
              <v-layout row wrap>
                  <v-radio-group :rules="[active]" req v-model="value">

                      <template v-for="item in items">


                <v-flex xs12 md6>
                  <v-card @click="value=item.id">
                    <v-card-title>
                      <div class="delivery">
                        <v-radio
                          :key="'delivery'+item.id"
                          :value="item.id"
                          :label="item.name"
                        ></v-radio>


                        <div class="small">{{item.description}}</div>
                        <br>
                        <div class="price">{{item.price}}</div>
                        <div class="period" v-if="item.period">{{item.period}}</div>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </template>
                  </v-radio-group>
              </v-layout>

          </v-container>


      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Delivery",
    data: function () {
      return {
        items: [],
        value: '',
      }
    },
    computed: {
        personType() {
        return this.$store.state.order.userType;
      },
      location() {
        return this.$store.state.order.properties.LOCATION;
      },
      active() {
        return () => {
          if (this.value > 0) {
            return true
          } else {
            return 'Выберите способ доставки'
          }
        }
      },
      show() {
        return this.location && this.items;
      }
    },
    watch: {
      location() {
        this.update();
      },
      value(val) {
          return this.$store.commit('saveDelivery', val);
      }
    },
    methods: {
      update() {
        this.items = [];
        axios.post('https://www.zkabel.ru/api/order/getDelivery/', {
          LOCATION: this.location,
          personType: this.personType
        },)
          .then(response => {
            if (response.status == '200' && response.data != "") {
              this.items = response.data.result;
            }
          }).catch(e => {
            console.log(e)
        })
      }
    },
    mounted() {
        axios.defaults.headers['Authorization-Token'] = this.$store.state.user.userToken;
      this.update();
    }
  }
</script>

<style scoped>
  .delivery {
    margin-bottom: 30px;
  }

  .price, .period {
    position: absolute;
    bottom: 0;
    background: #e3e3e3;
    border-radius: 3px;
    padding: 3px 10px;
  }

  .price {
    right: 0;
  }

  .period {
    left: 0;
  }

</style>
