import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

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

  }
})
