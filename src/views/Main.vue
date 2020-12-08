<template>
  <div class="main bg-light">
    <router-view></router-view>
  </div>
</template>

<script>
// import API from '../components/API'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      sample: [{
        id: 1,
        category: 'funeral',
        title: '홍길동 장례식',
        location: '경기도 성남시',
        body: '홍길동의 장례식',
        eventAdmin: ['0101231234', '01012312312'],
        startDatetime: 'yyyy-mm-dd hh:MM:ss',
        endDatetime: 'yyyy-mm-dd hh:MM:ss'
      },
      {
        id: 2,
        category: 'funeral',
        title: '김길동 장례식',
        location: '경기도 성남시',
        body: '김길동의 장례식',
        eventAdmin: ['0101231234', '01012312312'],
        startDatetime: 'yyyy-mm-dd hh:MM:ss',
        endDatetime: 'yyyy-mm-dd hh:MM:ss'
      }]
    }
  },
  methods: {
    logout: function () {
      this.$store.commit('removeUser')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  height: 100vh;
}
</style>
