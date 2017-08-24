<template>
  <transition name="login">
    <div class="no-login" >
      <img class="logo" src="../../assets/dfhon-logo.jpg"/>
      <div class="login-input" >
        <input class="phone-input" type="text" maxlength="30" v-model="loginInfo.userName" placeholder="邮箱/用户名" />
      </div>
      <div class="login-input">
        <input class="pwd-input" type="password"  v-model="loginInfo.password" placeholder="密码"/>
      </div>
      <div class="submit-login" @click="submitLogin" ref="submitLogin">登录</div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  import { addClass, removeClass } from 'common/js/dom'
  import { login } from 'api/user-api'
  import md5 from 'md5'
  import {setCache, getCache} from 'common/js/localStorage'
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        loginInfo: {
          userName: '',
          password: '',
          kefuAccount: ''
        },
        submitFlag: false
      }
    },
    created () {
      if (getCache('userLogin')) {
        this.$router.push({
          path: `/user`
        })
      }
    },
    methods: {
      submitLogin () {
        if (!this.submitFlag) {
          this.submitFlag = true
          this.loginInfo.password = md5(this.loginInfo.password).substr(8, 16)
          addClass(this.$refs.submitLogin, 'shadow')
          login(this.loginInfo).then((res) => {
            if (res.Success) {
              setCache('userLogin', JSON.stringify(res.Data[0]))
              this.setsUerInfo(res.Data[0])
              this.$router.push({
                path: `/user`
              })
            }
            Toast(res.Msg)
            this.submitFlag = false
            removeClass(this.$refs.submitLogin, 'shadow')
          })
        }
      },
      ...mapMutations({
        setsUerInfo: 'SET_USER_INFO'
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .login-enter-active, .login-leave-active
    transition: all .3s
  .login-enter, .login-leave-to
    transform: translate3d(100%, 0, 0)
  .no-login
    position fixed
    top 0
    bottom 0
    z-index 99
    width 3.75rem
    height 100%
    background-color $color-background
    .logo
      width .67rem
      display block
      margin .35rem auto
    .login-input
      width 2.7rem
      height 0.55rem
      border-bottom 1px solid #ebebeb
      margin 0 auto
      display flex
      justify-content space-between
      align-items center
      box-sizing border-box
      .phone-input,.pwd-input
        width 100%
        height 0.5rem
        line-height .5rem
        border 0
        outline none
        color $text-color-a4
      .get-code
        width .9rem
        height .25rem
        border-radius .25rem
        background-color $text-color-theme
        text-align center
        line-height .25rem
        font-size $font-size-small
        color $color-background
      .phone-input::placeholder
        color $text-color-a4
      .pwd-input::placeholder
        color $text-color-a4
    .submit-login
      width 2.9rem
      height .43rem
      margin .42rem auto 0 auto
      border-radius .32rem
      background-color $text-color-theme
      text-align center
      line-height .43rem
      color $color-background
      font-size $font-size-large
      box-shadow: 2px 5px 3px #d9d9d9;
    .login-type
      width 2.8rem
      margin 0 auto
      display flex
      justify-content space-between
      align-items center
      font-size $font-size-large
      color $text-color-theme
      padding .1rem 0 .2rem 0
    p
      text-align center
      color $text-color-a4
      font-size $font-size-large
      margin .5rem auto
    .other-login
      width 2.7rem
      margin 0 auto
      display flex
      justify-content space-between
      height 1.3rem
      font-size $font-size-medium-x
      color $text-color-a4
      div
        width .5rem
        text-align center
        img
          width .5rem
          margin-bottom .1rem

</style>

