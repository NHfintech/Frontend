<template>
  <div>
    <!-- <div>wh?</div>
    <button v-on:click="logout">
      sign out
    </button> -->
    <b-navbar type="light" class="bg-custom">
      <b-navbar-nav>
        <b-nav-item href="#">이벤트</b-nav-item>
        <b-nav-item href="/breakdown">송금 내역</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{ $store.state.user.id }}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout()">logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <h3><a href="callMyApp://search">앱실행 </a></h3>
    <!--Stats cards-->
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-md-6 col-xl-3"
          v-for="stats in eventList"
          :key="stats.title"
        >
          <div @click="onClickEvent(stats.id)">
            <stats-card
              :class="{
                'bg-pink': stats.category === '결혼',
                'bg-gray': stats.category === '장례',
              }"
            >
              <div
                class="icon-big text-center"
                :class="`icon-ti-email`"
                slot="header"
              >
                <div
                  v-if="stats.category === '결혼'"
                  class="overflow-hidden"
                  style="width:80px; height:80px"
                >
                  <img width="80px" src="@/assets/img/cake.svg" alt="" />
                </div>
                <div
                  v-if="stats.category === '장례'"
                  class="overflow-hidden"
                  style="width:80px; height:80px"
                >
                  <img width="80px" src="@/assets/img/flower.svg" alt="" />
                </div>
              </div>
              <div class="numbers" slot="content">
                <p class="mb-1">
                  <span
                    class="badge bg-custom-pink"
                    :class="{
                      'bg-custom-grey text-white': stats.category == '장례',
                    }"
                    style="padding: 3px 6px; "
                    >{{ stats.category }}</span
                  >
                </p>
                <div style="font-size: 1.2rem; font-weight: 600;">
                  {{ stats.title }}
                </div>
                <div style="font-size: 1.2rem; font-weight: 600;">
                  200,000 원
                </div>
              </div>
              <div class="stats" slot="footer">
                <i class="ti-calendar"></i> {{ stats.event_datetime }}
              </div>
            </stats-card>
          </div>
        </div>
        <div class="col-md-6 col-xl-3 text-right ">
          <router-link class="pb-4 pr-4 " :to="{ path: createEventURL }">
            <b-iconstack font-scale="2">
              <b-icon variant="success" icon="plus-circle-fill"></b-icon>
            </b-iconstack>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../components/API'
import StatsCard from '@/components/Cards/StatsCard.vue'

export default {
  name: 'HelloWorld',
  components: {
    StatsCard
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      eventList: []
    }
  },
  methods: {
    async fetchEventList () {
      const data = { host: true }
      const res = await API.getEventListAPI(
        this.$http,
        this.$env.apiUrl,
        data
      )
      this.eventList = res.data.data
      for (const i of this.eventList) {
        switch (i.category) {
          case 'marriage':
            i.category = '결혼'
            break
          case 'furniture':
            i.category = '장례'
            break
          default:
            break
        }
      }
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
  /* h1, h2 {
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
} */
</style>
