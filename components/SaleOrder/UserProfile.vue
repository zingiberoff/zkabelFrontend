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
        this.$emit('change', val)
      },
      personType: function () {
        this.$store.dispatch('getProfiles', this.personType);
      }
    },
    methods: {},
    created() {
      this.$store.dispatch('getProfiles', this.personType);
    }
  }
</script>

<style scoped>

</style>
