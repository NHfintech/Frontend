<template>
  <div>
    <div class="form-group row">
      <label class="col-4 col-form-label" for="accountNumber">Tram</label>
      <div class="col-6">
        <input class="form-control" type="text" v-model="tram">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-4 col-form-label" for="message">Message</label>
      <div class="col-6">
        <textarea class="form-control" type="textarea" v-model="message"/>
      </div>
    </div>
    <button v-on:click="onClickTransferEvent">
      Transfer
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
