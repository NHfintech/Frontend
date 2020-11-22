<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
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
      msg: 'Welcome to Your Vue.js App'
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
h1, h2 {
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
