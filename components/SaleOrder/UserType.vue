<template>

    <v-radio-group v-model="radios" :mandatory="false" :rules="[active]">
        <v-radio   v-for="type in userType"
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
                userType: [],
                radios:0
            };
        },
        computed:{
            active() {
                return ()=> {
                    return !!this.radios;
                }
            }
        },
        watch:{
            radios: function (val) {
                this.$emit('change',val);
            }
        },
        methods: {
            update: function () {
                this.$axios.get('/api/order/getUserType/')
                    .then(response => {
                        if (response.status == '200' && response.data != "") {
                            this.userType = response.data.result;
                        }
                    })
                    .catch(e => {

                    })
            }
        },
        mounted: function () {
            this.update();
        }
    }
</script>

<style scoped>

</style>