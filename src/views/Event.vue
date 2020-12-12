<template>
  <div :class="getBackgroundColour()" style="min-height:100vh">
    <div class="d-block py-3 pl-4 text-left">
      <router-link to="/">  <b-icon icon="arrow-left"  variant="dark" scale="2"></b-icon></router-link>
    </div>
    <div class="container-fluid">
      <b-tabs
        fill
        pills
        :active-nav-item-class="{'bg-custom-pink' : category=='wedding','bg-custom-gray' : category=='funeral','text-dark font-weight-bold':true}"
        class="font-do no-gutters"
        content-class="mt-3"
      >
        <b-tab class="font-do" title="내용" active>
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
              <h5><i class="font-13 mr-1 ti-location-pin"></i>{{ location + ' ' + locationDetail }}</h5>
            </div>
          </div>
          <div
            class="card font-11 mt-1"
            style="display: flex; align-items: baseline;"
          >
            <div class="col-12 row no-gutters pt-3">
              <i class="font-13 ti-calendar"></i>
              <h5 class="ml-2">{{ eventDatetime }}</h5>
            </div>
          </div>
          <div
            class="card font-11 mt-1"
            style="display: flex; align-items: baseline;"
          >
            <div class="col-12 row no-gutters pt-3">
              <i class="font-13 ti-link"></i>
              <router-link :to="finTransferURL">
                <h5 class="ml-2">송금 페이지 바로가기</h5>
              </router-link>
            </div>
          </div>
        </b-tab>
        <b-tab title="링크">
          <div style="height:100vh">
            <iframe
              :src="invitationUrl"
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
        <b-tab v-if="userType==='master' || userType==='admin'" title="QR">
          <vue-qrcode class="col-12 my-5" color.light="#dddddd" :color="{  light: '#f8f8f8' }" v-bind:value="getTransferUrl()" />
          <div class="row text-center no-gutters col-12" v-b-modal.modal-message-closing >
            <div class="col-10 font-na font-20">카카오톡으로 이벤트 공유하기</div>
            <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png">
          </div>
          <b-modal
            id="modal-message-closing"
            ref="modal"
            title="함께 전송할 메세지를 입력해주세요"
            @ok="onClickShareEvent"
          >
            <form ref="form" @submit.stop.prevent="handleSubmit">
              <b-form-group
                :state="message.length>3?true:null"
                label="문자메세지"
                label-for="message-input"
                invalid-feedback="message is required"
              >
                <b-form-textarea
                  id="message-input"
                  v-model="message"
                  :state="message.length>3?true:null"
                  required
                ></b-form-textarea>
              </b-form-group>
            </form>
          </b-modal>
        </b-tab>
        <b-tab title="내역" v-if="userType==='master' || userType==='admin'" lazy>
          <event-breakdown
          :user-type="userType"/>
        </b-tab>
        <template v-if="userType==='master'" #tabs-end>
          <b-nav-item-dropdown no-caret variant="light" right style="background-color: #f8f8f8 !important; color: black !important;">
            <template #text>
              <b-icon style="color: gray" icon="three-dots-vertical"></b-icon>
            </template>
            <div >
              <div class="rounded shadow bg-white">
                <b-dropdown-item v-if="isActivated" v-on:click="onClickEditEvent">수정하기</b-dropdown-item>
                <b-dropdown-item v-on:click="onClickDestroyEvent">삭제하기</b-dropdown-item>
                <b-dropdown-item v-if="isActivated" v-on:click="onClickCloseEvent">종료하기</b-dropdown-item>
                <b-dropdown-item v-if="isReceived === false" @click="clickModal">계좌로 입금받기</b-dropdown-item>
                <b-modal
                  ref="receive-deposit-modal"
                  @hidden="resetModal"
                  @ok="handleOk"
                >
                  <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group
                      :state="nameState"
                      label="은행"
                      label-for="name-input"
                    >
                      <b-form-select
                        id="bankCodeInput"
                        v-model="bankCode"
                        :state="nameState"
                        required
                      >
                        <option value="">은행을 선택해 주세요.</option>
                        <option value="011">(011) 농협은행</option>
                        <option value="012">(012) 농협상호금융</option>
                        <option value="002">(002) 산업은행</option>
                        <option value="003">(003) 기업은행</option>
                        <option value="004">(004) 국민은행</option>
                        <option value="081">(081) KEB하나은행</option>
                        <option value="020">(020) 우리은행</option>
                        <option value="023">(023) SC제일은행</option>
                        <option value="027">(027) 시티은행</option>
                        <option value="032">(032) 대구은행</option>
                        <option value="034">(034) 광주은행</option>
                        <option value="035">(035) 제주은행</option>
                        <option value="037">(037) 전북은행</option>
                        <option value="039">(039) 경남은행</option>
                        <option value="045">(045) 새마을금고</option>
                        <option value="088">(088) 신한은행</option>
                        <option value="090">(090) 카카오뱅크</option>
                      </b-form-select>
                    </b-form-group>
                    <b-form-group
                      :state="nameState"
                      label="계좌번호"
                      label-for="name-input"
                    >
                      <b-form-input
                        id="name-input"
                        v-model="accountNumber"
                        :state="nameState"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </form>
                </b-modal>
              </div>
            </div>
          </b-nav-item-dropdown>
        </template>
      </b-tabs>
    </div>
  </div>
</template>
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>Kakao.init('1cea813161beb949ad235005f477e237')</script>
<script>
import API from '../components/API'
import errorcode from '../components/errorcode.json'
import moment from 'moment'
import VueQrcode from 'vue-qrcode'
import EventBreakdown from './EventBreakdown.vue'

export default {
  components: {
    VueQrcode,
    EventBreakdown
  },
  data () {
    return {
      category: '',
      title: '',
      location: '',
      locationDetail: '',
      body: '',
      eventDatetime: '',
      invitationUrl: '',
      isActivated: '',
      userId: '',
      eventHash: '',
      userType: '',
      bankCode: '',
      accountNumber: '',
      nameState: '',
      isReceived: '',
      finTransferURL: '',
      message: ''
    }
  },
  methods: {
    async getEvent () {
      const res = await API.getEventAPI(this.$http, this.$env.apiUrl, this.$route.params.id)
      if(res.data.result === errorcode.NO_DATA) {
        this.$router.replace({ path: '/404' }).catch(() => {})
        return
      }
      const data = res.data.data
      console.log(data)
      this.category = data.category
      this.title = data.title
      this.body = data.body
      this.location = data.location
      this.locationDetail = data.location_detail
      this.invitationUrl = data.invitationUrl
      this.eventDatetime = moment(data.event_datetime).format('YYYY-MM-DD HH:mm:ss')
      this.isActivated = data.is_activated
      this.eventHash = data.event_hash
      this.userId = data.user_id
      this.userType = data.userType
      this.isReceived = data.is_received
      this.message = data.message
      this.finTransferURL = `/fin/transfer/${this.eventHash}`
    },
    onClickEditEvent () {
      this.$router.replace({ path: '/event/edit/' + this.$route.params.id }).catch(() => {})
    },
    async onClickDestroyEvent () {
      if (this.isActivated) {
        alert('종료된 이벤트만 삭제할 수 있습니다.')
        return
      }
      if (confirm('이벤트 삭제 시 모든 이체 내역을 조회할 수 없게 됩니다. 정말 삭제하시겠습니까?') === false) {
        return
      }
      const res = await API.destroyEventAPI(this.$http, this.$env.apiUrl, this.$route.params.id)
      if (res.data.result === errorcode.UNKNOWN_ERROR) {
        alert(res.data.detail)
        return
      }
      this.$router.replace({ path: '/' }).catch(() => {})
    },
    async onClickCloseEvent () {
      if (confirm('이벤트 종료 시 송금 링크가 비활성화 됩니다. 이벤트를 종료하시겠습니까?') === false) {
        return
      }
      const res = await API.closeEventAPI(this.$http, this.$env.apiUrl, this.$route.params.id)
      if (res.data.result === errorcode.SUCCESS) {
        this.isActivated = false
      }
    },
    onClickBreakdownEvent () {
      this.$router.replace({ path: `/event/${this.$route.params.id}/breakdown` }).catch(() => {})
    },
    onClickQRCodeEvent () {
      this.$router.replace({ path: '/qrcode/' + this.eventHash }).catch(() => {})
    },
    onClickShareEvent () {
      const webUrl = `${this.$env.hostUrl}/invite/${this.eventHash}/?hostId=${this.$store.state.user.id}`
      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: this.title+" 에 초대합니다.",
          description: this.message,
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
    },
    async receiveDepositEvent () {
      const data = {
        event_hash: this.eventHash,
        bncd: this.bankCode,
        acno: this.accountNumber
      }
      const res = await API.finReceiveAPI(
        this.$http,
        this.$env.apiUrl,
        data
      )
      if (res.data.result !== errorcode.SUCCESS) {
        alert(res.data.detail)
      }
      this.$refs['receive-deposit-modal'].hide()
    },
    getTransferUrl () {
      return `${this.$env.hostUrl}/fin/transfer/${this.eventHash}`
    },
    getBackgroundColour () {
      return this.category === 'funeral' ? 'bg-gray' : 'bg-pink'
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    clickModal () {
      if (this.isActivated) {
        console.log('hi')
        alert('종료 이후에만 출금할 수 있습니다.')
        return
      }
      this.$refs['receive-deposit-modal'].show()
    },
    resetModal () {
      this.bankCode = ''
      this.accountNumber = ''
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      this.receiveDepositEvent()
    }
  },
  mounted () {
    this.getEvent()
  }
}
</script>
