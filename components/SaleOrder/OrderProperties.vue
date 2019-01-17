<template>

    <v-layout row wrap>

        <v-flex xs12 v-for="group in orderProperties" :key="'group_'+group.ID" >

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
            return {
                orderProperties: [],
            };
        },
        methods: {
            updateProperty: function (a, b) {
                a.VALUE = b;
                let orderProps = {};
                for(let group in this.orderProperties){
                    for(let propid in this.orderProperties[group].PROPS){
                        let props = this.orderProperties[group].PROPS[propid];
                        orderProps[props.CODE] = props.VALUE;
                    }
                }
             this.bus.$emit('changeOrderProperty',orderProps);
            },
            update(){
                this.$axios.get('/api/order/getProps/?personType=' + this.personType + '&profileID=' + this.profileID)
                    .then(response => {
                        if (response.status == '200' && response.data != "") {
                            this.orderProperties = response.data.result;

                        }
                    })
                    .catch(e => {
                    })
            }
        },
        watch:{
            personType(){
                this.update();
            },
            profileID(){
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
    .list-enter  {
        opacity: 0;
        transform: translateX(100%);
    }
    .list-leave-to{
        opacity: 0;
        transform: translateX(-100%);
    }
</style>