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
        props: ['personType'],
        data: function () {
            return {
                userProfiles: [],
                profile: 0,
            };
        },
        watch: {
            profile: function (val) {
                this.$emit('change',val)
            },
            personType:function(){
                this.update();
            }
        },
        methods: {
            update:function () {
                this.$axios.get('/api/order/getProfiles/?personType=' + this.personType)
                    .then(response => {
                        if (response.status == '200' && response.data != "") {
                            if (response.data.result[0].ID > 0) {
                                this.profile =response.data.result[0].ID;
                            }
                            this.userProfiles = response.data.result;
                        }
                    })
                    .catch(e => {

                    })
            }
        },
        created(){
            this.update();
        }
    }
</script>

<style scoped>

</style>