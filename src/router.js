import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'
import config from './config'
import Product from './views/Product.vue'
import ProductList from './views/ProductList.vue'
import Appointment from './views/Appointment.vue'
import PhotoUpload from './views/PhotoUpload.vue'
import Result from './views/Result.vue'
import Success from './views/Success.vue'
import Downloaded from './views/Downloaded.vue'

Vue.use(Router)

// function checkLogin (to, from, next) {
//   if (!store.state.login || !store.state.account.phone || !store.state.login.data.token) {
//     next('/login')
//   }
//   next()
// }

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    {
      path: '/appointment',
      name: 'appointment',
      component: Appointment
      // component: () => import(/* webpackChunkName: "appointment" */ './views/Appointment.vue')
      // beforeEnter: checkLogin
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "product" */ './views/Product.vue')
    },
    {
      path: '/product',
      name: 'productlist',
      component: ProductList
      // component: () => import(/* webpackChunkName: "productlist" */ './views/ProductList.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: Success
      // component: () => import(/* webpackChunkName: "success" */ './views/Success.vue')
    },
    {
      path: '/upload',
      name: 'photoupload',
      component: PhotoUpload
      // component: () => import(/* webpackChunkName: "photoupload" */ './views/PhotoUpload.vue')
      // beforeEnter: checkLogin
    },
    {
      path: '/result',
      name: 'result',
      component: Result
      // component: () => import(/* webpackChunkName: "result" */ './views/Result.vue')
    },
    {
      path: '/downloaded',
      name: 'downloaded',
      component: Downloaded
    }
  ]
})

function getUrlParam (name) {
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(location.search)
  if (!results) { return null }
  if (!results[2]) { return '' }
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

router.beforeEach((to, from, next) => {
  let queryFrom = getUrlParam('from')
  let queryMode = getUrlParam('mode')
  if (queryMode) {
    store.commit('knowFrom', queryFrom)
  }
  if (queryMode) {
    store.commit('modeChange', queryMode)
  }
  // const uploadAllowed = ['photoupload', 'result']
  // const modeAllowed = [config.mode.upload, config.mode.trail]
  // if (process.env.NODE_ENV === 'production' && uploadAllowed.includes(to.name)) {
  //   if (!modeAllowed.includes(store.state.mode)) {
  //     next({ path: '/' })
  //   }
  // }
  // document.getElementById('app').style.position = 'fixed'
  if (process.env.NODE_ENV === 'production' && !store.state.app.homeVisted) {
    store.commit('homeVisit', true)
    next({ path: '/' })
  }
  next()
})

router.afterEach((to, from) => {
  setTimeout(function () {
    window.scrollTo(0, 0)
  }, 500)
  // document.getElementById('app').style.position = 'relative'
})

export default router
