<template>
    <div>
      <table>
        <tr v-for="dd in breakdownList" :key = dd.id>
          <td>{{dd.name}}</td>
          <td>{{dd.money}}</td>
          <td>{{dd.transfer_datetime}}</td>
        </tr>
      </table>
      <input type="text" v-model="directInputSenderName" placeholder="sender">
      <input type="text" v-model="directInputAmount" placeholder="amount">
      <button v-on:click="onClickDirectInputEvent">add</button>
    </div>
</template>
<script>
import API from '../components/API'
export default {
  data () {
    return {
      breakdownList: [],
      directInputAmount: '',
      directInputSenderName: ''
    }
  },
  methods: {
    async fetchBreakdownList () {
      const res = await API.getMyBreakdownAPI(this.$http, this.$env.apiUrl)
      this.breakdownList = res.data.data
    },
    async onClickDirectInputEvent () {
      const data = {
        name: this.directInputSenderName,
        money: this.directInputAmount,
        eventId: this.$route.params.id
      }
      const res = await API.createBreakdownAPI(this.$http, this.$env.apiUrl, data)
      if (res !== 0) {
        alert(res.data.detail)
        return
      }
      this.fetchBreakdownList()
    },
    async onClickDeleteBreakdownEvent (breakdownId) {
      const res = await API.deleteBreakdownAPI(this.$http, this.$env.apiUrl, breakdownId)
      if (res !== 0) {
        alert(res.data.detail)
        return
      }
      this.fetchBreakdownList()
    }
  },
  mounted () {
    this.fetchBreakdownList()
  }
}
</script>
