<template>
  <div>
     <vue-qrcode v-bind:value="transferUrl" />
  </div>
</template>

<script>
import VueQrcode from 'vue-qrcode'
export default {
  data () {
    return {
      transferUrl: 'naver.com'
    }
  },
  components: {
    VueQrcode
  }
}
</script>
