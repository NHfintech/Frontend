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
      <h3 class="mt-2">회원가입</h3>
    </div>
    <div v-if="isActiveLogin">
      <h3 class="mt-2">로그인</h3>
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
          <b-form-input aria-describedby="invalid-password" v-model="userPassword" :state="valiPassword" type="password" placeholder="비밀번호" valid-feedback="사용 가능합니다!" invalid-feedback="비밀번호는 6~12자로 설정해주세요" required></b-form-input>
          <b-form-invalid-feedback id="invalid-password" >
            비밀번호는 5~12자 입니다
          </b-form-invalid-feedback>
        </b-input-group>
      </div>
    </div>
    <div v-if="isActiveSignup" class="col-12">
      <div class="col-12">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="shield-fill-check"></b-icon>
          </b-input-group-prepend>
          <b-form-input v-model="confirmUserPassword" aria-describedby="invalid-confirm-password" :state="valiConfirmPassword" type="password" placeholder="비밀번호 확인"></b-form-input>
          <b-form-invalid-feedback id="invalid-confirm-password" >
              비밀번호가 일치하지 않습니다.
          </b-form-invalid-feedback>
        </b-input-group>
      </div>
       <div class="col-12">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="person-badge-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input v-model="name" type="text" placeholder="이름"></b-form-input>
        </b-input-group>
      </div>
      <div class="col-12">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="telephone-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input v-model="phoneNumber" aria-describedby="invalid-phone-number" :state="valiPhoneNumber" type="text" placeholder="핸드폰 번호"></b-form-input>
            <b-form-invalid-feedback id="invalid-phone-number" >
              잘못된 전화번호 입니다.
            </b-form-invalid-feedback>
        </b-input-group>
      </div>
    </div>
    <footer class="col-12 footer text-center">
      <button v-if='!isActiveLogin&&!isActiveSignup' class="col-10 mx-auto mb-3 py-2 font-13 btn btn-block btn-light rounded-pill border-secondary" :class="{'btn-success':username&&userPassword}" v-on:click="isActiveLogin=!isActiveLogin ">로그인</button>
      <button v-if='!isActiveLogin&&!isActiveSignup' class="col-10 mx-auto mt-3 py-2 font-13 btn btn-block btn-light rounded-pill border-success" :class="{'btn-success':username&&userPassword}" v-on:click="isActiveSignup=!isActiveSignup ">회원가입</button>
      <button v-if='isActiveLogin||isActiveSignup' class="btn py-3 btn-success rounded-circle border-success" :class="{'btn-success':username&&userPassword}" v-on:click="isActiveLogin?login():signup() "><b-icon  scale="1.5" variant="dark" icon="arrow-right"></b-icon></button>
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
      confirmUserPassword: '',
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
  computed: {
    valiPassword () {
      if (this.userPassword.length === 0) return null
      return this.userPassword.length > 4 && this.userPassword.length < 13
    },
    valiConfirmPassword () {
      if (this.confirmUserPassword.length === 0) return null
      return this.confirmUserPassword === this.userPassword
    },
    valiPhoneNumber () {
      if (this.phoneNumber.length === 0) return null
      const temp = this.phoneNumber.replaceAll('-', '')
      return temp.length === 11 && temp.substr(0, 3) === '010'
    }

  },
  methods: {
    login: function (fromSignUp) {
      const data = {
        username: this.username,
        password: this.userPassword
      }
      API.signInAPI(this.$http, this.$env.apiUrl, data)
        .then(res => {
          const token = res.data.token
          const user = res.data.user
          this.$http.defaults.headers.common.Authorization = token
          this.$store.commit('saveUser', user)
          this.$store.commit('saveToken', token)
          this.$router.push('/')

          const next = this.$route.query.next === undefined ? '' : '/?next=' + this.$route.query.next
          if (fromSignUp) {
            this.$router.push('/fin/account' + next)
          } else {
            next === '' ? this.$router.push('/') : this.$router.push(this.$route.query.next)
          }
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
        phone_number: this.phoneNumber.replaceAll('-', '')
      }
      API.signUpAPI(this.$http, this.$env.apiUrl, data).then(res => {
        console.log(res.data)
        alert(res.data.detail)
        if (res.data.result === 0) this.login(1)
      })
    }
  }
}
</script>

<style scoped>
.height-max{
  height: 100vh;
}
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
  background-image: url("~@/assets/bg.jpg");

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
