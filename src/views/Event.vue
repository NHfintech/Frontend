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
            <img v-on:click="onClickShareEvent" src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png">
          </div>
        </div>
    </div>
</template>
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>Kakao.init('82734c9efef1596fe344120a0103749e')</script>
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
    },
    onClickShareEvent () {
      const webUrl = `${this.$env.hostUrl}/invite/${this.eventHash}/?hostId=${this.$store.state.user.id}`
      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '딸기 희승 케익',
          description: '#결혼식 #장례식 #경조사 #축의금 #조의금 #부조금',
          imageUrl:
            'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
          link: {
            mobileWebUrl: webUrl,
            webUrl: webUrl
          }
        },
        buttons: [
          {
            title: '앱으로 보기',
            link: {
              mobileWebUrl: webUrl,
              webUrl: webUrl
            }
          }
        ]
      })
    }
  },
  mounted () {
    this.getEvent()
  }
}
</script>
