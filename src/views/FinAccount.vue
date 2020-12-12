<template>
  <div class="container min-vh-100">
    <div class="row no-gutters">
      <div class=" py-3 pl-4 ">
        <a @click="$router.go(-1)">
          <b-icon icon="arrow-left" variant="dark" scale="2"></b-icon>
        </a>
      </div>
      <div class="pt-2 mt-1 pl-5 ml-3 font-20 font-do font-weight-bold">
        계좌번호 등록
      </div>
        <button v-if="$store.state.user" class=" p-1 ml-4 align-self-center font-20 font-do font-weight-bold btn bg-main-pink border h-100" v-on:click="logout()">
      로그아웃
    </button>
    </div>

    <div class="row no-gutters ">
      <div class="col-4 " v-for="bank of bankList" :key="bank.code">
        <button
          @click="bankCode = bank.code"
          class="border font-size px-1 col-12 py-3 btn font-do"
          :class="{ 'btn-pink': bankCode === bank.code }"
        >
          {{ bank.name }}
        </button>
      </div>
    </div>
    <b-form-group
      class="text-left font-do my-3"
      id="fieldset-1"
      label="계좌번호를 입력해주세요 (-제외)"
      label-for="input-1"
      valid-feedback="올바른 형식입니다!"
      :invalid-feedback="invalidFeedback"
      :state="state"
    >
      <b-form-input
        id="input-1"
        type="number"
        v-model="accountNumber"
        :state="state"
        trim
      ></b-form-input>
    </b-form-group>
    <div>
      <button
        class="btn btn-pink border"
        :disabled="!bankCode || !state"
        v-on:click="onClickLinkAccountEvent"
      >
        계좌 연동하기
      </button>
    </div>
  </div>
</template>
<script>
import API from '../components/API'
import errorcode from '../components/errorcode.json'

export default {
  data () {
    return {
      accountNumber: '',
      bankCode: 0,
      bankList: [
        { code: '011', name: '농협은행' },
        { code: '012', name: '농협상호금융' },
        { code: '002', name: '산업은행' },
        { code: '003', name: '기업은행' },
        { code: '004', name: '국민은행' },
        { code: '081', name: 'KEB하나은행' },
        { code: '020', name: '우리은행' },
        { code: '023', name: 'SC제일은행' },
        { code: '027', name: '시티은행' },
        { code: '032', name: '대구은행' },
        { code: '034', name: '광주은행' },
        { code: '035', name: '제주은행' },
        { code: '037', name: '전북은행' },
        { code: '039', name: '경남은행' },
        { code: '045', name: '새마을금고' },
        { code: '088', name: '신한은행' },
        { code: '090', name: '카카오뱅크' }
      ]
    }
  },
  methods: {
    async onClickLinkAccountEvent () {
      const data = {
        bncd: this.bankCode,
        acno: this.accountNumber
      }
      // 현재는 농협만 지원
      if (this.bankCode !== '011' && this.bankCode !== '012') {
        alert('현재는 농협은행과 농협상호금융만 지원합니다.')
        return false
      }
      const res = await API.linkAccountAPI(
        this.$http,
        this.$env.apiUrl,
        data
      )
      if (res.data.result !== errorcode.SUCCESS) {
        alert(res.data.detail)
        return
      }
      this.$store.commit('saveFinAccount', res.data.data.fin_account)
      const next =
          this.$route.query.next === undefined ? '/' : this.$route.query.next
      this.$router.replace({ path: next }).catch(() => {})
    },
    logout () {
      this.$store.commit('removeUser')
      this.$router.replace({ path: '/login' }).catch(() => {})
    }
  },
  computed: {
    state () {
      if (this.accountNumber.length === 0) return null
      return (
        this.accountNumber.length >= 11 && this.accountNumber.length < 16
      )
    },
    invalidFeedback () {
      if (this.accountNumber.length >= 16) {
        return '계좌번호는 최대 15자리 입니다.'
      } else {
        return '계좌번호는 최소 11자리 입니다.'
      }
    }
  }
}
</script>
<style scoped>
  .font-size {
    font-size: 14px !important;
    white-space: nowrap;
  }
</style>
