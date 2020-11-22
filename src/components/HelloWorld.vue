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
    <button class="btn btn-success" :disabled="!id&&!password" @click="onClickSendData">로그인</button>
    <router-link class="btn border-success" :to="{ path: routerTestURL }">회원가입</router-link>
  </div>
</template>

<script>
import httpRequest from './httpRequest'

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
      let res = await httpRequest
        .httpTest(this.$http, this.$env.apiUrl, data)
        .catch(e => {
          console.log(e)
        })
      console.log(res.data['email'])
      console.log(res.data['gender'])
    }
  },
  computed: {
    routerTestURL () {
      return '/routertest'
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
