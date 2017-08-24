<template>
    <div class="type-page-scroll" ref="typePageScroll">
      <!--type select bar-->
      <div class="choose-nav-bar">
        <div class="scroll-bar needsclick" ref="scrollType">
          <div class="type-item-box" ref="typeItemBox">
            <div class="type-item"
                 v-for="(item, index) in typeData" @click="chooseType(item.LableId,index)"
                 :class="chooseData==item.LableId?'active':''">
              {{item.LableName}}
            </div>
          </div>
        </div>
        <div class="updata-data">
          <img src="../components/home/images/updata-icon.png"/>
        </div>
      </div>
      <!--page change with type change -->
      <div class="page-slider-scroll" ref="pageSliderScroll">
        <div class="page-slider needsclick" ref="pageSlider">
          <div class="page-slider-item" v-for="item in typeData">
            <div class="page-box" ref="pageBox">
              <div v-for="post in postData[item.LableId]">
                <div class="post-content">
                  <p>{{post.Title}}</p>
                  <div class="pic-box">
                    <div v-for="(picUrl, index) in post.ImgUrl2" :style="{backgroundImage: 'url('+post.ImgUrl2[index]+')'}"></div>
                  </div>
                  <div class="post-mark">
                    <img src="./../assets/label-mark.png"/>
                    <span v-for="lable in post.Lables">{{lable.LableName}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {screenW} from 'api/config'
  import { indexPost } from 'api/home-api'
  export default {
    props: {
      typeData: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        chooseData: null,
        flag: false,
        postData: {}
      }
    },
    mounted () {
      setTimeout(() => {
        this._typeBarWidth()
        this._initTypeScroll()
        this._initDomWidth()
        this._initPageSlider()
      }, 20)
    },
    created () {
      this.chooseData = this.typeData[0].LableId
      this._getPostList(this.chooseData)
    },
    watch: {
      data () {
        this.pageSlider.refresh()
      }
    },
    methods: {
      _initTypeScroll () { // init type scroll
        if (!this.$refs.typePageScroll) {
          return
        }
        this.scrollType = new BScroll(this.$refs.scrollType, {
          scrollX: true,
          scrollY: false,
          preventDefault: false
        })
      },
      _typeBarWidth () { // calculate type select bar width
        this.typeGroupW = this.$refs.typeItemBox
        let BarWidth = 0
        for (var i = 0; i < this.typeGroupW.children.length; i++) {
          BarWidth += this.typeGroupW.children[i].clientWidth
        }
        this.typeGroupW.style.width = BarWidth + 'px'
      },
      _initPageSlider () {
        this.pageSlider = new BScroll(this.$refs.pageSliderScroll, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: false,
          snapThreshold: 0.3,
          snapSpeed: 400,
          preventDefault: false,
          probeType: 1
        })
        this.pageSlider.on('scrollEnd', () => {
          let pageIndex = this.pageSlider.getCurrentPage().pageX // has select page
          this.chooseData = this.typeData[pageIndex].LableId  // has select LableId
          let typeBarDomList = this.$refs.typeItemBox // get type bar dom
          let typeScrollToEl = typeBarDomList.children[pageIndex] // hsa select type dom
          if (!this.flag) {
            this.scrollType.scrollToElement(typeScrollToEl, 300, 0, 0, 'easing')
          }
          this.flag = false
        })
      },
      _getPostList (id) {
        indexPost(id).then((res) => {
          for (var k in res.Data) {
            res.Data[k].ImgUrl2 = res.Data[k].ImgUrl2.split(',')
          }
          this.postData[id] = res.Data
        })
      },
      _initDomWidth () {
        let parentDom = this.$refs.pageSlider
        const childNum = this.typeData.length
        parentDom.style.width = childNum * screenW + 'px'
      },
      chooseType (id, index) {
        this._getPostList(id)
        this.chooseData = id
        this.flag = true
        this.pageSlider.goToPage(index, 0, 400, 'easing')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .type-page-scroll
    position: relative
    width: 100%
    overflow: hidden
    .choose-nav-bar
      display flex
      justify-content space-around
      align-items center
      border-top 0.01rem solid #ebebeb
      border-bottom 0.01rem solid #ebebeb
      background-color $color-background
      box-sizing border-box
      .scroll-bar
        width 3.25rem
        height .5rem
        overflow-x hidden
        background-color $color-background
        .type-item-box
          height: .5rem;
          display: flex;
          align-items: center;
          overflow-x hidden
          .type-item
            height .5rem
            line-height .5rem
            padding 0 0.15rem
            display inline-block
            white-space: nowrap
            font-size $font-size-medium-x
            color $text-color-4e
          span
            font-size $font-size-medium-x
            color $text-color-4e
          .active
            font-size $font-size-large
            color $text-red
      .updata-data
        width .5rem
        height .5rem
        img
          padding 0.125rem
          width 0.25rem
    .page-slider-scroll
      overflow-x hidden
    .page-slider
      display flex
      justify-content space-between
      overflow-x hidden
      .page-slider-item
        width 3.75rem
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        .page-box
          width 100%
          height 1000px
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
            .pic-box
              display flex
              justify-content space-between
              div
                width 1.65rem
                height 1.65rem
                background-size cover
                background-position center
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


</style>
