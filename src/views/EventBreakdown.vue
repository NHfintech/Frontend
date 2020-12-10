<template>
  <div>
    <div class="container-fluid">
      <div class="card mt-1 border-top">
        <div
          class="col-md-6 col-xl-3"
          v-for="stats in breakdownList"
          :key="stats.id"
        >
          <div>
            <div>
              <break-card
                :name="stats.name"
                :plusmoney="stats.money"
                :date="stats.transfer_datetime"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-xl-3 text-right ">
        <div v-if="userType === 'master'">
          <b-button v-b-modal.modal-prevent-closing-2>수기로 추가하기</b-button>
          <b-modal
            id="modal-prevent-closing-2"
            ref="modal"
            title="Submit Your Name"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
          >
            <form ref="form" @submit.stop.prevent="handleSubmit">
              <b-form-group
                :state="nameState"
                label="이름"
                label-for="name-input"
              >
                <b-form-input
                  id="name-input"
                  v-model="directInputSenderName"
                  :state="nameState"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                :state="nameState"
                label="금액"
                label-for="name-input"
              >
                <b-form-input
                  id="name-input"
                  v-model="directInputAmount"
                  :state="nameState"
                  required
                ></b-form-input>
              </b-form-group>
            </form>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BreakCard from '@/components/Cards/BreakCard.vue'
import API from '../components/API'
export default {
  name: 'event-breakdown',
  props: {
    userType: String
  },
  components: {
    BreakCard
  },
  data () {
    return {
      name: '',
      nameState: null,
      submittedNames: [],
      breakdownList: [],
      directInputAmount: '',
      directInputSenderName: ''
    }
  },
  methods: {
    async fetchBreakdownList () {
      const res = await API.getEventBreakdownAPI(
        this.$http,
        this.$env.apiUrl,
        this.$route.params.id
      )
      this.breakdownList = res.data.data
    },
    async onClickDirectInputEvent (data) {
      const res = await API.createBreakdownAPI(
        this.$http,
        this.$env.apiUrl,
        data
      )
      if (res.data.result !== 0) {
        alert(res.data.detail)
        return
      }
      this.directInputAmount = ''
      this.directInputSenderName = ''
      this.$refs.modal.hide()
      this.fetchBreakdownList()
    },
    async onClickDeleteBreakdownEvent (breakdownId) {
      const res = await API.deleteBreakdownAPI(
        this.$http,
        this.$env.apiUrl,
        breakdownId
      )
      if (res.data.result !== 0) {
        alert(res.data.detail)
        return
      }
      this.fetchBreakdownList()
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal () {
      this.name = ''
      this.directInputSenderName = null
      this.directInputAmount = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      const data = {
        name: this.directInputSenderName,
        money: this.directInputAmount,
        eventId: this.$route.params.id
      }
      this.onClickDirectInputEvent(data)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  },
  mounted () {
    this.fetchBreakdownList()
  }
}
</script>
