<template>
    <select class="form-control"
           id="'prop_'+property.ID"
           value=""
    >
        <option>123</option>
    </select>
</template>

<script>
    export default {
        name: "InputSelect",
        props: ['property'],
        data: function () {
            return {}
        },
    }
</script>

<style scoped>

</style>