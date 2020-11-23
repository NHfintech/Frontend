<template>
  <div id="LogIn" class="height-max">
    <div class="col-12 justify-content-start">
      <router-link class="col-3" to='/'>
    홈으로
    </router-link>
    </div>
    <h5>Welcome to</h5>
    <h5>C&J</h5>
    <div v-if="isActive" class="col-12 justify-content-center">
      <div class="col-12 mt-3">
        <input placeholder="ID" class="col-9" type="text" v-model="username" />
      </div>
      <div class="col-12 mt-3 ">
        <input placeholder="PASSWORD" class="col-9" type="password" v-model="userPassword" />
      </div>
    </div>
    <footer class="mt-4 col-12 footer text-center">
      <button class="col-10 mx-auto mb-3 py-2 font-13 btn btn-block rounded-pill border-secondary" :class="{'btn-success':username&&userPassword}" v-on:click="isActive?login():isActive=!isActive ">로그인</button>
      <router-link class="col-10 mx-auto mt-3 py-2 font-13 btn btn-block rounded-pill border-success" to='Signup'>회원가입</router-link>
    </footer>
  </div>
</template>
<script>
import API from '../components/API'
export default {
  data () {
    return {
      username: '',
      userPassword: '',
      isActive: false
    }
  },
  methods: {
    login: function () {
      const data = {
        username: this.username,
        password: this.userPassword
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

<style scoped>
.footer{
  position: fixed;
  bottom: 10%;
}

.bg-image {
  /* The image used */
  /* background-image: url("photographer.jpg"); */

  /* Add the blur effect */
  filter: blur(8px);
  -webkit-filter: blur(8px);

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
