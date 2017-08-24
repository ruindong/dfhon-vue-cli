<template>
  <div class="slider-banner">
    <mt-swipe :auto="5000" :prevent='true'>
        <mt-swipe-item v-for="item in slideData" :key="item.Id">
          <img width="100%" :src="item.PicUrl"/>
        </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script type="text/ecmascript-6">
  import { sliderData } from 'api/index-api'
  import { Swipe, SwipeItem } from 'mint-ui'

  export default {
    data () {
      return {
        slideData: []
      }
    },
    created () {
      this._slideBanner()
    },
    methods: {
      _slideBanner () {
        sliderData().then((res) => {
          this.slideData = res.Data
        })
      }
    },
    components: {
      mtSwipe: Swipe, mtSwipeItem: SwipeItem
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slider-banner
    width 3.75rem
    height 2.45rem

</style>
