<template>
  <div class="no-login">
    <img class="logo" src="../../assets/dfhon-logo.jpg"/>
    <div class="login-input">
      <input class="phone-input" v-model="phone" placeholder="手机号码"  maxlength="11" style="width: 100%"/>
    </div>
    <div class="login-input">
      <input class="pwd-input" v-model="code" placeholder="验证码"/>
      <div class="get-code" @click="geCode">{{getCodeText}}</div>
    </div>
    <div class="submit-login" @click="submitLogin">登录</div>
    <div class="login-type">
      <div @click="userNameLogin">帐号登录</div>
      <div>专家医院入驻</div>
    </div>
    <p>--其他方式登录--</p>
    <div class="other-login">
      <div>
        <img src="../../assets/weib.png"/>
        <span>微博</span>
      </div>
      <div>
        <img src="../../assets/QQ.png"/>
        <span>微信</span>
      </div>
      <div>
        <img src="../../assets/weix.png"/>
        <span>QQ</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {checkPhone} from 'common/js/format'
  import {GetPhoneCode, GetPhoneLogin} from 'api/user-api'
  import { Toast } from 'mint-ui'
  import {setCache} from 'common/js/localStorage'
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        phone: '',
        code: '',
        getCodeText: '获取验证码',
        flag: false,
        submitFlag: false
      }
    },
    created () {

    },
    methods: {
      geCode () {
        if (!this.flag && checkPhone(this.phone)) {
          this.flag = true
          const param = {
            mobile: this.phone
          }
          GetPhoneCode(param).then((res) => {
            console.log(res)
            this.textChange()
            Toast(res.Msg)
          })
        } else if (this.getCodeText === '获取验证码') {
          Toast('请输入正确的手机号')
        }
      },
      textChange () {
        var textMark = this.getCodeText
        var oneMin = 60
        var clock = setInterval(() => {
          oneMin = oneMin - 1
          this.getCodeText = '重新发送(' + oneMin + 's)'
          if (oneMin === 1) {
            this.getCodeText = textMark
            clearTimeout(clock)
            this.flag = false
          } else {
            this.flag = true
          }
        }, 1000)
      },
      submitLogin () {
        this.phoneLogin()
      },
      phoneLogin () {
        if (this.submitFlag) {
          return
        }
        this.submitFlag = true
        const params = {
          phoneNum: this.phone,
          code: this.code,
          inviteCode: '',
          kefuAccount: ''
        }
        GetPhoneLogin(params).then((res) => {
          this.submitFlag = false
          Toast(res.Msg)
          console.log(res)
          if (res.Success) {
            setCache('userLogin', JSON.stringify(res.Data[0]))
            this.setsUerInfo(res.Data[0])
          }
        })
      },
      userNameLogin () {
        this.$router.push({
          path: `/userNameLogin`
        })
      },
      ...mapMutations({
        setsUerInfo: 'SET_USER_INFO'
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
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
        width 1.8rem
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
