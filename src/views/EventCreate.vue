<template>
    <div>
        <h1>create event</h1>
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
          <div class="form-group row" v-for="index in eventAdminCount" :key=index>
            <label v-if="index  == 1" class="col-4 col-form-label" for="eventAdmin">eventAdmin</label>
            <label v-else class="col-4 col-form-label" for="eventAdmin"></label>
            <div class="col-6" >
              <input class="form-control" type="text" v-model="eventAdmin[index]">
            </div>
          </div>
          <div>
            <button v-on:click="addEventAdmin">Add Event Admin</button>
          </div>
        </div>
        <button v-on:click="onclickCreateEvent">
          Create Event
        </button>
    </div>
</template>
<script>
import API from '../components/API'

export default {
  data () {
    return {
      category: '',
      title: '',
      location: '',
      body: '',
      eventAdmin: [],
      startDatetime: '',
      endDatetime: '',
      eventAdminCount: 1
    }
  },
  methods: {
    async onclickCreateEvent () {
      const data = {
        'category': this.category,
        'title': this.title,
        'location': this.location,
        'body': this.body,
        'eventAdmin': this.convertEventAdmin(),
        'startDatetime': this.startDatetime,
        'endDatetime': this.endDatetime
      }
      const res = await API.createEventAPI(this.$http, this.$env.apiUrl, data)
      console.log(res)
    },
    addEventAdmin () {
      this.eventAdminCount += 1
    },
    convertEventAdmin () {
      let eventAdmin = []
      for (const key in this.eventAdmin) {
        eventAdmin.push(this.eventAdmin[key])
      }
      console.log(eventAdmin)
      return eventAdmin
    }
  }
}
</script>
