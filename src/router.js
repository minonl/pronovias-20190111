import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Product from './views/Product.vue'
// import ProductList from './views/ProductList.vue'
// import PhotoUpload from './views/PhotoUpload.vue'
// import Result from './views/Result.vue'

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
      path: '/product/:id',
      name: 'product',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "product" */ './views/Product.vue')
    },
    {
      path: '/product',
      name: 'productlist',
      component: () => import(/* webpackChunkName: "productlist" */ './views/ProductList.vue')
    },
    {
      path: '/upload',
      name: 'photoupload',
      component: () => import(/* webpackChunkName: "photoupload" */ './views/PhotoUpload.vue')
    },
    {
      path: '/result/:id',
      name: 'result',
      component: () => import(/* webpackChunkName: "result" */ './views/Result.vue')
    }
  ]
})
