<template>
  <div>
    <b-navbar type="light" class="bg-custom">
      <b-navbar-nav >
        <b-nav-item class="font-do" href="/">이벤트</b-nav-item>
        <b-nav-item class="font-do" href="/breakdown">송금 내역</b-nav-item>
        <b-nav-item class="font-do" href="/event/participated">참여한 이벤트</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <span class="">{{ $store.state.user.name }}</span>
          </template>
          <b-dropdown-item href="/fin/account">계좌등록</b-dropdown-item>
          <b-dropdown-item @click="logout()">logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.commit('removeUser')
      this.$router.replace({ path: '/login' }).catch(() => {})
    }
  }
}
</script>
