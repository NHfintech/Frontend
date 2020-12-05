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
      transferUrl: `${this.$env.hostUrl}/fin/transfer/${this.$route.params.hash}`
    }
  },
  components: {
    VueQrcode
  }
}
</script>
