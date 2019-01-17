<template>
    <v-text-field xs12
                  v-model="value"
                  :label="property.NAME"
                  :rules="curRules"
    ></v-text-field>

</template>

<script>
    export default {
        name: "InputText",
        props: ['property'],
        data: function () {
            return {
                value: '',
                rules: {
                    required: value => !!value || 'Обязательное поле',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return pattern.test(value) || 'Invalid e-mail.'
                    }
                }
            }
        },
        computed: {
            curRules() {
                let rules = [];
                if (this.property.REQUIED == 'Y') rules.push(this.rules.required);
                if (this.property.IS_EMAIL == 'Y') rules.push(this.rules.email);
                return rules;

            }
        },
        watch: {
            value: function (val, old) {
                if (old == undefined) {
                    old = ''
                }
                if (val != null && val.trim() !== old.trim()) {

                    this.$emit('change', val.trim())
                }

            }
        },
        mounted: function () {
            this.value = this.property.VALUE;
        }
    }
</script>

<style scoped>

</style>