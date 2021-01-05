<template>
  <div id="app" :class="{'pc':pc}">
    <div class="main-panel">
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      pc: false
    }
  },
  methods: {
    device_check () {
    // 디바이스 종류 설정
      const pcDevice = 'win16|win32|win64|mac|macintel'

      // 접속한 디바이스 환경
      const thisDevice = navigator.platform
      console.log(thisDevice)
      if (thisDevice) {
        if (pcDevice.indexOf(navigator.platform.toLowerCase()) < 0) {
          console.log('MOBILE')
        } else {
          this.pc = true
          console.log('PC')
        }
      }
    }
  },
  mounted () {
    this.device_check()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Yeon+Sung&display=swap');

#app {
  /* min-height: 100%; */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bg-custom{
  background-color: #f4f3ef;
}
.font-13{
  font-size:13px
}
.font-10{
  font-size:10px
}
.font-11{
  font-size:11px
}
.font-20{
  font-size:20px
}
.font-30{
  font-size:30px
}
.font-60{
  font-size:60px
}
.font-do{
  font-family: 'Nanum Gothic Coding', monospace;
}
.font-na{
  font-family: 'Do Hyeon', sans-serif;
}
.font-ye{
  font-family: 'Yeon Sung', cursive;
}
.text-pink{
  color: rgb(222, 144, 144);
}
.text-main-pink{
  color: rgb(253, 234, 220);
}
.bg-main-pink{
  background-color: rgb(253, 234, 220) !important;
}
.font-spacing-1{
  letter-spacing: -1px;
}
.bg-custom-light{
  background:rgb(255, 255, 255) !important;
}
.bg-custom-pink{
  background: rgba(224, 142, 177, 0.3) !important
}
.bg-custom-gray{
  background: #777 !important
}
.bg-pink{
  background-color: rgba(224, 142, 177, 0.10 ) !important
}
.bg-gray{
  background-color: rgba(30,30,30, 0.03 ) !important
}
.border-pink{
  border-color: rgb(222, 144, 144) !important
}
.btn-pink{
  background-color: rgb(222, 144, 144) !important;
  border-color: rgb(222, 144, 144);
  color: #FFFFFF;
  opacity: 1;
  filter: alpha(opacity=100);
}
.content{
  min-height:100vh !important
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}

@media (min-width: 990px) {
  .pc {
    width: 360px;
    height: 640px;
  }

  .main-panel {
    width: 100% !important;
  }

  .main-panel > .content {
    padding: 0 !important;
  }
}
</style>
