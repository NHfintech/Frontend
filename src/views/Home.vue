<template>
  <div>
      <button v-on:click="logout">
        sign out
      </button>
      <tbody>
        <tr v-for="(dd) in eventList" :key = dd.id v-on:click="onClickEvent(dd.id)">
          <td>
            <div v-if="dd.isActive">
              green
              {{dd.category}}
            </div>
            <div v-else>
              grey
              {{dd.category}}
            </div>
          </td>
          <td>
            {{dd.title}}
          </td>
        </tr>
      </tbody>
      <router-link :to="{ path: createEventURL }">
          Create Event
      </router-link>
  </div>
</template>

<script>
// import API from '../components/API'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      eventList: []
    }
  },
  methods: {
    async fetchEventList () {
      // const data = {'host': true}
      // const res = await API.getEventListAPI(this.$http, this.$env.apiUrl, data)
      // this.eventList = res.data.data
      // test eventList
      this.eventList = [{'id': 2, 'category': 'marriage', 'title': 'jaehoon <3 jechan', 'isActive': true},
        {'id': 10, 'category': 'marriage', 'title': 'hyunjoon <3 huiseung', 'isActive': false},
        {'id': 25, 'category': 'funeral', 'title': 'gildong father', 'isActive': true}]
    },
    logout () {
      this.$store.commit('removeUser')
      this.$router.replace({ path: '/login' }).catch(() => {})
    },
    onClickEvent (index) {
      this.$router.replace({ path: '/event/' + index }).catch(() => {})
    }
  },
  computed: {
    routerTestURL () {
      return '/routertest'
    },
    loginURL () {
      return '/login'
    },
    createEventURL () {
      return '/event/create'
    }
  },
  mounted () {
    this.fetchEventList()
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
