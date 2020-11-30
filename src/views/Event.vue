<template>
    <div>
        <a href="/">Home</a>
        <div>
          <div>
            {{title}}
          </div>
          <div>
            {{body}}
          </div>
          <div>
            {{location}}
          </div>
          <div>
            {{eventDatetime}}
          </div>
          <div>
            <button v-on:click="onClickEditEvent">edit</button>
            <button v-on:click="onClickDestroyeEvent">delete</button>
            <button v-if="isActivated" v-on:click="onClickCloseEvent">close</button>
            <button v-on:click="onClickQRCodeEvent">qrcode</button>
          </div>
        </div>
    </div>
</template>
<script>
import API from '../components/API'
import moment from 'moment'

export default {
  data () {
    return {
      title: '',
      location: '',
      body: '',
      eventDatetime: '',
      isActivated: '',
      eventHash: ''
    }
  },
  methods: {
    async getEvent () {
      const res = await API.getEventAPI(this.$http, this.$env.apiUrl, this.$route.params.id)
      const data = res.data.data
      this.title = data.title
      this.body = data.body
      this.location = data.location
      this.eventDatetime = moment(data.event_datetime).format('YYYY-MM-DD HH:mm:ss')
      this.isActivated = data.is_activated
      this.eventHash = data.event_hash
    },
    onClickEditEvent () {
      this.$router.replace({ path: '/event/edit/' + this.$route.params.id }).catch(() => {})
    },
    async onClickDestroyeEvent () {
      await API.destroyEventAPI(this.$http, this.$env.apiUrl, this.$route.params.id)
      this.$router.replace({ path: '/' }).catch(() => {})
    },
    async onClickCloseEvent () {
      await API.closeEventAPI(this.$http, this.$env.apiUrl, this.$route.params.id)
      this.$router.replace({ path: '/' }).catch(() => {})
    },
    onClickQRCodeEvent () {
      this.$router.replace({ path: '/qrcode/' + this.eventHash }).catch(() => {})
    }
  },
  mounted () {
    this.getEvent()
  }
}
</script>
