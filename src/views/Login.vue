<template>
  <div id="LogIn" class="height-max">
    <div class="col-12 bg-image" :class="{'bg-blur':isActiveSignup||isActiveLogin}">
    </div>
    <div class="col-12 z-index-100 font-do">
      <div class="col-12 text-left">
        <div style="font-size: 3rem;">
          <b-icon v-if="isActiveLogin||isActiveSignup" icon="x" @click="isActiveLogin=false; isActiveSignup=false"></b-icon>
        </div>
      </div>
    <div v-if="!isActiveLogin&&!isActiveSignup">
      <h5 class="pt-5">Welcome to</h5>
      <h5>C&J</h5>
    </div>
    <div v-if="isActiveSignup">
      <h3 class="mt-5">회원가입</h3>
    </div>
    <div v-if="isActiveLogin">
      <h3 class="mt-5">로그인</h3>
    </div>

    <div v-if="isActiveLogin||isActiveSignup" class="col-12 mt-5 ">
      <!-- <div class="col-12">
        <input placeholder="ID" class="form-control" type="text" v-model="username" />
      </div> -->
      <div class="col-12">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input v-model="username" type="text" placeholder="ID"></b-form-input>
        </b-input-group>
      </div>
      <div class="col-12">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="lock-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input v-model="userPassword" type="password" placeholder="PASSWORD"></b-form-input>
        </b-input-group>
      </div>
    </div>
    <div v-if="isActiveSignup" class="col-12">
       <div class="col-12">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="person-badge-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input v-model="name" type="text" placeholder="name"></b-form-input>
        </b-input-group>
      </div>
      <div class="col-12">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="telephone-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input v-model="phoneNumber" type="text" placeholder="phone number"></b-form-input>
        </b-input-group>
      </div>
    </div>
    <footer class="mt-4 col-12 footer text-center">
      <button class="col-10 mx-auto mb-3 py-2 font-13 btn btn-block btn-light rounded-pill border-secondary" :class="{'btn-success':username&&userPassword}" v-on:click="isActiveLogin?login():isActiveLogin=!isActiveLogin ">로그인</button>
      <button class="col-10 mx-auto mt-3 py-2 font-13 btn btn-block btn-light rounded-pill border-success" :class="{'btn-success':username&&userPassword}" v-on:click="isActiveSignup?signup():isActiveSignup=!isActiveSignup ">회원가입</button>
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
      name: '',
      phoneNumber: '',
      isActiveLogin: false,
      isActiveSignup: false
    }
  },
  watch: {
    isActiveLogin: function () {
      if (this.isActiveLogin) this.isActiveSignup = false
    },
    isActiveSignup: function () {
      if (this.isActiveSignup) this.isActiveLogin = false
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
    },

    signup: function () {
      const data = {
        username: this.username,
        password: this.userPassword,
        name: this.name,
        phone_number: this.phoneNumber
      }
      API.signUpAPI(this.$http, this.$env.apiUrl, data).then(res => {
        console.log(res.data)
        alert(res.data.message)
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
