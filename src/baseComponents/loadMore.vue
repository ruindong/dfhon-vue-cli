<template>
    <div>
      <div class="load-more" v-show="loading">
        <img src="../assets/loading.gif"/>
        <span>正在加载更多...</span>
      </div>
      <div class="load-more" v-show="!loading">
        <span>我是有底线的</span>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      loading: true
    },
    data () {
      return {}
    },
    created () {

    },
    methods: {}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .load-more
    width 3.75rem
    height .5rem
    display flex
    justify-content center
    align-items center
    img
      width .25rem
      height .25rem
      margin-right .1rem
    span
      font-size $font-size-medium
      color $text-color-4e
</style>
