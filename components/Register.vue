<template>
    <v-form v-model="formValid" name="register">
        <v-container>
            <v-layout row wrap>

                <v-flex xs12 v-for="(field, code) in fields" :key="code">

                    <v-text-field
                            :label="field.label"
                            :rules="curRules(code)"
                            :type="field.type"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-btn v-if="formValid"
                           color="success"
                           @click="send"
                           block>
                        Зарегистрироваться
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>

    </v-form>
</template>

<script>
    export default {
        name: "Register",
        data: function () {
            return {
                formValid: false,
                rules: {
                    required: value => !!value || 'Обязательное поле',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return pattern.test(value) || 'Email имеет неверный формат '
                    }
                },
                fields: {
                    LOGIN: {
                        label: 'Логин',
                        rules: ['required']
                    },
                    NAME: {
                        label: 'Имя',
                        rules: ['required']
                    },
                    EMAIL: {
                        label: 'Email',
                        rules: ['required', 'email']
                    },
                    PERSONAL_PHONE: {
                        label: 'Телефон',
                        rules: ['required']
                    },
                    PASSWORD: {
                        label: 'Пароль',
                        rules: ['required'],
                        type: 'password'
                    },
                    CONFIRM_PASSWORD: {
                        label: 'Подтверждение пароля',
                        rules: ['required'],
                        type: 'password'
                    }
                },

            }
        },

        methods: {
            send() {
                let formData = new FormData(document.forms.register);
               /** this.$axios.post('/registration/', formData)
                    .then(response => {
                        if (response.status == '200' && response.data != "") {
                            this.$emit('update')
                        }
                    })*//

            },
            curRules(code) {
                let rules = [];
                for (let i = 0; i < this.fields[code].rules.length; i++) {
                    rules.push(this.rules[this.fields[code].rules[i]]);
                }
                return rules;

            }
        },

    }
</script>

<style scoped>

</style>
