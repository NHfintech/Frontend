<template>
  <div class="main bg-light">
    <div class="container-fluid pt-2">
      <div class="my-2 px-0 bg-white border-0 font-13 font-do container-fluid" style="height:85px" v-for="item in sample" :key="item.id" >
        <div class="pt-2 h-100 px-0 rounded col-12 bg-custom-light row m-0 text-left">
          <div class="col-2 mb-2 " style="font-size: 2.3rem;" ><b-icon class="rounded shadow-sm border" style="color: #FFAAAF " scale="0.8" icon="envelope-fill"></b-icon></div>
          <div class="col-10 h-100 w-100 d-table-cell row">
            <div class="col-6">
              {{item.title}}
            </div>
            <div class="col-6">
              {{item.startDatetime.split(' ')[0]}}
            </div>
            <div class="col-6">
              {{item.category}}
            </div>
            <div class="col-6">
              {{item.location}}
            </div>
          </div>
          <div class="col-5">
          </div>
        </div>
    </div>
    </div>
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
        'id': 1,
        'category': 'funeral',
        'title': '홍길동 장례식',
        'location': '경기도 성남시',
        'body': '홍길동의 장례식',
        'eventAdmin': [ '0101231234', '01012312312' ],
        'startDatetime': 'yyyy-mm-dd hh:MM:ss',
        'endDatetime': 'yyyy-mm-dd hh:MM:ss'
      },
      {
        'id': 2,
        'category': 'funeral',
        'title': '김길동 장례식',
        'location': '경기도 성남시',
        'body': '김길동의 장례식',
        'eventAdmin': [ '0101231234', '01012312312' ],
        'startDatetime': 'yyyy-mm-dd hh:MM:ss',
        'endDatetime': 'yyyy-mm-dd hh:MM:ss'
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
