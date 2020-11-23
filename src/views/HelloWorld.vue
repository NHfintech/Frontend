<template>
  <div class="hello">
    <h1>LOGIN PAGE</h1>
    <div class="col-12 justify-content-center">
      <div class="col-12 mt-3">
        <input placeholder="ID" class="col-9" type="text" name="id" v-model="id" />
      </div>
      <div class="col-12 mt-3 ">
        <input placeholder="Password" class="col-9" type="password" name="password" v-model="password" />
      </div>
    </div>
    <div class="mt-4">
      <button class="btn btn-success" :disabled="!id&&!password" @click="onClickSendData">로그인</button>
      <router-link class="btn border-success" :to="{ path: SignupURL }">회원가입</router-link>
    </div>

     <button @click="onClickSendData">
      Send Data
    </button>
      <router-link :to="{ path: routerTestURL }">
        이동
      </router-link>
      <br><br><br>
      <div v-if="isLoggedIn">
        <a @click="logout" href="/">SIGN OUT</a>
      </div>
      <div v-else>
        <router-link :to="{ path: loginURL }">
          SIGN IN
        </router-link>
      </div>
  </div>
</template>

<script>
import API from '../components/API'

export default {
  name: 'HelloWorld',
  data () {
    return {
      id: 'hi',
      password: 'pw'
    }
  },
  methods: {
    async onClickSendData () {
      const data = {
        email: 'test@test.test',
        gender: 'male'
      }
      let res = await API.httpTest(this.$http, this.$env.apiUrl, data).catch((e) => { console.log(e) })
      console.log(res.data['email'])
      console.log(res.data['gender'])
    },
    logout: function () {
      this.$store.commit('removeUser')
    }
  },
  computed: {
    SignupURL () {
      return '/Signup'
    },
    routerTestURL () {
      return '/routertest'
    },
    loginURL () {
      return '/login'
    },
    isLoggedIn: function () {
      if (this.$store.state.user === undefined) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
