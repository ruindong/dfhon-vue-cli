<template>
  <div class="navBar" @click="navBarClick" ref="navBarClick">
    <router-link tag="div" class="tab-item animated " to="/home">
      <div class="nav-icon index-nav-bg "></div>
    </router-link>
    <router-link tag="div"  class="tab-item animated" to="/mall">
      <div class="nav-icon shop-nav-bg" ></div>
    </router-link>
    <router-link tag="div"  class="tab-item animated" to="/post">
      <div class="nav-icon post-nav-bg" ></div>
    </router-link>
    <router-link tag="div"  class="tab-item animated" to="/messages">
      <div class="nav-icon messages-nav-bg"></div>
    </router-link>
    <router-link tag="div"  class="tab-item animated" to="/user">
      <div class="nav-icon user-nav-bg"></div>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
  import { addClass, removeClass } from 'common/js/dom'
  export default {
    data () {
      return {}
    },
    created () {},
    methods: {
      navBarClick () {
        setTimeout(() => {
          const child = this.$refs.navBarClick.children
          for (var k = 0; k < 5; k++) {
            if (child[k].className.indexOf('router-link-active') > 0) {
              if (child[k].className.indexOf('bounceIn') > 0) {
                return 0
              }
              addClass(child[k], 'bounceIn')
            } else {
              removeClass(child[k], 'bounceIn')
            }
          }
        }, 20)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  /*@import "~animate.css"*/
  @import "~common/css/animate.css"
  .navBar
    max-width 750px;
    position fixed
    bottom 0px;
    display flex
    width 100%
    height 0.5rem
    justify-content space-around
    align-items center
    border-top 1px solid #ebebeb
    background-color $color-background
    .tab-item
      width 25%
    .index-nav-bg
      background-image url("./index-default.png")
    .shop-nav-bg
      background-image url("./shop-default.png")
    .post-nav-bg
      background-image url("./post-default.png")
    .messages-nav-bg
      background-image url("./messages-default.png")
    .user-nav-bg
      background-image url("./user-default.png")
    .nav-icon
      width 0.64rem
      height 0.5rem
      background-size cover
      background-position center
      margin auto
    .router-link-active
      .index-nav-bg
        background-image url("./index-active.png")
      .shop-nav-bg
        background-image url("./shop-active.png")
      .post-nav-bg
        background-image url("./post-active.png")
      .messages-nav-bg
        background-image url("./messages-active.png")
      .user-nav-bg
        background-image url("./user-active.png")
</style>

