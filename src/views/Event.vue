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
            {{endDatetime}}
          </div>
          <div>
            <button v-on:click="onClickEditEvent">edit</button>
            <button v-on:click="onClickDestroyeEvent">delete</button>
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
      endDatetime: ''
    }
  },
  methods: {
    async getEvent () {
      const res = await API.getEventAPI(this.$http, this.$env.apiUrl, this.$route.params.id)
      const data = res.data.data
      this.title = data.title
      this.body = data.body
      this.location = data.location
      this.endDatetime = moment(data.end_datetime).format('YYYY-MM-DD HH:mm:ss')
    },
    onClickEditEvent () {
      this.$router.replace({ path: '/event/edit/' + this.$route.params.id }).catch(() => {})
    },
    async onClickDestroyeEvent () {
      await API.destroyEventAPI(this.$http, this.$env.apiUrl, this.$route.params.id)
      this.$router.replace({ path: '/' }).catch(() => {})
    }
  },
  mounted () {
    this.getEvent()
  }
}
</script>
