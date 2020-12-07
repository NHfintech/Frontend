<template>
  <div class="bg-pink" style="min-height:100vh">
    <div class="d-block py-3 pl-4 text-left">
      <router-link to="/">  <b-icon icon="arrow-left"  variant="dark" scale="2"></b-icon></router-link>
    </div>
    <div class="container-fluid">
      <b-tabs
        pills
        active-nav-item-class="bg-custom-pink text-dark font-weight-bold"
        class="font-do no-gutters"
        content-class="mt-3"
      >
        <b-tab class="font-do" title="Detail" active>
          <div class="card text-left pl-3 pb-3 font-13 container">
            <h5 class="mt-1 mb-2 font-weight-bold pt-3">
              {{ title }}
            </h5>
            <div class="font-spacing-1">
              {{ body }}
            </div>
          </div>
          <!-- <hr style="border-top:1px solid #ccc; margin:10px 0px" /> -->
          <div
            class="card font-11 mt-1"
            style="display: flex; align-items: baseline;"
          >
            <div class="col-12 row no-gutters pt-3">
              <i class="font-13 ti-location-pin"></i>
              <h5 class="ml-2">{{ location }}</h5>
            </div>
          </div>
          <div
            class="card font-11 mt-1"
            style="display: flex; align-items: baseline;"
          >
            <div class="col-12 row no-gutters pt-3">
              <i class="font-13 ti-calendar"></i>
              <h5 class="ml-2">{{ endDatetime }}</h5>
            </div>
          </div>
        </b-tab>
        <b-tab title="URL">
          <div style="height:100vh">
            <iframe
              src="https://www.itscard.co.kr/mobile/new_m/mcard/minifyHTML/MCard32.asp"
              name="b"
              width="100%"
              height="100%"
              frameborder="0"
              marginwidth="0"
              marginheight="0"
            >
            </iframe>
          </div>
        </b-tab>
        <b-tab title="QR Code">
          <vue-qrcode class="col-12" color.light="#dddddd" :color="{  light: '#FCF3F7' }" v-bind:value="transferUrl" />
          <img v-on:click="onClickShareEvent" src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png">
        </b-tab>
        <!-- <b-tab v-if="userId==$store.state.user.id" title="Setting">
          <vue-qrcode class="col-12" color.light="#dddddd" :color="{  light: '#FCF3F7' }" v-bind:value="transferUrl" />
        </b-tab> -->
        <template v-if="userId==$store.state.user.id" #tabs-end>
          <b-nav-item-dropdown text="Setting" right>
          <b-dropdown-item v-on:click="onClickEditEvent">edit</b-dropdown-item>
          <b-dropdown-item v-on:click="onClickDestroyeEvent">delete</b-dropdown-item>
        </b-nav-item-dropdown>
        </template>
      </b-tabs>
    </div>
    <div>
      <div>
        <img v-on:click="onClickShareEvent" src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png">
        <button v-on:click="onClickEditEvent">edit</button>
        <button v-on:click="onClickDestroyeEvent">delete</button>
      </div>
    </div>
  </div>
</template>
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>Kakao.init('82734c9efef1596fe344120a0103749e')</script>
<script>
import API from '../components/API'
import moment from 'moment'
import VueQrcode from 'vue-qrcode'

export default {
  components: {
    VueQrcode
  },
  data () {
    return {
      transferUrl: `${this.$env.hostUrl}/fin/transfer/${this.eventHash}`,
      category: 'marriage',
      title: '홍길동 홍수지',
      location: '경기도 성남시 판교동',
      body: ` 부모님은 하늘로 부터 받은 최고의 선물이고
              부부는 자신이 선택한 최고의 보물이라고 합니다.
              저희 두사람이 아름다운 하늘빛 아래서
              한 가정을 이루고자 합니다.
              부디 참석하시어 기쁨의 자리를 축복하고
              더욱 빛내어 주시기 바랍니다.`,
      endDatetime: '2020-12-24 18:00:00',
      userId: 0
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
      this.userId = data.user_id
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
