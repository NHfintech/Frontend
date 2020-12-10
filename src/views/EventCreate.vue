<template>
  <div class="bg-unset" style="min-height:100vh">
    <div class="d-block py-3 pl-4 text-left">
      <router-link to="/">  <b-icon icon="arrow-left"  variant="dark" scale="2"></b-icon></router-link>
    </div>
    <div>
      <div class="col-12 py-1">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="file-check-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-select
            v-model="category"
            :options="options"
          ></b-form-select>
        </b-input-group>
      </div>
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
          ></b-form-input>
          <b-button v-b-modal.modal-prevent-closing>검색</b-button>
          <b-modal
            id="modal-prevent-closing"
            ref="modal"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
          >
            <vue-daum-postcode/>
          </b-modal>

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
      <div v-if="category==='wedding'">
        <div class="col-12 py-1">
          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="geo-alt-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="partner"
              type="text"
              placeholder="신부/신랑"
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="col-12 py-1">
          <b-input-group class="mb-2">
            <b-form-input
              v-model="myFather"
              type="text"
              placeholder="내 아빠"
            ></b-form-input>
          </b-input-group>
          <b-input-group class="mb-2">
            <b-form-input
              v-model="myMother"
              type="text"
              placeholder="내 엄마"
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="col-12 py-1">
          <b-input-group class="mb-2">
            <b-form-input
              v-model="urFather"
              type="text"
              placeholder="니 아빠"
            ></b-form-input>
          </b-input-group>
          <b-input-group class="mb-2">
            <b-form-input
              v-model="urMother"
              type="text"
              placeholder="니 엄마"
            ></b-form-input>
          </b-input-group>
        </div>
      </div>
      <div v-if="category==='funeral'">
        <b-form-tags
          v-model="eventAdmin"
          no-outer-focus
          class=" col-12 py-1 px-3 border-0 bg-unset"
        >
          <template
            v-slot="{ tags, inputAttrs, inputHandlers, addTag, removeTag }"
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
                <b-button
                  @click="removeTag(tag)"
                  variant="link"
                  size="sm"
                  :aria-controls="
                    `my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`
                  "
                  >remove
                </b-button>
              </b-card>
            </ul>
          </template>
        </b-form-tags>
      </div>
    </div>
    <button class="btn btn-block col-11 ml-3" v-on:click="onClickCreateEvent">
      Create Event
    </button>
  </div>
</template>
<script>
import Vue from 'vue'
import API from '../components/API'
import moment from 'moment'
import VueDaumPostcode from 'vue-daum-postcode'

Vue.use(VueDaumPostcode)

export default {
  data () {
    return {
      category: null,
      title: '',
      location: '',
      body: '',
      eventAdmin: [],
      invitationUrl: '',
      eventDatetime: '시간',
      eventAdminCount: 1,
      options: [
        { text: '종류', value: null, disabled: true },
        { text: '결혼', value: 'wedding' },
        { text: '장례', value: 'funeral' }
      ],
      myMother: '',
      myFather: '',
      urMother: '',
      urFather: '',
      partner: ''
    }
  },
  methods: {
    async onClickCreateEvent () {
      const commonData = {
        category: this.category,
        title: this.title,
        location: this.location,
        body: this.body,
        invitationUrl: this.invitationUrl,
        eventDatetime: moment(this.eventDatetime).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      }
      let data = ''
      if (this.category === 'wedding') {
        data = {
          myFather: this.myFather,
          myMother: this.myMother,
          urFather: this.urFather,
          urMother: this.urMother,
          partner: this.partner
        }
      } else if (this.category === 'funeral') {
        data = {
          eventAdmin: this.convertEventAdmin()
        }
      }
      data = { ...commonData, ...data }
      const res = await API.createEventAPI(
        this.$http,
        this.$env.apiUrl,
        data
      )
      if (res.data.result !== 0) {
        alert(res.data.detail)
        return
      }
      this.$router
        .replace({ path: '/event/' + res.data.data.id })
        .catch(() => {})
    },
    onClickCancelEvent () {
      this.$router.replace({ path: '/' }).catch(() => {})
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
    }
  }
}
</script>
<style scoped>
  .bg-unset {
    background-color: #FCF3F7;
  }
</style>
