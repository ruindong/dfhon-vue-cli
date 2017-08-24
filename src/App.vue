<template>
  <div id="app">
    <router-view></router-view>
    <navBar></navBar>
  </div>
</template>

<script type="text/ecmascript-6">
  import navBar from 'components/navBar/navBar'
  import FontInit from 'common/js/base'
  export default {
    data () {
      return {}
    },
    mounted () {
      FontInit()
      setTimeout(() => {
        window.addEventListener('resize', () => {
          FontInit()
        })
      }, 20)
    },
    created () {
      FontInit()
    },
    methods: {
//      routeChange (url) {
//        console.log(url)
//        if (url.name !== 'home' || url.name !== 'mall' || url.name !== 'post' || url.name !== 'messages' || url.name !== 'hasLogin') {
//          this.navBarShow = false
//        } else {
//          this.navBarShow = true
//        }
//      }
    },
    components: {
      navBar
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .body
    width 100%
    max-width 100%
</style>
