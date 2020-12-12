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
            :minute-increment="5"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <input
                placeholder="시간"
                class="border-0 d-block"
                id="eventDatetime"
                :value="inputValue"
                v-on="inputEvents"
                autocomplete="off"
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
            required
            v-model="title"
            type="text"
            placeholder="타이틀"
            :state="title?true:null"
          ></b-form-input>
        </b-input-group>
      </div>
      <div class="col-12 py-1">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="file-earmark-text-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-textarea v-model="body" placeholder="내용" :state="body?true:null"></b-form-textarea>
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
            <b-icon icon="link45deg"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="invitationUrl"
            type="text"
            placeholder="외부링크"
          ></b-form-input>
        </b-input-group>
      </div>
      <div v-if="category==='wedding'">
      <div>
        <div class="hr-sect font-20 font-do font-weight-bolder">전화번호</div>
      </div>
        <div class="col-12 py-1">
          <b-input-group class="mb-2" v-if="self!=='groom'&&self!=='bride'">
            <b-input-group-prepend is-text>
              <b-icon icon="flower1"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              value="나는 누구인가요?"
              type="text"
              class="h-auto"
              disabled
            ></b-form-input>
            <b-form-radio-group
              class="p-0 border-1 border-info btn-pink"
              v-model="self"
              :options="optionsSelf"
              size="sm"
              button-variant='outline-dark'
              name="buttons-1"
              buttons
            ></b-form-radio-group>
            </b-input-group>
          <b-input-group class="mb-2" v-else>
            <b-input-group-prepend is-text>
              <b-icon icon="flower1"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="partner"
              type="text"
              class="h-auto"
              :placeholder="self=='groom'?'신부 번호' :'신랑 번호'"
            ></b-form-input>
            <b-input-group-append>
            <b-button variant="pink" @click="self=''" ><b-icon scale='1.6' icon="arrow-clockwise"></b-icon></b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
        <div v-if="self=='groom'||self=='bride'">
          <div class="col-12 py-1">
            <b-input-group class="mb-2">
              <b-input-group-prepend v-if="self=='groom'" is-text>
                신랑측
              </b-input-group-prepend>
              <b-input-group-prepend v-else is-text>
                신부측
              </b-input-group-prepend>
              <b-form-input
                v-model="myFather"
                type="text"
                placeholder="부"
              ></b-form-input>
              <b-form-input
                v-model="myMother"
                type="text"
                placeholder="모"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-12 py-1">
            <b-input-group class="mb-2">
              <b-input-group-prepend v-if="self=='bride'" is-text>
                신랑측
              </b-input-group-prepend>
              <b-input-group-prepend v-else is-text>
                신부측
              </b-input-group-prepend>
              <b-form-input
                v-model="urFather"
                type="text"
                placeholder="부"
              ></b-form-input>
              <b-form-input
                v-model="urMother"
                type="text"
                placeholder="모"
              ></b-form-input>
            </b-input-group>
          </div>
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
              class="list-unstyled flex-wrap mb-0"
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
                body-class="py-1 pr-2 pl-4 text-nowrap"
              >
                <strong class="col-8 text-overdot">{{ tag }}</strong>
                <b-button
                  @click="removeTag(tag)"
                  variant="link"
                  size="sm"
                  class="col-4"
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
    <button class="btn btn-block col-11 ml-3 border-dark btn-pink" v-on:click="onClickCreateEvent">
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
      self: '',
      title: '',
      location: '',
      locationDetail: '',
      body: '',
      eventAdmin: [],
      invitationUrl: '',
      eventDatetime: '시간',
      eventAdminCount: 1,
      result: { jibunAddress: '', roadAddress: '', userSelectedType: '' },
      options: [
        { text: '종류', value: null, disabled: true },
        { text: '결혼', value: 'wedding' },
        { text: '장례', value: 'funeral' }
      ],
      optionsSelf: [
        { text: '신랑', value: 'groom' },
        { text: '신부', value: 'bride' }
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
        invitationUrl: this.invitationUrl
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
      data = { ...requiredData, ...unrequiredData, ...data }
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
  .text-overdot {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
  input[readonly]
  {
    background-color:#fff;
  }
  .hr-sect {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    margin: 8px 0px;
  }
  .hr-sect::before,
  .hr-sect::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    line-height: 0px;
    margin: 0px 16px;
  }
</style>
