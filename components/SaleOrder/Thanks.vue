<template>
  <v-flex xs12>

    <v-card pa-3>
      <v-card-title>
        <h2>
          Благодарим за заказ.</h2>
        <h3> Номер заказа: {{response.ORDER.ID}}</h3>
      </v-card-title>
      <v-card-text>
        <p>Перед получением обязательно дождитесь сообщения менеджера о готовности заказа и дате самовывоза.</p>
        <p>Заказ выдается только при наличии паспорта</p>
        <div v-html="response.PAY_SYSTEM_ACTION"></div>

        <p v-if="response.ORDER.PAY_SYSTEM_ID==12">
          Счет будет выставлен на сайте и направлен Вам на почту.
        </p>

      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    name: "Thanks",
    props: ['response'],
    mounted() {
        this.reachGoal('m-oformili-zakaz-good')
      this.$store.dispatch('loadCart')
      this.$store.commit('resetOrder')
    }
  }
</script>

<style>
  .sale-paysystem-button button {
    padding: 10px;
    margin: 10px auto;
    color: white;
    font-size: 16px;
    border-radius: 6px;
    background-color: #dd2c00;
  }
</style>
