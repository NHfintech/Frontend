<template>
  <div id="LogIn">
    <h2>LogIn Page</h2>
    <br>
    <input required v-model='username' placeholder="ID"><br><br>
    <input required type="password" v-model='userPassword' placeholder="PASSWORD"><br><br>
    <button v-on:click="login()">
      로그인
    </button>
    <br>
    <router-link to='/'>
      홈으로
    </router-link>
  </div>
</template>
<script>
import API from '../components/API'
export default {
  data () {
    return {
      username: '',
      userPassword: ''
    }
  },
  methods: {
    login: function () {
      const data = {
        username: this.username,
        userPassword: this.userPassword
      }
      API.signInAPI(this.$http, this.$env.apiUrl, data)
        .then(res => {
          const token = res.data.token
          const user = res.data.user
          this.$http.defaults.headers.common['Authorization'] = token
          this.$store.commit('saveUser', user)
          this.$store.commit('saveToken', token)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>