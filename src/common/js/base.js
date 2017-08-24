/**
 * Created by Ruindong on 2017/7/18.
 */
export default function fontInit () {
  window.scale = Math.min(200, window.screen.width / 3.75)
  document.getElementsByTagName('html')[0].style.fontSize = window.scale + 'px'
}
export function listenDomScroll (handle) {
  window.addEventListener('scroll', function () {
    // console.log(window.scrollY)
    // if (document.body.scrollTop + document.body.clientHeight >= document.body.scrollHeight) {
    //   this.scrollBottom = true
    // } else {
    //   this.scrollBottom = false
    // }
    var scroll = {
      x: window.scrollX,
      y: window.scrollY
    }
    handle(scroll)
  })
}
