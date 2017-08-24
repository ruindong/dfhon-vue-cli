<template>
    <scroll :listen-scroll="true"
            :probe-type="3"
            :data="pageDataChange"
            :bounce="false"
            class="shop-view"
            ref="shopView">
      <div>
        <div class="pic-box-01">
          <div class="box-01">
            <img height="100%" src="http://img5.dfhon.cn/imagefiles/coupon/201707/2017072817142271342939.jpg"/>
          </div>
          <div class="box-02">
            <div :class="index ==0?'bor-bottom':''" v-for="(item,index) in getShopAdsData">
              <a :href="item.Share_Url"><img class="needsclick" height="100%" :src="item.PicUrl"/></a>
            </div>
          </div>
        </div>
        <div class="pic-box-02">
          <div class="three-box" v-for="item in GetMallZiSubject">
            <a :href="item.Share_Url">
            <img class="needsclick" width="100%" :src="item.PicUrl"/>
            <p class="text-color">{{item.Title}}</p>
            </a>
          </div>
        </div>

        <div class="pic-box-03 ">
          <img class="title" src="./images/shop-title.png" />
          <img class="update" src="./images/updata-some.png" />
        </div>

        <div class="product-box">
          <div class="bor-bottom product-container" style="position: relative" v-for="item in getPreferProduct">
            <img :src="item.ImgUrl"/>
            <!--<div class="product-mark"></div>-->
            <div class="product-info">
              <p class="product-title">{{item.Title}}</p>
              <p class="product-address">{{item.HospitalName}}</p>
              <div class="product-price">
                <div>
                  <span style="font-size: .18rem;color: #ff507f">￥{{item.PreferPrice}}  </span>
                  <span style="font-size: .13rem;text-decoration: line-through">￥{{item.MarketPrice}}</span>
                </div>
                <div>
                  <span>预约数：</span><span style="font-size: .13rem;color: #ff507f">{{item.OrderCount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="product-class" v-if="getProductClass.length">
          <scroll-x :getData="getProductClass" :momentum="true" :preventDefault="false">
            <div class="class-item" v-for="item in getProductClass">
              <div class="product-class-item">
                <img height="80%" style="margin: 0 0.05rem" :src="item.ImgUrl"/>
                <p class="class-name">{{item.ClassName}}</p>
              </div>
            </div>
          </scroll-x>
        </div>

        <div class="pic-box-04 ">
          <img class="title" src="./images/shop-title-02.png" />
        </div>

        <div v-for="item in getJingXuanSubject">
          <img width="100%" :src="item.PicUrl"/>
          <div class="CouponList-slider" v-if="item.CouponList.length">
            <scroll-x :getData="item.CouponList"
                      :dataLength="item.CouponList.length+1"
                      :preventDefault="false"
                      :momentum="true">
              <div class="CouponList" v-for="subject in item.CouponList">
                <img width="100%" :src="subject.ImgUrl" />
                <p class="subject-title">{{subject.Title}}</p>
                <p class="subject-hospital">{{subject.HospitalName}}</p>
                <p>
                  <span style="font-size: .16rem;color: #ff507f">￥{{subject.PreferPrice}}  </span>
                  <span style="font-size: .12rem;text-decoration: line-through">￥{{subject.MarketPrice}}</span>
                </p>
              </div>
              <div class="CouponList">
                <img width="100%" src="./images/subject-show-more.png"/>
              </div>
            </scroll-x>
          </div>
        </div>
        <div class="pic-box-04 ">
          <img class="title" src="./images/shop-title-03.png" />
        </div>
        <div class="product-box">
          <div class="bor-bottom product-container" v-for="item in getProductList">
            <img v-lazy="item.ImgUrl"/>
            <div class="product-info">
              <p class="product-title">{{item.Title}}</p>
              <p class="product-address">{{item.HospitalName}}</p>
              <div class="product-price">
                <div>
                  <span style="font-size: .18rem;color: #ff507f">￥{{item.PreferPrice}}  </span>
                  <span style="font-size: .13rem;text-decoration: line-through">￥{{item.MarketPrice}}</span>
                </div>
                <div>
                  <span>预约数：</span><span style="font-size: .13rem;color: #ff507f">{{item.OrderCount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="show-more-container">
          <div class="show-more-button">查看更多商品</div>
        </div>
        <div style="width: 100%;height: 1.05rem;"></div>
      </div>
      <div class="index-select-bar">
        <div class="select-area" @click="chooseArea">
          <p style="font-size: .14rem;color: #fff">{{nowCity}}</p>
          <img src="../../assets/arrow-w-down.png"/>
        </div>
        <div class="select-bar">
          <img src="../../assets/select-icon.png"/>
          <span class="text-c-f">搜索项目、医生、医院、帖子</span>
        </div>
      </div>
    </scroll>
</template>
<script type="text/ecmascript-6">
  import { getSubjectList, shopAds, preferProduct, productClass, mallJingXuanSubject } from 'api/mall-api'
  import scrollX from 'baseComponents/scrollX'
  import scroll from 'baseComponents/scroll'
  import { mapGetters } from 'vuex'
  import { Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        nowCity: '厦门',
        GetMallZiSubject: [],
        getShopAdsData: [],
        getPreferProduct: [],
        getProductClass: [],
        getJingXuanSubject: [],
        getProductList: [],
        pageDataChange: []
      }
    },
    created () {
      this._getSubjectList()
      this._getShopAds()
      this._getPreferProduct()
      this._getProductClass()
      this._getJingXuanSubject()
      this._getProductList()
    },
    methods: {
      chooseArea () {
        this.$router.push({
          path: `/areaChance`
        })
      },
      _getSubjectList () {
        getSubjectList().then((res) => {
          this.GetMallZiSubject = res.Data
          this.pageDataChange = res.Data
        })
      },
      _getShopAds () {
        shopAds().then((res) => {
          this.getShopAdsData = res.Data
          this.pageDataChange = res.Data
        })
      },
      _getPreferProduct () {
        const params = {
          fromId: 0,
          isHot: true,
          classId: 0,
          city: this.nowCity,
          couponType: 0,
          direction: 1,
          pageSize: 2
        }
        preferProduct(params).then((res) => {
          this.getPreferProduct = res.Data
          this.pageDataChange = res.Data
        })
      },
      _getProductClass () {
        productClass().then((res) => {
          this.getProductClass = res.Data
          this.pageDataChange = res.Data
        })
      },
      _getJingXuanSubject () {
        const params = {
          city: this.nowCity
        }
        mallJingXuanSubject(params).then((res) => {
          this.getJingXuanSubject = res.Data
          this.pageDataChange = res.Data
        })
      },
      _getProductList () {
        Indicator.open({
          spinnerType: 'fading-circle'
        })
        const params = {
          fromId: 0,
          isHot: true,
          classId: 0,
          city: this.nowCity,
          direction: 1,
          pageSize: 20
        }
        preferProduct(params).then((res) => {
          this.getProductList = res.Data
          this.pageDataChange = res.Data
          Indicator.close()
        })
      }
    },
    computed: {
      ...mapGetters([
        'city'
      ])
    },
    components: {
      scroll, scrollX
    },
    watch: {
      city () {
        this.nowCity = this.city
        this._getPreferProduct()
        this._getJingXuanSubject()
        this._getProductList()
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/public"
  .shop-view
    position fixed
    top 0px
    bottom 0px
    width 3.75rem
    padding-top .45rem
  .bor-bottom
    box-sizing border-box
    border-bottom 0.01rem solid #ebebeb
  .index-select-bar
    width 3.75rem
    height .45rem
    position fixed
    top 0
    left 0
    right 0
    margin auto
    z-index 1
    background-color $text-color-theme
    display flex
    justify-content center
    align-items center
    .select-area
      width .5rem
      display flex
      justify-content space-between
      align-items center
      margin-right .1rem
      img
        width .1rem
    .select-bar
      width 2.88rem
      height .32rem
      border-radius .32rem
      background-color $color-background
      display flex
      justify-content flex-start
      align-items center
      img
        width .2rem
        margin 0 0.15rem
      .text-c-f
        font-size $font-size-medium
        color: $text-color-a4
        line-height .32rem
  .pic-box-01
    width 3.75rem
    margin-top .1rem
    display flex
    justify-content center
    overflow: hidden;
    .box-01
      height 1.9rem
      box-sizing border-box
      border-right 1px solid #ebebeb
    .box-02
      div
        width 100%
        height .95rem
  .pic-box-02
    width 3.75rem
    display flex
    justify-content space-between
    padding .1rem .15rem .05rem .15rem
    box-sizing border-box
    margin-top .1rem
    background-color $color-background
    .three-box
      width 1.1rem
      min-height 1.1rem
      .text-color
        font-size $font-size-small-x
        color $text-color-4e
        text-align center
        line-height .26rem
  .pic-box-03
    width 3.75rem
    display flex
    justify-content flex-end
    align-items center
    background-color $color-background
    margin-top .1rem
    border-bottom 1px solid #ebebeb
    .title
      width .68rem
      margin-right .835rem
    .update
      width .55rem
      margin-right .15rem

  .product-box
    width 3.75rem
    padding 0 .15rem
    box-sizing border-box
    background-color $color-background
    .product-container
      display flex
      justify-content space-between
      height 1.21rem
      box-sizing border-box
      padding 0.1rem 0
      img
        width 1rem
      .product-mark
        width .32rem
        height .27rem
        position absolute
        top: .07rem
        left .04rem
        background-size cover
        background-position center
        background-image url("../../assets/product-mark.png")
      .product-info
        width 2.3rem
        height 1rem
        display flex
        flex-direction column
        justify-content space-around
        .product-title
          font-size $font-size-medium-xx
          color $text-color-4e
        .product-address
          padding-top 2px
          font-size $font-size-medium
          color $text-color-a4
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 2
          overflow: hidden
          white-space: normal
          height .3rem
        .product-price
          display flex
          justify-content space-between
          align-items center
          font-size $font-size-small-x
          color $text-color-a4
  .product-class
    margin-top .1rem
    width 3.75rem
    overflow-x hidden
    .class-item
      width 1.15rem
      height .5rem
      padding-left .05rem
      display inline-block
      white-space nowrap
      .product-class-item
        width 1.15rem
        height .5rem
        background-color $color-background
        display flex
        justify-content flex-start
        align-items center
        .class-name
          width 0.65rem
          text-align center
          font-size $font-size-small
          color $text-color-4e
  .pic-box-04
    width 3.75rem
    height .63rem
    background-color $color-background
    display flex
    justify-content center
    align-items center
    margin-top .1rem
    border-bottom 1px solid #ebebeb
    .title
      width .63rem
  .CouponList-slider
    padding .1rem 0 .2rem 0.15rem
    background-color $color-background
    overflow hidden
    .CouponList
      width 1.25rem
      text-align center
      padding-right .1rem
      display inline-block
      white-space nowrap
      font-size $font-size-small
      color $text-color-a4
      vertical-align middle
      .subject-title
        width .65rem
        margin 0 auto
        font-size $font-size-small-x
        color $text-color-4e
        overflow: hidden
        padding .1rem 0 .05rem 0
      .subject-hospital
        width 100%
        height .12rem
        font-size $font-size-small-s
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 1
        overflow: hidden
        white-space: normal
        margin-bottom .1rem
</style>
