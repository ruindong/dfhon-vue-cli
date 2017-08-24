<template>
    <div>
      <div class="user-bg">
        <img class="user-face" :src="userInfo.UserFace"/>
        <img v-if="userInfo.Sex==1" class="sex" src="./images/sex1.png"/>
        <img v-if="userInfo.Sex==2" class="sex" src="./images/sex2.png"/>
        <p>{{userInfo.NickName}}</p>
        <div class="three-content">
          <div>
            <p>{{zxb.ZXBCount}}</p>
            <p>虹币</p>
          </div>
          <div>
            <p>{{funs.Count}}</p>
            <p>粉丝</p>
          </div>
          <div>
            <p>{{Attention}}</p>
            <p>关注</p>
          </div>
        </div>
      </div>
      <div class="user-doctor-box">
        <img class="icon" src="./images/user-doctor.png"/>
        <div class="user-doctor-info">
          <p class="title">专属医生</p>
          <p>我是您的专属医生卢医生有任何需求请联系我</p>
          <img class="arrow-r" src="./images/arrow-right.png"/>
        </div>
        <a :href="'tel:'+userInfo.KefuMobile"><img class="phone" src="./images/phone.png"/></a>
      </div>
      <div class="user-item">
        <div>
          <img src="./images/shop-cart.png"/>
          <p>购物车</p>
        </div>
        <div>
          <img src="./images/shop-cart.png"/>
          <p>我的订单</p>
        </div>
        <div>
          <img src="./images/shop-cart.png"/>
          <p>优惠卷</p>
        </div>
      </div>
      <div class="user-bar">
        <span>我的发布</span>
        <img src="./images/arrow-right.png"/>
      </div>
      <div class="user-bar">
        <span>我的问诊</span>
        <img src="./images/arrow-right.png"/>
      </div>
      <div class="user-bar">
        <span>我的收藏</span>
        <img src="./images/arrow-right.png"/>
      </div>
      <div class="user-bar">
        <span>邀请好友</span>
        <img src="./images/arrow-right.png"/>
      </div>
      <div class="user-bar">
        <span>意见反馈</span>
        <img src="./images/arrow-right.png"/>
      </div>
      <div class="user-bar">
        <span>虹生活</span>
        <img src="./images/arrow-right.png"/>
      </div>
      <div class="user-bar">
        <span>设置</span>
        <img src="./images/arrow-right.png"/>
      </div>
      <div class="login-out" @click="loginOut">退出登录</div>
      <div style="width: 100%;height: .5rem;margin-top: .1rem"></div>
    </div>
</template>
<script type="text/ecmascript-6">
  import {getCache, removeCache} from 'common/js/localStorage'
  import {zxb, GetFansCount, GetAttentionCount, Logout} from 'api/user-api'
  import { MessageBox, Toast } from 'mint-ui'
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        userInfo: [],
        zxb: [],
        funs: [],
        Attention: 0
      }
    },
    created () {
      this._getUserInfo()
    },
    methods: {
      _getUserInfo () {
        this.userInfo = JSON.parse(getCache('userLogin'))
        console.log(this.userInfo)
        this._getZxb(this.userInfo.UserId)
        this._getFansCount(this.userInfo.UserId)
        this._getAttentionCount(this.userInfo.UserId)
      },
      _getZxb (userId) {
        const param = {
          userId: userId
        }
        zxb(param).then((res) => {
          this.zxb = res.Data[0]
        })
      },
      _getFansCount (userId) {
        const param = {
          type: 1,
          userId: userId,
          Id: userId
        }
        GetFansCount(param).then((res) => {
          this.funs = res.Data[0]
        })
      },
      _getAttentionCount (userId) {
        const param = {
          type: 0,
          userId: userId
        }
        GetAttentionCount(param).then((res) => {
          this.Attention = res
        })
      },
      loginOut () {
        MessageBox.confirm('确定执行此操作?').then((action) => {
          this._getLogout()
        }).catch(function (response) {

        })
      },
      _getLogout () {
        const param = {
          userId: this.userInfo.UserId
        }
        Logout(param).then((res) => {
          console.log(res)
          Toast(res.Msg)
          if (res.Success) {
            removeCache('userLogin')
            this.setsUerInfo('')
            this.$router.push({
              path: `/home`
            })
          }
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
  .user-bg
    width 100%
    max-width 750px
    height 2.32rem
    background-position center
    background-size cover
    background-image url("./images/user-bg.png")
    padding-top 1px
    position relative
    .user-face
      display block
      width .65rem
      margin .15rem auto
      border-radius .65rem
    .sex
      width .18rem
      position absolute
      top .62rem
      left 2rem
    p
      width 100%
      text-align center
      color $text-color-4e
      font-size $font-size-medium-x
    .three-content
      display flex
      justify-content space-around
      align-items center
      margin-top .2rem
      font-size $font-size-medium
      color $text-color-4e
      p
        line-height .25rem
  .user-doctor-box
    width 3.3rem
    height .94rem
    background-color $color-background
    border-radius 5px
    margin -0.45rem auto
    display flex
    justify-content space-around
    align-items center
    z-index 99
    position relative
    .icon
      width .6rem
      height .6rem
      margin 0 .1rem
    .user-doctor-info
      width 1.4rem
      display flex
      flex-flow column
      position relative
      border-right 1px solid #ebebeb
      padding-right .3rem
      .title
        color $text-color-4e
        font-size $font-size-medium-x
        line-height .24rem
      p
        font-size $font-size-small-x
        color $text-color-bd
        line-height $font-size-large
      .arrow-r
        width .07rem
        position absolute
        right 0.1rem
        top .25rem
    .phone
      width .8rem
  .user-item
    width 3.75rem
    height .92rem
    background-color $color-background
    margin-top .63rem
    margin-bottom .1rem
    display flex
    justify-content space-around
    align-items center
    img
      display block
      width .3rem
      margin 0 auto .07rem auto
    p
      font-size $font-size-medium
      color $text-color-4e
  .user-bar
    width 3.75rem
    height .5rem
    background-color $color-background
    padding 0 .15rem
    box-sizing border-box
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid #ebebeb
    img
      width .07rem
  .login-out
    width 3.45rem
    height .4rem
    margin .1rem auto
    text-align center
    line-height .4rem
    border-radius .4rem
    background-color $text-color-theme
    font-size $font-size-medium
    color $theme-background
</style>
