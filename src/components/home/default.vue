<template>
  <scroll class="home-page"
          :listen-scroll="true"
          :probe-type="3"
          :data="postList"
          :bounce="false"
          @scrollPos = homeScrollY>
    <div class="page-body-scroll">
      <div style="width: 3.75rem;height: 6.68rem">
        <slider></slider>
        <div class="nav-item">
          <div>
            <img src="./images/index-icon-01.png"/>
            <p>整容模拟</p>
          </div>
          <div>
            <img src="./images/index-icon-02.png"/>
            <p>医生查询</p>
          </div>
          <div>
            <img src="./images/index-icon-03.png"/>
            <p>医院查询</p>
          </div>
          <div>
            <img src="./images/index-icon-04.png"/>
            <p>一元美购</p>
          </div>
        </div>
        <!--热广告-->
        <div class="hot-ad " v-if="hotAdsData.length">
          <div class="left">
            <a :href="hotAdsData[0].Share_Url"><img class="needsclick" :src="hotAdsData[0].PicUrl"/></a>
          </div>
          <div class="right">
            <a :href="hotAdsData[1].Share_Url"><img class="bor-bottom needsclick" :src="hotAdsData[1].PicUrl"/></a>
            <a :href="hotAdsData[2].Share_Url"><img class="needsclick" :src="hotAdsData[2].PicUrl"/></a>
          </div>
        </div>
        <img class="showDoctorData" :src="showDoctorData.MainImgUrl" style="margin-bottom:0.1rem"/>
      </div>
      <!--帖子type选泽栏-->
      <!--<div :class="xiDingTrue==true?'choose-nav-bar':''"></div>-->
      <div ref="chooseNavBar">
        <div class="choose-nav-bar" v-if="postTypeData.length">
          <scroll-x class="scroll-bar" :getData="postTypeData" :preventDefault="false" ref="scrollBar">
            <div class="type-item"
                 v-for="(item, index) in postTypeData" @click="clickLabelActive(item.LableId,index)"
                 :class="labelActive==item.LableId?'active':''">
              {{item.LableName}}
            </div>
          </scroll-x>
          <div class="updata-data">
            <img src="./images/updata-icon.png"/>
          </div>
        </div>
      </div>
      <div class="page-slider">
        <div class="post-content" v-for="post in postList">
          <p>{{post.Title}}</p>
          <div class="pic-box">
            <div v-for="(picUrl, index) in post.ImgUrl2">
              <img v-lazy="post.ImgUrl2[index]"/>
            </div>
          </div>
          <div class="post-mark">
            <img src="../../assets/label-mark.png"/>
            <span v-for="lable in post.Lables">{{lable.LableName}}</span>
          </div>
        </div>
        <div class="show-more-container">
          <div class="show-more-button">查看更多商品</div>
        </div>
      </div>
      <div style="width: 100%;height: 0.5rem;"></div>
    </div>
    <div :class="selectBarBg == false?'bg2 index-select-bar':'bg index-select-bar'" ref="selectBar">
      <div class="select-bar">
        <img src="../../assets/select-icon.png"/>
        <span class="text-c-f">搜索项目、医生、医院、帖子</span>
      </div>
    </div>
    <div class="pos-flex-top" v-show="xiDingTrue">
      <div class="choose-nav-bar" v-if="postTypeData.length">
        <scroll-x class="scroll-bar" :getData="postTypeData" :preventDefault="false" ref="scrollBar">
          <div class="type-item"
               v-for="(item, index) in postTypeData" @click="clickLabelActive(item.LableId,index)"
               :class="labelActive==item.LableId?'active':''">
            {{item.LableName}}
          </div>
        </scroll-x>
        <div class="updata-data">
          <img src="./images/updata-icon.png"/>
        </div>
      </div>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import slider from './slider.vue'
  import { Indicator } from 'mint-ui'
  import { getHotAds, showDoctor, postType, indexPost } from 'api/index-api'
  import scrollX from 'baseComponents/scrollX'
  import scroll from 'baseComponents/scroll'
  import { mapGetters } from 'vuex'
  import {getCache} from 'common/js/localStorage'
  export default {
    data () {
      return {
        hotAdsData: [],
        showDoctorData: [],
        postTypeData: [],
        labelActive: null,
        flag: false,
        postList: [],
        selectBarBg: false,
        xiDingTrue: false,
        scrollY: -1
      }
    },
    created () {
    },
    mounted () {
      setTimeout(() => {
        this._getHotAds() // 获取热门广告
        this._showDoctor() // 获取医生
        this._postType((typeId) => {  // 获取type
          this._getPostList(typeId)
        })
        this.chooseNavBarOffsetTop = this.$refs.chooseNavBar.offsetTop
        this.selectBarH = this.$refs.selectBar.clientHeight
      }, 20)
    },
    methods: {
      _getHotAds () {
        getHotAds().then((res) => {
          this.hotAdsData = res.Data
        })
      },
      _showDoctor () {
        showDoctor().then((res) => {
          this.showDoctorData = res
        })
      },
      _postType (callbackFun) {
        const param = {
          userId: getCache('userLogin') ? JSON.parse(getCache('userLogin')).UserId : ''
        }
        postType(param).then((res) => {
          this.postTypeData = res.Data
          this.labelActive = res.Data[0].LableId
          callbackFun(res.Data[0].LableId)
        })
      },
      clickLabelActive (id) {
        this.labelActive = id
        this._getPostList(id)
      },
      _getPostList (id) {
        Indicator.open({
          spinnerType: 'fading-circle'
        })
        indexPost(id).then((res) => {
          for (var k in res.Data) {
            res.Data[k].ImgUrl2 = res.Data[k].ImgUrl2.split(',')
          }
          this.postList = res.Data
          Indicator.close()
        })
      },
      homeScrollY (pos) {
        this.scrollY = pos.y
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    watch: {
      userInfo (data) {
        console.log(data)
      },
      scrollY (newY) {
        if (-newY > 100) {
          this.selectBarBg = true
        } else {
          this.selectBarBg = false
        }
        if (-newY > (this.$refs.chooseNavBar.offsetTop - this.$refs.chooseNavBar.clientHeight)) {
          this.xiDingTrue = true
        } else {
          this.xiDingTrue = false
        }
      }
    },
    components: {
      slider, scrollX, scroll
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/public"
  .home-page
    position fixed
    top 0px
    bottom 0px
    width 3.75rem
  .page-body-scroll
    width 100%
    .nav-item
      width 3.75rem
      height 1rem
      display flex
      justify-content space-around
      align-items center
      background-color $color-background
      margin-bottom .1rem
      img
        width .46rem
        margin-bottom .1rem
      p
        font-size $font-size-small
        color $text-color-a4
    .hot-ad
      width 100%
      height 1.9rem
      display flex
      justify-content space-between
      img
        width 100%
        display block
      .left
        width 1.74rem
        height 1.9rem
        border-right 0.01rem solid #ebebeb
        display inline-block
        img
          height 1.89rem
      .right
        width 2rem
        height 1.9rem
        display inline-block
    .bor-bottom
      border-bottom 0.01rem solid #ebebeb
    .showDoctorData
      width 100%
    .nav-bar-area
      width 3.75rem
      height .5rem
    .position-flex
      position fixed
      top .5rem
      left 0px;
    .pos-flex-top
      position fixed
      width 3.75rem
      top .5rem
      left 0px
      right 0px
      margin auto

    .update-down
      width 100%
      height 60px
      display flex
      justify-content center
      align-items center
      .update-text
        font-size $font-size-medium
        color $text-color-a4
    .page-slider
      width 3.75rem
      .post-content
        width 3.75rem
        background-color $color-background
        padding 0 0.15rem
        box-sizing border-box
        margin-bottom 0.1rem
        padding-top 1px
        p
          font-size $font-size-large
          color $text-color-33
          line-height $fonr-line-height-l
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin 0.1rem 0
          text-align left
          white-space: normal;
        .pic-box
          display flex
          justify-content space-between
          div
            width 1.65rem
            height 1.65rem
            background-size cover
            background-position center
          img
            width 100%
        .post-mark
          width 100%
          height 0.5rem
          display flex
          justify-content flex-start
          align-items center
          img
            width 0.16rem
            margin-right 0.1rem
          span
            font-size $font-size-medium-x
            color $text-color-theme
            margin-right 0.1rem
  .choose-nav-bar
    width 3.75rem
    height .5rem
    border-top 0.01rem solid #ebebeb
    border-bottom 0.01rem solid #ebebeb
    background-color $color-background
    box-sizing border-box
    display: flex
    justify-content space-between
    .scroll-bar
      width 3.25rem
      height .5rem
      overflow-x hidden
      .type-item
        width 0.72rem
        text-align center
        height .5rem
        padding-left 0.15rem
        line-height .5rem
        display inline-block
        white-space nowrap
        font-size $font-size-medium-x
        color $text-color-4e
      .type-item:first-child
        width 0.36rem
      .active
        font-size $font-size-large
        color $text-red
    .updata-data
      width .5rem
      height .5rem
      img
        padding 0.125rem
        width 0.25rem
  .index-select-bar
    position fixed
    top .0rem
    width 3.75rem
    height .4rem
    padding 0.05rem 0
    z-index: 99
    .select-bar
      width 3.45rem
      height .4rem
      margin auto
      border-radius .4rem
      background-color $color-background
      opacity 0.6
      /*display flex*/
      /*justify-content flex-start*/
      /*align-items center*/
      img
        width .2rem
        margin .1rem 0.15rem
        vertical-align middle
      .text-c-f
        font-size $font-size-medium
        color: $text-color-a4
        line-height .4rem
  .bg
    background-color $text-color-theme
    .select-bar
      opacity 1

  .pos-flex-top
    position fixed
    top .5rem
    left 0

</style>
