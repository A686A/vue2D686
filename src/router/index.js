import Vue from 'vue'
import Router from 'vue-router'
import Discover from '../components/Discover.vue'
import Demo from '../components/Demo.vue'
import Friends from '../components/Friends.vue'
import My from '../components/My.vue'
import TopList from '../components/TopList'
import PlayList from '../components/PlayList'
import Product from '../components/Product'
import Mock from '../components/Mock'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: "/discover" },
    {
      path: '/discover', component: Discover,
      // 通过children属性，嵌套声明子路由
      children: [
        { path: "toplist", component: TopList },
        { path: "playlist", component: PlayList },
      ]
    },
    { path: '/friends', component: Friends },
    { path: '/demo', component: Demo },
    { path: '/mock', component: Mock },
    {
      path: '/my',
      component: My,
      children: [
        { path: ":id", component: Product, props: true },
      ]
    },
  ]
})
