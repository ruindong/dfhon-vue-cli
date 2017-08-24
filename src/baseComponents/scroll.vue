<template>
  <div ref="wrapper">
    <slot></slot>
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
      click: {
        type: Boolean,
        default: true
      },
      bounce: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: true
      },
      momentum: {
        type: Boolean,
        default: true
      },
      data: {
        default: null
      },
      updateDown: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
        this.refresh()
      }, 20)
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          preventDefault: true,
          click: this.click,
          momentum: this.momentum,
          bounceTime: 20,
          bounce: this.bounce
        })
        if (this.updateDown) { // if updateDown true and downPage of update data
          setTimeout(() => {
            this.scroll.scrollTo(0, -60, 0, 'easing')
          }, 500)
          this.scroll.on('scrollEnd', (pos) => {
            if (pos.y > -60 && pos.y < 0) {
              this.scroll.scrollTo(0, -60, 0, 'easing')
            }
            if (pos.y >= 0) {
              this.$emit('updateStart', true)
              setTimeout(() => {
                this.scroll.scrollTo(0, -60, 600, 'easing')
                this.refresh()
              }, 1000)
            }
          })
        }
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scrollPos', pos)
          })
        }
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
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
  @import "~common/stylus/variable"
  .update-down
    width 100%
    height 60px
    display flex
    justify-content center
    align-items center
    .update-text
      font-size $font-size-medium
      color $text-color-a4
</style>
