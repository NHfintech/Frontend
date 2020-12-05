<template>
  <div>
    <div class="form-group row">
      <label class="col-4 col-form-label" for="bank">Bank</label>
      <div class="col-6">
      <select v-model="bankCode">
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
        </select>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-4 col-form-label" for="accountNumber">Account Number</label>
      <div class="col-6">
        <input class="form-control" type="text" v-model="accountNumber">
      </div>
    </div>
    <div>
      <button v-on:click="onClickLinkAccountEvent">계좌 연동하기</button>
    </div>
  </div>
</template>
<script>
import API from '../components/API'

export default {
  data () {
    return {
      accountNumber: '',
      bankCode: ''
    }
  },
  methods: {
    async onClickLinkAccountEvent () {
      const data = {
        'bncd': this.bankCode,
        'acno': this.accountNumber
      }
      const res = await API.linkAccountAPI(this.$http, this.$env.apiUrl, data)
      if (res.data.result !== 0) {
        alert(res.data.detail)
        return
      }
      this.$router.replace({ path: '/' }).catch(() => {})
    }
  }
}
</script>
