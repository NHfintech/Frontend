<template>
  <div>
    <b-navbar type="light" class="bg-custom">
      <b-navbar-nav>
        <b-nav-item href="/">이벤트</b-nav-item>
        <b-nav-item href="/breakdown">송금 내역</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
  // methods: {
  //   g () {
  //     console.log
  //   }
  // }
}
</script>
