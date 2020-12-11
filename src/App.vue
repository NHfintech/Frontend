<template>
  <div id="app">
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
  data () {
    return {
    }
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
  background-color: rgb(253, 234, 220);
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
.bg-custom-grey{
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
</style>
