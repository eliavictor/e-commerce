import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cart from './views/ShoppingCart.vue'
import Admin from './views/Admin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'ShoppingCart',
      component: Cart
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/products',
      name: 'products',
      component: () => import(/* webpackChunkName: "about" */ './views/Products.vue')
    },
  ]
})
