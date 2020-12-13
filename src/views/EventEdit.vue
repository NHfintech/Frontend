<template>
  <div class="bg-unset" style="min-height:100vh">
    <div class="d-block py-3 pl-4 text-left">
      <router-link to="/">  <b-icon icon="arrow-left"  variant="dark" scale="2"></b-icon></router-link>
    </div>
    <div>
      <div class="col-12 py-1 ">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="calendar2-date-fill"></b-icon>
          </b-input-group-prepend>
          <vc-date-picker
            v-model="eventDatetime"
            mode="dateTime"
            class="form-control "
          >
            <template v-slot="{ inputValue, inputEvents }">
              <input
                placeholder="시간"
                class="border-0 d-block"
                id="eventDatetime"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </vc-date-picker>
          <!-- </div> -->
        </b-input-group>
      </div>
      <div class="col-12 py-1">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="sticky-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="title"
            type="text"
            placeholder="타이틀"
          ></b-form-input>
        </b-input-group>
      </div>
      <div class="col-12 py-1">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="file-earmark-text-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-textarea v-model="body" placeholder="내용"></b-form-textarea>
        </b-input-group>
      </div>
      <div class="col-12 py-1">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="geo-alt-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="location"
            type="text"
            ref="loc"
            placeholder="위치"
            v-b-modal.modal-prevent-closing
            readOnly
          ></b-form-input>
          <b-modal
            hide-footer
            id="modal-prevent-closing"
            ref="modal"
          >
            <vue-daum-postcode
            @complete=" result = $event;
            result.userSelectedType=='J' ? location=result.jibunAddress : location=result.roadAddress;
            $refs['modal'].hide()
            "
            />
          </b-modal>

        </b-input-group>
      </div>
      <div class="col-12 py-1">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="geo-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="locationDetail"
            type="text"
            placeholder="상세위치"
          ></b-form-input>
        </b-input-group>
      </div>
      <div class="col-12 py-1">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="geo-alt-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="invitationUrl"
            type="text"
            placeholder="URL"
          ></b-form-input>
        </b-input-group>
      </div>
      <b-form-tags
        v-if="category ==='funeral'"
        v-model="eventAdmin"
        no-outer-focus
        class=" col-12 py-1 px-3 border-0 bg-unset"
      >
        <template
          v-slot="{ tags, inputAttrs, inputHandlers, addTag }"
        >
          <b-input-group aria-controls="my-custom-tags-list">
            <b-input-group-prepend is-text>
              <b-icon icon="person-fill"></b-icon>
            </b-input-group-prepend>
            <input
              v-bind="inputAttrs"
              v-on="inputHandlers"
              placeholder="개최자"
              class="form-control"
            />
            <b-input-group-append>
              <b-button @click="addTag()" variant="primary">추가</b-button>
            </b-input-group-append>
          </b-input-group>
          <ul
            id="my-custom-tags-list"
            class="list-unstyled d-inline-flex flex-wrap mb-0"
            aria-live="polite"
            aria-atomic="false"
            aria-relevant="additions removals"
          >
            <b-card
              v-for="tag in tags"
              :key="tag"
              :id="`my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`"
              tag="li"
              class="mt-1 mr-1"
              body-class="py-1 pr-2 text-nowrap pl-4"
            >
              <strong>{{ tag }}</strong>
            </b-card>
          </ul>
        </template>
      </b-form-tags>
    </div>

    <button class="btn btn-block col-11 ml-3" v-on:click="onClickEditEvent">
      Edit Event
    </button>
  </div>
</template>
<script>
import API from '../components/API'
import moment from 'moment'

export default {
  data () {
    return {
      category: '',
      title: '',
      location: '',
      locationDetail: '',
      body: '',
      eventAdmin: [],
      invitationUrl: '',
      eventDatetime: '시간',
      eventAdminCount: 1
    }
  },
  methods: {
    async onClickEditEvent () {
      const requiredData = {
        category: this.category,
        title: this.title,
        location: this.location,
        body: this.body,
        eventDatetime: moment(this.eventDatetime).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      }
      for (const i in requiredData) {
        if (requiredData[i] === '') {
          alert(i + '가 빈칸입니다.')
          return false
        }
      }
      const unrequiredData = {
        locationDetail: this.locationDetail,
        invitationUrl: this.invitationUrl,
        eventAdmin: this.convertEventAdmin()
      }
      const data = { ...requiredData, ...unrequiredData }
      await API.updateEventAPI(this.$http, this.$env.apiUrl, this.$route.params.id, data)
      this.$router.replace({ path: '/event/' + this.$route.params.id }).catch(() => {})
    },
    addEventAdmin () {
      this.eventAdminCount += 1
    },
    convertEventAdmin () {
      const eventAdmin = []
      for (const key in this.eventAdmin) {
        eventAdmin.push(this.eventAdmin[key])
      }
      return eventAdmin
    },
    convertResponseEventAdmin (responseEventAdmin) {
      for (const rr in responseEventAdmin) {
        this.eventAdmin.push(responseEventAdmin[rr].user_phone)
      }
    },
    async getEvent () {
      const res = await API.getEventAPI(this.$http, this.$env.apiUrl, this.$route.params.id)
      const data = res.data.data
      this.category = data.category
      this.title = data.title
      this.body = data.body
      this.location = data.location
      this.locationDetail = data.location_detail
      this.invitationUrl = data.invitation_url
      this.convertResponseEventAdmin(data.eventAdmin)
      this.eventDatetime = moment(data.event_datetime).add(9, 'hours').toISOString()
    }
  },
  mounted () {
    this.getEvent()
  }
}
</script>
<style scoped>
  .bg-unset {
    background-color: #FCF3F7;
  }
</style>
