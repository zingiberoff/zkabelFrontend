<template>
  <v-select
    v-model="profile"
    :items="userProfiles"
    label="Выберите профиль"
    item-text="NAME"
    item-value="ID"
  ></v-select>


</template>

<script>
  export default {
    name: "UserProfile",
    data: function () {
      return {
        profile: 0,
      };
    },
    computed: {
      userProfiles() {
        return this.$store.state.orderProperties.userProfiles
      }
    },
    watch: {
      profile: function (val) {
        this.$store.commit('setProfile',val)
      },
    },
    methods: {},
    created() {
      this.$store.dispatch('getProfiles', this.personType);
    },
      destroyed() {
          this.$store.commit('setProfile', null)
      }
  }
</script>

<style scoped>

</style>
