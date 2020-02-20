<template>

  <v-radio-group v-model="radios" :mandatory="false" :rules="[active]">
    <v-radio v-for="type in userTypes"
             :label="type.NAME"
             :value="type.ID"
             :key="'profile_type_'+type.ID"

    >
    </v-radio>
  </v-radio-group>


</template>

<script>
  export default {
    name: "UserType",
    data: function () {
      return {
        radios: 0,

      };
    },
    computed: {
      userTypes(){

        return this.$store.state.orderProperties.userTypes;
      },
      active() {
        return () => {
          return !!this.radios;
        }
      }
    },
    watch: {
      radios: function (val) {
        this.$store.commit('setUserType', val);
          this.$emit('changeUser', this.id);
      }
    },

    mounted: function () {
      this.$store.dispatch('getUserType');
    }
  }
</script>

<style scoped>

</style>
