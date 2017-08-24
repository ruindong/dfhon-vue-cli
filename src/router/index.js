import Vue from 'vue'
import Router from 'vue-router'
import home from 'components/home/home'
import mall from 'components/mall/mall'
import areaChance from 'components/mall/areaChance'
import post from 'components/post/post'
import messages from 'components/messages/messages'
import user from 'components/user/user'
import userNameLogin from 'components/user/userNameLogin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/mall',
      name: 'mall',
      component: mall,
      children: [
        {
          path: '/areaChance',
          component: areaChance
        }
      ]
    },
    {
      path: '/post',
      name: 'post',
      component: post
    },
    {
      path: '/messages',
      name: 'messages',
      component: messages
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/userNameLogin',
      name: 'userNameLogin',
      component: userNameLogin
    }
  ]
})
