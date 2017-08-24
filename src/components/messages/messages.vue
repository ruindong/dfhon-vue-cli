<template>
  <scroll class="message" :data="messages">
    <div>
      <div class="messages-bar" v-for="item in messages">
          <img :src="item.ImgUrl"/>
          <div class="messages-content">
            <p class="title">
              <span>{{item.TypeName}}</span>
              <span style="font-size: .14rem;color: #a4a4a4">{{item.LastPushTime}}</span>
            </p>
            <p class="content">{{item.LastPushTitle}}</p>
          </div>
      </div>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import scroll from 'baseComponents/scroll'
  import {GetMessageTypeList} from 'api/messages-api'
  import {getCache, setCache} from 'common/js/localStorage'
  import {dateFormat, dateNomal} from 'common/js/format'
  import { Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        messages: []
      }
    },
    created () {
      if (getCache('userLogin')) {
        var userInfo = JSON.parse(getCache('userLogin'))
        Indicator.open({
          spinnerType: 'fading-circle'
        })
        this._getMessageTypeList(userInfo.UserId)
      } else {
        this.$router.push({
          path: `/user`
        })
      }
    },
    methods: {
      _getMessageTypeList (userId) {
        const params = {
          userId: userId,
          lastOpenTime: getCache('lastMsg') ? getCache('lastMsg') : dateNomal()
        }
        GetMessageTypeList(params).then((res) => {
          for (var k in res.Data) {
            if (res.Data[k].LastPushTime !== '') {
              res.Data[k].LastPushTime = dateFormat(res.Data[k].LastPushTime)
            }
          }
          this.messages = res.Data
          Indicator.close()
        })
        if (!getCache('lastMsg')) {
          setCache('lastMsg', dateNomal())
        }
      }
    },
    components: {
      scroll
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .message
    position fixed
    width 3.75rem
    height 100%
    top 0
    bottom 0
  .messages-bar
    width 3.75rem
    height .75rem
    border-bottom 1px solid #ebebeb
    background-color $color-background
    padding 0 .15rem
    box-sizing border-box
    display flex
    justify-content space-between
    align-items center
    img
      width .55rem
    .messages-content
      width 2.8rem
      .title
        display flex
        justify-content space-between
        font-size $font-size-large
        color $text-color-4e
        line-height $fonr-line-height-l
      .content
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-align left
        white-space: normal;
        font-size $font-size-medium
        color $text-color-a4
        line-height $fonr-line-height-l
</style>
