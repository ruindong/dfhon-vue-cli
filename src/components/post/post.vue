<template>
  <scroll :listen-scroll="true"
          :probe-type="3"
          :data="postOfHome"
          :bounce="false"
          @scrollPos = pageScrollY
          class="post-view"
          ref="postView">
    <div ref="postPageDom">
      <div class="hot-post-title">
        <p>一 热门圈子 一</p>
        <img src="../messages/images/more-icon.png" /></div>
      <div class="hot-post-box" v-if="hostLabel.length">
        <scroll-x class="hot-post-slide" :dataLength="hostLabel.length" :momentum="true" :preventDefault="false">
          <div class="hot-label" v-for="item in hostLabel">
            <img :src="item.BigImgUrl"/>
            <p>{{item.LableName}}</p>
          </div>
        </scroll-x>
      </div>
      <div class="post-activity">
        <img src="./images/post-activity-01.png" />
        <img src="./images/post-activity-02.png" />
        <img src="./images/post-activity-03.png" />
      </div>
      <div class="ding-box">
        <div class="ding-item" v-for="item in topPosts">
          <img src="./images/ding-icon.png"/>
          <p>{{item.Title}}</p>
        </div>
      </div>
      <div class="post-type-bar" ref="postType">
        <div class="init active">新鲜</div>
        <div class="init">关注</div>
        <div class="init">最佳方案</div>
      </div>
      <div class="post-box">
        <div v-for="item in postOfHome" class="needsclick">
          <div @click="clickToDetail(item)">
            <div class="post-item" >
              <div class="item-top">
                <img :src="item.UserFace"/>
                <span class="f-c" style="margin: 0 0.1rem">{{item.UserNickName}}</span>
              </div>
              <div class="three-pic">
                <!--<img v-for="(pic, index) in item.ImgUrl" v-if="index<3" :src="pic"/>-->
                <div v-for="(pic, index) in item.ImgUrl" v-if="index<3"
                     class="pic-item" :style="'background-image: url('+pic+')'"></div>
              </div>
              <div class="post-content f-c">
                <p >
                  {{item.DetailContent}}
                </p>
              </div>
              <div class="post-label">
                <img src="../../assets/label-mark.png" />
                <span v-for="lable in item.Lables">{{lable.LableName}}</span>
              </div>
            </div>
            <div class="three-show">
              <div class="icon-text">
                <img src="./images/red-num.png"/>
                <span>{{item.ClickCount}}</span>
              </div>
              <div class="icon-text center-box">
                <img src="./images/comment-num.png"/>
                <span>{{item.ReplyCount}}</span>
              </div>
              <div class="icon-text">
                <img src="./images/zan-num.png"/>
                <span>{{item.GoodCount}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <load-more :loading="loadMore"></load-more>
      <div style="width: 100%;height: .5rem"></div>
    </div>
    <div class="post-type-bar" v-show="xiDingBar"  style="position: fixed;top: 0px;left: 0px">
      <div class="init active">新鲜</div>
      <div class="init">关注</div>
      <div class="init">最佳方案</div>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import {GetHomeRecommendLable, GetTopPosts, GetPostOfHome} from 'api/post-api'
  import scrollX from 'baseComponents/scrollX'
  import scroll from 'baseComponents/scroll'
  import { Indicator } from 'mint-ui'
  import loadMore from 'baseComponents/loadMore'
  export default {
    data () {
      return {
        hostLabel: [],
        topPosts: [],
        postOfHome: [],
        fromId: '',
        scrollY: -1,
        xiDingBar: false,
        loadMore: true,
        loadFlag: false
      }
    },
    created () {

    },
    mounted () {
      setTimeout(() => {
        Indicator.open({
          spinnerType: 'fading-circle'
        })
        this._getHomeRecommendLable()
        this._getTopPosts()
        this._getPostOfHome()
      }, 20)
    },
    methods: {
      _getHomeRecommendLable () {
        GetHomeRecommendLable().then((res) => {
          this.hostLabel = res.Data
        })
      },
      _getTopPosts () {
        GetTopPosts().then((res) => {
          console.log(res)
          this.topPosts = res.Data
        })
      },
      _getPostOfHome () {
        const params = {
          pageSize: 10,
          fromId: this.fromId,
          userId: '',
          direction: 1,
          type: 1
        }
        GetPostOfHome(params).then((res) => {
          for (var k in res.Data) {
            res.Data[k].ImgUrl = res.Data[k].ImgUrl.split(',')
            this.postOfHome.push(res.Data[k])
          }
          this.loadFlag = false
          if (res.Data.length < params.pageSize) {
            this.loadMore = false
            this.loadFlag = true
          } else {
            this.fromId = res.Data[(res.Data.length - 1)].ID
          }
          console.log(res)
          Indicator.close()
        })
      },
      clickToDetail (item) {
        window.location.href = 'http://api.dfhlady.com/page/webapp/#/sharePost/?TableInfoId=' +
          item.TableInfoId + '&PostType=' + item.PostType + '&PostId=' + item.ID
      },
      pageScrollY (pos) {
        this.scrollY = pos.y
      }
    },
    watch: {
      scrollY (y) {
        if (-y >= this.$refs.postType.offsetTop) { // 吸顶
          this.xiDingBar = true
        } else {
          this.xiDingBar = false
        }
        this.pageHeight = this.$refs.postPageDom.clientHeight
        if (-y >= this.pageHeight - window.screen.height - 40) {
          console.log('出底部')
          if (!this.loadFlag) {
            this.loadFlag = true
            setTimeout(() => {
              this._getPostOfHome()
            }, 1000)
          }
        }
      }
    },
    components: {
      scrollX, scroll, loadMore
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .post-view
    position fixed
    top 0px
    bottom 0px
    width 3.75rem
  .hot-post-title
    width 3.75rem
    height .5rem
    background-color $color-background
    border-bottom 1px solid #ebebeb
    display flex
    justify-content center
    align-items center
    padding 0 .15rem
    box-sizing border-box
    img
      width .25rem
    p
      width 3.2rem
      text-align center
      font-size $font-size-medium-x
      color $text-color-4e
  .hot-post-box
    width 3.75rem
    overflow-x hidden
    .hot-post-slide
      height 1.2rem
      border-bottom 1px solid #ebebeb
      padding-left .125rem
      background-color $color-background
      .hot-label
        width .7rem
        height 1.2rem
        padding-right .15rem
        display inline-block
        white-space nowrap
        img
          width .7rem
          margin .1rem 0
        p
          font-size $font-size-small-x
          color $text-color-4e
          text-align center
  .post-activity
    width 3.75rem
    padding .1rem
    box-sizing border-box
    display flex
    justify-content space-between
    background-color $color-background
    img
      width 1.15rem
      height .55rem
  .ding-box
    width 3.75rem
    padding 0 .15rem
    box-sizing border-box
    background-color $color-background
    margin .1rem 0
    .ding-item
      height .4rem
      display flex
      justify-content flex-start
      align-items center
      border-bottom 1px solid #ebebeb
      img
        width .17rem
        height .17rem
        margin-right .1rem
      p
        color $text-color-4e
        font-size $font-size-medium
  .post-type-bar
    width 3.75rem
    height .4rem
    display flex
    justify-content space-around
    border-bottom 1px solid #ebebeb
    background-color $color-background
    .init
      height .4rem
      font-size $font-size-medium-x
      color $text-color-4e
      line-height .4rem
    .active
      font-size $font-size-large
      color $text-red
  .post-item
    width 3.45rem
    padding 0 .15rem
    background-color $color-background
    .f-c
      font-size $font-size-medium-x
      color $text-color-4e
    .item-top
      width 100%
      height .6rem
      display flex
      align-items center
      img
        width .35rem
        height .35rem
        border-radius .35rem
    .three-pic
      display flex
      justify-content space-between
      width 100%
      height 1.1rem
      .pic-item
        width 1.1rem
        height 1.1rem
        background-size cover
        background-position center
    .post-content
      width 100%
      border-bottom 1px solid #ebebeb
      padding  0.1rem 0
      p
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        white-space: normal;
        line-height .22rem
    .post-label
      width 100%
      height .4rem
      display flex
      justify-content flex-start
      border-bottom 1px solid #ebebeb
      align-items center
      img
        width 0.16rem
        height .16rem
        margin-right 0.1rem
      span
        font-size $font-size-medium-x
        color $text-color-theme
        margin-right 0.1rem
  .three-show
    width 100%
    height .4rem
    display flex
    justify-content center
    align-items center
    margin-bottom .1rem
    background-color $color-background
    .center-box
      border-right 1px solid #ebebeb
      border-left 1px solid #ebebeb
    .icon-text
      width 33%
      height .24rem
      display flex
      justify-content center
      align-items center
      img
        width .2rem
        margin-right .05rem
      span
        font-size $font-size-medium
        color $text-color-a4
</style>

