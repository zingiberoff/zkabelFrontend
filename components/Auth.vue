<template>
  <v-form v-model="formValid" name="register">
    <v-container>
      <v-layout row wrap>

        <v-flex xs12>
          <v-text-field
            label="Логин"
            v-model="login"
            :rules="[value => !!value || 'Обязательное поле']"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="Пароль"
            type="password"
            :rules="[value => !!value || 'Обязательное поле']"
            v-model="password"

          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-btn v-if="formValid"
                 color="success"
                 @click="Login"
                 block>
            Войти
          </v-btn>
        </v-flex>
          <nuxt-link to="/register/">Регистрация</nuxt-link>
      </v-layout>
    </v-container>

  </v-form>
</template>

<script>
  export default {
    name: "Auth",
    data: function () {
      return {
        formValid: false,
        login: '',
        password: ''
      }
    },
    methods: {
      Login: function () {
          console.log(1);
        this.$store.dispatch('auth', {login: this.login, pass: this.password});

      }
    }
  }
</script>

<style scoped>

</style>
