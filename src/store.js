import Vue from 'vue'
import Vuex from 'vuex'
import Vapi from 'vuex-rest-api'

Vue.use(Vuex)

const apiStore = new Vapi({
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
    appointment: {
      name: '',
      email: '',
      trailProducts: []
    },
    products: { data: [] },
    categories: { data: [] }
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

apiStore.strict = process.env.NODE_ENV !== 'production'
apiStore.getters = {
  productListByCategory: (state) => (id) => {
    return state.products.data.filter(item => item.category_id.toString() === id)
  },
  productById: (state) => (id) => {
    return state.products.data.find(item => item.id.toString() === id)
  }
}
apiStore.mutations.trailProductListAdd = (state, id) => {
  if (state.products.data.length !== 0) {
    const result = state.products.data.find(item => item.id === id)
    if (result) {
      const list = state.appointment.trailProducts
      for (const item of list) {
        if (item.id === result.id) { return }
      }
      list.push(result)
    }
  }
}
apiStore.mutations.trailProductListClear = (state) => {
  state.appointment.trailProducts = []
}
apiStore.actions.addTrailProduct = (context, id) => {
  context.commit('trailProductListAdd', id)
}
apiStore.actions.removeAllTrailProducts = (context) => {
  context.commit('trailProductListClear')
}

const store = new Vuex.Store(apiStore)

export default store
