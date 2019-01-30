<template>

  <v-layout row wrap>

    <v-flex xs12 v-for="group in orderProperties" :key="'group_'+group.ID">

      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{group.NAME}}</h3>
          </div>
        </v-card-title>
        <v-container fluid
                     grid-list-lg>
          <v-layout row wrap>
            <props v-for="prop in group.PROPS"
                   :key="'prop-'+prop.ID"
                   :property="prop"
                   @change="updateProperty(prop,$event)"
            ></props>

          </v-layout>
        </v-container>
      </v-card>

    </v-flex>
  </v-layout>

</template>

<script>
  import Props from './Props.vue'

  export default {
    name: "OrderProperties",
    props: ['personType', 'profileID'],
    components: {Props},
    data: function () {
      return {};
    },
    computed: {
      orderProperties() {
        return this.$store.state.orderProperties.orderProperties;
      }
    },
    methods: {
      updateProperty: function (prop, value) {
        this.$store.commit('setOrderProperty',{code:prop.CODE, value:value})
      },
      update() {
        this.$store.dispatch('getOrderProperties')
      }
    },
    watch: {
      personType() {
        this.update();
      },
      profileID() {
        this.update();
      }

    },
    created() {
      this.update();
    }

  }
</script>

<style scoped>
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  .list-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
</style>
