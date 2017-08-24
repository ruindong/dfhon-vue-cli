<template>
    <div class="mall-page">
      <shop></shop>
      <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
  import shop from 'components/mall/shop'
  export default {
    data () {
      return {}
    },
    created () {

    },
    methods: {},
    components: {
      shop
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 .mall-page
   position relative
</style>
