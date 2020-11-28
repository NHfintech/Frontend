<template>
  <div id="app">
    <router-view/>
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
#app {
  /* min-height: 100%; */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.font-13{
  font-size:13px
}
.font-10{
  font-size:10px
}
.font-do{
  font-family: 'Do Hyeon', sans-serif;
}
.bg-custom-light{
  background:rgb(234, 234, 234);
}
</style>
