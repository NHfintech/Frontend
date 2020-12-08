<template>
    <div>
        <h1>edit event</h1>
        <div>
          <div class="form-group row">
            <label class="col-4 col-form-label" for="category">Category</label>
            <div class="col-6">
              <select v-model="category">
                    <option value="marriage">Marriage</option>
                    <option value="funeral">Funeral</option>
                </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-4 col-form-label" for="title">Title</label>
            <div class="col-6">
              <input class="form-control" type="text" v-model="title">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-4 col-form-label" for="body">Body</label>
            <div class="col-6">
              <textarea class="form-control" type="textarea" v-model="body"/>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-4 col-form-label" for="location">Location</label>
            <div class="col-6">
              <input class="form-control" type="text" v-model="location">
            </div>
          </div>
          <!-- <div class="form-group row">
            <label class="col-4 col-form-label" for="body">End Datetime</label>
            <div class="col-6">
              <datetime type="datetime" v-model="endDatetime" use12-hour>{{endDatetime}}</datetime>
            </div>
          </div> -->
          <div class="form-group row" v-for="index in eventAdminCount" :key=index>
            <label v-if="index  == 1" class="col-4 col-form-label" for="eventAdmin">eventAdmin</label>
            <label v-else class="col-4 col-form-label" for="eventAdmin"></label>
            <div class="col-6" >
              <input class="form-control" type="text" v-model="eventAdmin[index]">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-4"></div>
            <button class="col-6" v-on:click="addEventAdmin">Add Event Admin</button>
          </div>
        </div>
        <button v-on:click="onClickEditEvent">
          Edit Event
        </button>
    </div>
</template>
<script>
// import Vue from 'vue'
import API from '../components/API'
import moment from 'moment'
// import Datetime from 'vue-datetime'
// import 'vue-datetime/dist/vue-datetime.css'

// Vue.use(Datetime)

export default {
  data () {
    return {
      category: '',
      title: '',
      location: '',
      body: '',
      eventAdmin: [],
      endDatetime: '',
      eventAdminCount: 1
    }
  },
  methods: {
    async onClickEditEvent () {
      const data = {
        category: this.category,
        title: this.title,
        location: this.location,
        body: this.body,
        eventAdmin: this.convertEventAdmin(),
        startDatetime: moment().format('YYYY-MM-DD HH:mm:ss'),
        endDatetime: moment(this.endDatetime).format('YYYY-MM-DD HH:mm:ss')
      }
      const res = await API.updateEventAPI(this.$http, this.$env.apiUrl, this.$route.params.id, data)
      this.$router.replace({ path: '/event/' + res.data.id }).catch(() => {})
    },
    addEventAdmin () {
      console.log(this.endDatetime)
      this.eventAdminCount += 1
    },
    convertEventAdmin () {
      const eventAdmin = []
      for (const key in this.eventAdmin) {
        eventAdmin.push(this.eventAdmin[key])
      }
      return eventAdmin
    },
    async getEvent () {
      const res = await API.getEventAPI(this.$http, this.$env.apiUrl, this.$route.params.id)
      const data = res.data.data
      this.category = data.category
      this.title = data.title
      this.body = data.body
      this.location = data.location
      // this.eventAdmin = data.event_admin
      this.endDatetime = moment(data.end_datetime).toISOString()
    }
  },
  mounted () {
    this.getEvent()
  }
}
</script>
