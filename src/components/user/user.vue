<template>
  <scroll class="user-scroll" :bounce="false">
    <component v-bind:is="currentView" >
    </component>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import scroll from 'baseComponents/scroll'
  import {getCache} from 'common/js/localStorage'
  import hasLogin from './hasLogin.vue'
  import noLogin from './noLogin.vue'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        currentView: ''
      }
    },
    created () {
      this.checkUserLogin()
    },
    methods: {
      checkUserLogin () {
        if (getCache('userLogin')) {
          this.currentView = hasLogin
        } else {
          this.currentView = noLogin
        }
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    watch: {
      userInfo () {
        this.checkUserLogin()
      }
    },
    components: {
      hasLogin, noLogin, scroll
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .user-scroll
    position fixed
    top 0px
    bottom 0px
    width 3.75rem
</style>
