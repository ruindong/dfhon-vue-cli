<template>
    <transition name="slide">

        <scroll @scrollPos="scroll"
                :listen-scroll="true"
                :probe-type="3"
                :data="cityList"
                :bounce="false"
                class="list-view"
                ref="listView">
          <ul ref="listGroup" style="padding-top: .5rem">
            <li v-for="(group, index) in cityList" class="list-group">
              <div v-if="index==0">
                <div class="public-bar">
                  <span style="font-size: .15rem;color: #a4a4a4;margin-right: .1rem">当前位置</span>
                  <span style="font-size: .16rem;">厦门</span>
                </div>
                <div class="public-bar" @click="selectItem('全国')">全国</div>
                <h2 class="list-group-title" style="color: #a4a4a4">{{group.title}}</h2>
                <div class="hot-city-area">
                  <div class="hot-city-name" v-for="hotCity in group.items[0]" @click="selectItem(hotCity)">{{hotCity}}</div>
                </div>
              </div>
              <div v-else>
                <h2 class="list-group-title">{{group.title}}</h2>
                <uL>
                  <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
                    <div class="public-bar2">{{item}}</div>
                  </li>
                </uL>
              </div>
            </li>
          </ul>
          <div class="list-shortcut"
               @touchstart="onShortcutTouchStart"
               @touchmove.stop.prevent="onShortcutTouchMove"
               @touchend="onShortcutTouchEnd"
          >
            <ul>
              <li v-for="(item, index) in cityList" :data-index="index" class="item"
                  :class="{'current':currentIndex===index}" v-if="index>0">{{item.title}}
              </li>
            </ul>
          </div>
          <div class="select-mark animated" ref="selectMark">{{markWord}}</div>
          <div class="public-bar" style="position: fixed;top: 0px;">
            <div class="select-bar">
              <img src="../../assets/select-icon.png"/>
              <span class="text-c-f">请输入城市名称或拼音查询</span>
            </div>
          </div>
        </scroll>
    </transition>
</template>
<script type="text/ecmascript-6">
  import { getAllProvinceCity } from 'api/mall-api'
  import scroll from 'baseComponents/scroll'
  import {getData, addClass, removeClass} from 'common/js/dom'
  import {screenW} from 'api/config'
  import { mapMutations } from 'vuex'
  const chaJu = screenW / 375 * 50
  const ANCHOR_HEIGHT = screenW / 375 * 32
  export default {
    data () {
      return {
        cityList: [],
        currentIndex: 0,
        touch: {},
        markWord: ''
      }
    },
    created () {
      this._getAllProvinceCity()
    },
    methods: {
      _getAllProvinceCity () {
        getAllProvinceCity().then((res) => {
          res.HotCitys = res.HotCitys.split(',')
          console.log(res)
          this.cityList = this.formatData(res)
          console.log(this.cityList)
        })
      },
      formatData (list) { // 数据重构
        let map = {
          hot: {
            title: '热门城市',
            items: []
          }
        }
        map.hot.items.push(list.HotCitys)
        list.Data.forEach((item, index) => {
          const key = item.AreaCode.substr(0, 1).toUpperCase()
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(item.City)
        })
        // 为了得到有序列表，我们需要处理 map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === '热门城市') {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      scroll (newY) {
      },
      onShortcutTouchStart (e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove (e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        if (anchorIndex <= 0) {
          anchorIndex = 1
        }
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchEnd () {
        this.setTimeOut = setTimeout(() => {
          removeClass(this.$refs.selectMark, 'fadeIn')
        }, 1000)
      },
      _scrollTo (index) {
        this.markWord = this.cityList[index].title
        const listDom = this.$refs.listGroup.children[index]
        this.$refs.listView.scrollToElement(listDom, 500, 0, -chaJu)
      },
      selectItem (city) {
        this.$router.push({
          path: `/mall?city=` + city
        })
        this.setCity(city)
      },
      ...mapMutations({
        setCity: 'SET_CITY'
      })
    },
    watch: {
      markWord () {
        clearTimeout(this.setTimeOut)
        addClass(this.$refs.selectMark, 'fadeIn')
      }
    },
    components: {
      scroll
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/css/animate.css"
  .slide-enter-active, .slide-leave-active
    transition: all .3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .fadeIn
    display block!important
  .select-mark
    display none
    width .85rem
    height 1rem
    text-align center
    line-height 1rem
    position fixed
    top 50%
    transform: translateY(-50%)
    left 1px
    right 1px
    margin auto
    background-color rgba(0,0,0,0.1)
    color $text-color-theme
    font-size .5rem
  .areChance
    position fixed
    width 3.75rem
    height 100%
  .public-bar
    width 3.75rem
    height .5rem
    border-bottom 1px solid #ebebeb
    background-color $color-background
    line-height .5rem
    padding 0 .15rem
    box-sizing border-box
    color $text-color-4e
  .public-bar2
    width 100%
    height .6rem
    border-bottom 1px solid #ebebeb
    background-color $color-background
    line-height .6rem
    padding 0 .15rem
    font-size $font-size-large
    box-sizing border-box
    color $text-color-4e
  .hot-city-area
    width 3.6rem
    background $theme-background
    padding-left .15rem
    display flex
    flex-wrap wrap
    justify-content flex-start
    .hot-city-name
      width 1.1rem
      height .33rem
      background $color-background
      border 1px solid #ebebeb
      border-radius .01rem
      margin-top .06rem
      margin-right .05rem
      text-align center
      line-height .33rem
  .list-view
    position: fixed
    width: 3.75rem
    height: 100%
    overflow: hidden
    background: $color-background
    top 0px
    z-index 99
    .list-group
      width 3.75rem
      .list-group-title
        height: .3rem
        line-height: .3rem
        padding-left .15rem
        font-size: $font-size-medium-x
        color: $text-color-4e
        background: $theme-background
      .list-group-item
        display: flex
        align-items: center
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: .2rem
      padding: .1rem 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: .1rem 0
        line-height: 1
        color: $text-color-theme
        font-size: $font-size-small
        &.current
          color: $color-theme
  .select-bar
    width 100%
    height .32rem
    border-radius .32rem
    background-color $theme-background
    display flex
    justify-content center
    align-items center
    margin .09rem 0
    img
      width .2rem
      margin 0 0.15rem
    .text-c-f
      font-size $font-size-medium
      color: $text-color-a4
</style>
