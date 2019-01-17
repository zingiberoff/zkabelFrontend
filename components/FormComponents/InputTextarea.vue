<template>
    <v-textarea
            name="input-7-1"
            :label="property.NAME"
            v-model ="value"
            :hint="property.DESCRIPTION"
    ></v-textarea>

</template>

<script>
    export default {
        name: "InputTextarea",
        props: ['property'],
        data: function () {
            return {
                value:'',
            }
        },
        mounted:function () {
            this.value =  this.property.VALUE;
        }
    }
</script>

<style scoped>

</style>