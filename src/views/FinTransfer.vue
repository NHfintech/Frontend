<template>
  <div class="container min-vh-100">
    <div class="row no-gutters">
      <div class=" py-3 pl-4 ">
        <a @click="$router.go(-1)">
          <b-icon icon="arrow-left" variant="dark" scale="2"></b-icon>
        </a>
      </div>
      <div class="pt-2 mt-1 pl-5 ml-5 font-20 font-do font-weight-bold">
        송금하기
      </div>
    </div>
    <div class="form-group row mt-5">
      <div class="col-12">
        <input class="form-control" type="text" placeholder="보낼금액" v-model="tram">
      </div>
    </div>
    <div class="form-group row mt-3">
      <div class="col-12">
        <textarea class="form-control" type="text" placeholder="보낼 메세지" v-model="message"/>
      </div>
    </div>
    <button class="btn btn-block btn-pink " v-on:click="onClickTransferEvent">
      송금하기
    </button>
  </div>
</template>
<script>
import API from '../components/API'

export default {
  data () {
    return {
      tram: '',
      message: ''
    }
  },
  methods: {
    async onClickTransferEvent () {
      const data = {
        tram: this.tram,
        message: this.message,
        event_hash: this.$route.params.hash
      }
      const res = await API.finTransferAPI(this.$http, this.$env.apiUrl, data)
      if (res.data.result !== 0) {
        alert(res.data.detail)
        return
      }
      alert('success')
      this.$router.replace({ path: '/breakdown' }).catch(() => {})
    },
    checkUser () {
      if (this.$store.state.token === undefined) {
        this.$router.replace({ path: '/login/?next=' + encodeURIComponent(this.$route.fullPath) }).catch(() => {})
      } else if (this.$store.state.user.fin_account === null) {
        this.$router.replace({ path: '/fin/account/?next=' + encodeURIComponent(this.$route.fullPath) }).catch(() => {})
      }
    }
  },
  mounted () {
    this.checkUser()
  }
}
</script>
