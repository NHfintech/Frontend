<template>
  <div>
    <div class="container-fluid">
      <div class="text-right justify-content-between mt-1">
        <div class="row no-gutters">
          <b-input-group class="col-10">
            <b-form-input class="font-15 py-0 h-auto " v-model="keyword" :class="{'flex-grow-0 p-0 border-0':search}"></b-form-input>
            <template #append>
              <button class="btn p-1 mx-1 bg-white border-0 text-dark"><b-icon icon="search" aria-hidden="true" @click="search=!search"></b-icon></button>
            </template>
          </b-input-group>
          <b-dropdown size="lg" class="btn col-2 p-0 bg-white border-0 text-dark" variant="link" toggle-class="text-decoration-none p-0" no-caret>
            <template #button-content >
              <button class="border-0 p-0 bg-white" ><b-icon icon="sort-down" aria-hidden="true"></b-icon></button>
            </template>
            <b-dropdown-item disabled>오름차순 정렬</b-dropdown-item>
            <b-dropdown-item @click="sortkey='timeASC'" >시간</b-dropdown-item>
            <b-dropdown-item @click="sortkey='nameASC'" >이름</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item disabled>내림차순 정렬</b-dropdown-item>
            <b-dropdown-item @click="sortkey='timeDESC'" >시간</b-dropdown-item>
            <b-dropdown-item @click="sortkey='nameDESC'" >이름</b-dropdown-item>
          </b-dropdown>

        </div>
      </div>
      <div class="card mt-1 border-top">
        <div
          class="col-md-6 col-xl-3"
          v-for="stats in searchList"
          :key="stats.id"
        >
          <div>
            <div>
              <break-card
              :name="stats.title"
              :minusmoney="stats.money"
              :date="stats.transfer_datetime"
            />
            </div>
          </div>
        </div>
      </div>
        <div class="col-md-6 col-xl-3 text-right ">
          <div>
            <b-button v-b-modal.modal-prevent-closing>수기로 추가하기</b-button>
            <b-modal
              id="modal-prevent-closing"
              ref="modal"
              title="Submit Your Name"
              @show="resetModal"
              @hidden="resetModal"
              @ok="handleOk"
            >
              <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                  label="이름"
                  label-for="name-input"
                >
                  <b-form-input
                    id="name-input"
                    v-model="directInputSenderName"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="금액"
                  label-for="name-input"
                >
                  <b-form-input
                    id="name-input"
                    v-model="directInputAmount"
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
      directInputSenderName: '',
      search: true,
      keyword: '',
      searchList: [],
      sortkey: ''
    }
  },
  methods: {
    // error 남 테스트용
    async fetchBreakdownList () {
      const res = await API.getMyBreakdownAPI(this.$http, this.$env.apiUrl)
      if (res.data.data.length) {
        this.breakdownList = res.data.data
      }
      this.searchList = this.breakdownList
    },
    async onClickDirectInputEvent (data) {
      const res = await API.createBreakdownAPI(
        this.$http,
        this.$env.apiUrl,
        data
      )
      if (res !== 0) {
        alert(res.data.detail)
        return
      }
      this.fetchBreakdownList()
    },
    async onClickDeleteBreakdownEvent (breakdownId) {
      const res = await API.deleteBreakdownAPI(
        this.$http,
        this.$env.apiUrl,
        breakdownId
      )
      if (res !== 0) {
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
        money: this.directInputAmount
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
  },
  watch: {
    keyword: function (val) {
      if (val.trim() === '') {
        this.searchList = this.breakdownList
      } else {
        this.searchList = this.breakdownList.filter((b) => {
          return b.name.includes(this.keyword)
        })
      }
    },
    sortkey: function (val) {
      switch (val) {
        case 'timeASC':
          this.searchList = this.breakdownList.sort((a, b) => {
            return a.transfer_datetime < b.transfer_datetime ? -1 : a.transfer_datetime > b.transfer_datetime ? 1 : 0
          })
          break
        case 'timeDESC':
          this.searchList = this.breakdownList.sort((b, a) => {
            return a.transfer_datetime < b.transfer_datetime ? -1 : a.transfer_datetime > b.transfer_datetime ? 1 : 0
          })
          break
        case 'nameASC':
          this.searchList = this.breakdownList.sort((a, b) => {
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0
          })

          break
        case 'nameDESC':
          this.searchList = this.breakdownList.sort((b, a) => {
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0
          })
          break

        default:
          break
      }
    }
  }
}
</script>
