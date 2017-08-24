<template>
  <div class="scrollX" ref="wrapper">
    <div class="scroll-group" ref="scrollGroup">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      snap: {
        type: Boolean,
        default: false
      },
      snapLoop: {
        type: Boolean,
        default: false
      },
      snapThreshold: {
        type: Number,
        default: 0.3
      },
      snapSpeed: {
        type: Number,
        default: 400
      },
      momentum: {
        type: Boolean,
        default: false
      },
      preventDefault: {
        type: Boolean,
        default: true
      },
      click: {
        type: Boolean,
        default: false
      },
      getData: {
        default: null
      },
      dataLength: {
        type: Number,
        default: null
      },
      listenPageIndex: {
        type: Boolean,
        default: true
      }
    },
    created () {},
    mounted () {
      setTimeout(() => {
        this._calculateDomWidth()
        this._initScrollX()
      }, 20)
    },
    methods: {
      _initScrollX () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scrollX = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          momentum: this.momentum,
          click: this.click,
          scrollX: true,
          scrollY: false,
          snap: this.snap,
          snapLoop: this.snapLoop,
          snapThreshold: this.snapThreshold,
          snapSpeed: this.snapSpeed,
          preventDefault: this.preventDefault
        })
        if (this.listenPageIndex) {
          this.scrollX.on('scrollEnd', () => {
            let pageIndex = this.scrollX.getCurrentPage().pageX
            this.$emit('listenPageIndex', pageIndex)
          })
        }
      },
      _calculateDomWidth () {
        let childNum
        if (this.dataLength) {
          childNum = this.dataLength
        } else {
          childNum = this.getData.length
        }
        this.scrollDom = this.$refs.scrollGroup
        var domWidth = 0
        for (var i = 0; i < childNum; i++) {
          domWidth += this.scrollDom.children[i].clientWidth
        }
        this.scrollDom.style.width = domWidth + 'px'
      },
      enable () {
        this.scrollX && this.scrollX.enable()
      },
      disable () {
        this.scrollX && this.scrollX.disable()
      },
      refresh () {
        this.scrollX && this.scrollX.refresh()
      },
      scrollToPage (index) {
        if (this.snap) {
          this.scrollX.goToPage(index, 0, 400, 'easing')
        }
      },
      scrollToElement (index) {
        let goTheEl = this.$refs.scrollGroup.children[index]
        if (!this.snap) {
          this.scrollX.scrollToElement(goTheEl, 300, 0, 0, 'easing')
        }
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .scroll-group
    display inline-block
    white-space nowrap
    vertical-align top
</style>

