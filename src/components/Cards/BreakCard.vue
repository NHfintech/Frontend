<template>
  <div class="container-fluid font-na" >
    <div class="row col-12 no-gutters border-bottom">
      <div class="col-6 text-left mt-2 mb-1"><span class="font-20">{{name}}</span>
        <div class="font-13"> {{event}}</div>
      </div>
      <div class="col-6 text-right">
        <div v-if="plusmoney" class="h5 mt-2 mb-1 text-primary">
          + {{plusmoney}} 원
        </div>
        <div v-if="minusmoney" class="h5 mt-2 mb-1 text-danger">
          - {{minusmoney}} 원
        </div>
        <div class="text-secondary font-13">
          {{date}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'break-card',
  props: {
    name: String,
    plusmoney: Number,
    minusmoney: Number,
    date: String,
    event: String
  }
}
</script>
<style scoped>
  .color-blue{
    color: #B8D7FF;
  }
</style>
