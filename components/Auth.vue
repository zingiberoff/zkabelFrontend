<template>
    <div class="auth">
        <input v-model="login" placeholder="Логин">
        <input type="password" v-model="password" placeholder="Пароль">
        <div class="btn" @click="Login()">Войти</div>
        <a class="pa-2 mt-2" href="/registration">Регистрация</a>
    </div>
</template>

<script>
    export default {
        name: "Auth",
        data: function () {
            return {
                login: '',
                password: ''
            }
        },
        methods: {
            Login: function () {
                if (!this.login || !this.password) return false;
                const formData = new FormData();
                formData.append('login', this.login);
                formData.append('pass', this.password);
                formData.append('ACTION', 'login');
              /** todo: To Store
               *

                this.$axios.post('/ajax/global_listener.php', formData)
                    .then(resp => {
                        if (resp.status == '200' && resp.data != "") {

                            if (resp.data.STATUS == true) {
                                const token = resp.data.token;
                                // console.log(token);
                                localStorage.setItem('user-token', token); // store the token in localstorage
                                window.location.reload();
                            }
                        }
                    })
                    .catch(err => {
                        localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
                    })*/
            }
        }
    }
</script>

<style scoped>

</style>
