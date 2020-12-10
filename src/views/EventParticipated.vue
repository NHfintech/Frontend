<template>
  <div>
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
                <p class="mb-1 font-na">
                  <span
                    v-if="stats.is_activated"
                    class="badge bg-open border"
                    style="padding: 3px 6px; font-size:0.85em; font-weight:500 "
                    >계좌 오픈</span
                  >
                  <span
                    v-else
                    class="badge bg-light border"
                    style="padding: 3px 6px; font-size:0.85em; font-weight:500"
                    >계좌 마감</span
                  >
                </p>
                <div style="font-size: 1.2rem; font-weight: 600;">
                  {{ stats.title }}
                </div>
                <div class="font-20 font-na border d-inline-block px-2 rounded bg-custom-light text-secondary">
                 <span class="font-do">#</span>{{ stats.category }}식
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
  components: {
    StatsCard
  },
  data () {
    return {
      eventList: []
    }
  },
  methods: {
    async fetchEventList () {
      const data = { host: false }
      const res = await API.getEventListAPI(
        this.$http,
        this.$env.apiUrl,
        data
      )
      this.eventList = res.data.data
      for (const i of this.eventList) {
        switch (i.category) {
          case 'wedding' :
            i.category = '결혼'
            break
          case 'funeral':
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
<style scoped>
  .bg-open{
    background-color: lightpink !important;
    }
  /* .bg-close{
    background-color:#FFADC5 !important;
  } */
</style>
