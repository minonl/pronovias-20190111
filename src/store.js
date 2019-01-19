import Vue from 'vue'
import Vuex from 'vuex'
import Vapi from 'vuex-rest-api'

Vue.use(Vuex)

const fetechedData = new Vapi({
  baseURL: 'http://47.104.240.204/api/web',
  state: {
    app: {
      isLoading: false,
      errors: []
    },
    account: {
      phone: '',
      isVerified: false,
      isLogin: false
    },
    order: {
      name: '',
      email: '',
      trailProducts: []
    },
    products: [],
    categories: []
  }
})
  .get({
    action: 'listProduct',
    property: 'products',
    path: '/product'
  })
  .get({
    action: 'listCategory',
    property: 'categories',
    path: '/category'
  })
  .getStore()

export default new Vuex.Store(fetechedData, {
  strict: process.env.NODE_ENV !== 'production',
  getters: {
    productByCategory: (state) => (id) => {
      return state.products.find(item => item.category_id === id)
    },
    productById: (state) => (id) => {
      return state.products.find(item => item.id === id)
    }
  }
})

/*
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    app: {
      isLoading: false,
      errors: []
    },
    account: {
      phone: '',
      isVerified: false,
      isLogin: false
    },
    order: {
      name: '',
      email: '',
      trailProducts: []
    },
    product: []
  },
  getters: {
    productByCategory: (state) => (id) => {
      return state.products.find(item => item.id === id)
    }
  },
  mutatons: {
    confirmPhone (state) {

    }
  },
  actions: {

  }
})
*/
