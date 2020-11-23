<template>
  <div id="LogIn" class="height-max">
    <div class="col-12 bg-image" :class="{'bg-blur':isActive}">
    </div>
    <div class="col-12 justify-content-start z-index-100 font-do">
      <router-link class="col-3" to='/'>
      홈으로
      </router-link>
    <h5 class="mt-5">Welcome to</h5>
    <h5>C&J</h5>
    <div v-if="isActive" class="col-12 mt-5 ">
      <div class="col-12">
        <input placeholder="ID" class="form-control" type="text" v-model="username" />
      </div>
      <div class="col-12 mt-3  font-do">
        <input placeholder="PASSWORD" class="form-control" type="password" v-model="userPassword" />
      </div>
    </div>
    <footer class="mt-4 col-12 footer text-center">
      <button class="col-10 mx-auto mb-3 py-2 font-13 btn btn-block btn-light rounded-pill border-secondary" :class="{'btn-success':username&&userPassword}" v-on:click="isActive?login():isActive=!isActive ">로그인</button>
      <router-link class="col-10 mx-auto mt-3 py-2 font-13 btn btn-block btn-light rounded-pill border-success" to='Signup'>회원가입</router-link>
    </footer>
    </div>
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
.z-index-100{
  z-index: 100;
}
.bg-image {
  transition-duration: 0.3s;
  position: fixed;
  /* The image used */
  background-image: url("~@/assets/bg-login.jpg");

  /* Add the blur effect */
  /* filter: blur(10px); */
  /* -webkit-filter: blur(10px); */
  opacity: 0.4;

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.bg-blur{
  /* Add the blur effect */
  filter: blur(10px);
  -webkit-filter: blur(10px);
  opacity: 0.7;

}
.bg-main{
  /* position: absolute; */
  /* top: 50%; */
  /* left: 50%; */
  height: 100vh;
  transform: translate(-50%, -50%);
  background-color: rgba(0,0,0, 0.4); /* Black w/opacity/see-through */
}

.btn-light{
  opacity: 0.8;
}
</style>
