<template>
    <v-layout v-if="show"
              row wrap>
        <v-flex xs12>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Способы оплаты</h3>
                    </div>
                </v-card-title>
                <v-radio-group v-model="value" :rules="[active]">
                    <v-container fluid
                                 grid-list-lg>
                        <template v-for="item in items">

                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-card @click="value=item.id">
                                        <v-card-title>
                                            <div class="payment">
                                                <v-radio
                                                        :key="'payment'+item.id"
                                                        :value="item.id"
                                                        :label="item.name"
                                                ></v-radio>
                                                <div class="small" v-html="item.description"></div>
                                            </div>
                                        </v-card-title>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </template>
                    </v-container>
                </v-radio-group>

            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "Payment",
        props: ['personType'],
        data: function () {
            return {
                location: false,
                items: [],
                value: '',
            }
        },
        computed: {
            active() {
                return () => {
                    if (this.value > 0) {
                        return true
                    } else {
                        return 'Выберите способ оплаты'
                    }
                }
            },
            show() {
                return this.location && this.items.length > 0;
            }
        },
        watch: {
            value(val) {
                this.$emit('update', val);
            }
        },
        methods: {
            update() {
                this.items = [];
                this.$axios.post('/api/order/getPayment/', {
                    LOCATION: this.location,
                    personType: this.personType

                })
                    .then(response => {
                        if (response.status == '200' && response.data != "") {
                            this.items = response.data.result;
                        }
                    })
            }
        },
        created() {
            this.bus.$on('changeLocation', data => {
                this.location = data;
                this.update();
            });
            this.update();
        }
    }
</script>

<style scoped>

</style>