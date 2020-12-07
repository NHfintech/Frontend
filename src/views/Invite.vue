<template>
  <div>
    초대 권한 확인 중
  </div>
</template>
<script>
import API from '../components/API'

export default {
  methods: {
    async invite () {
      if (this.$store.state.token === undefined) {
        this.$router.replace({ path: '/login/?next=' + encodeURIComponent(this.$route.fullPath) }).catch(() => {})
      } else {
        const data = {
          hostId: this.$route.query.hostId
        }
        const res = await API.inviteAPI(this.$http, this.$env.apiUrl, this.$route.params.hash, data)
        this.$router.replace({ path: '/event/' + res.data.event_id }).catch(() => {})
      }
    }
  },
  mounted () {
    this.invite()
  }
}
</script>
