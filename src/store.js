import Vue from 'vue'
import Vuex from 'vuex'
import Vapi from 'vuex-rest-api'
import Qs from 'qs'
import config from '@/config'

Vue.use(Vuex)

// filter params, so only 'from' is appended in query
const requestConfig = {
  paramsSerializer: function (params) {
    const allowed = ['from']
    const filtered = Object.keys(params)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = params[key]
        return obj
      }, {})
    let s = Qs.stringify(filtered)
    return s
  }
}

const apiStore = new Vapi({
  baseURL: config.apiBaseUrl,
  queryParams: true,
  state: {
    app: {
      homeVisted: false,
      errors: []
    },
    account: {
      phone: ''
    },
    login: { date: {} },
    appointment: {
      name: '',
      date: '',
      email: '',
      trailProducts: [],
      agree: false
    },
    products: { data: [] },
    categories: { data: [] },
    dataUrl: null,
    from: '',
    mode: 0
  }
})
  .get({
    action: 'listProductRaw',
    property: 'products',
    path: `/product`,
    requestConfig: requestConfig
  })
  .get({
    action: 'listCategoryRaw',
    property: 'categories',
    path: '/category',
    requestConfig: requestConfig
  })
  .post({
    action: 'verifyPhoneRaw',
    property: 'captcha',
    path: '/phone-captcha',
    requestConfig: requestConfig
  })
  .post({
    action: 'loginPhoneRaw',
    property: 'login',
    path: '/login',
    requestConfig: requestConfig
  })
  .post({
    action: 'submitAppointmentRaw',
    property: 'booking',
    path: '/booking',
    requestConfig: requestConfig,
    headers: ({ token }) => ({
      'TOKEN': token
    })
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

function track (context, data) {
  if (!data) {
    data = {}
  }
  if (context.state.from && context.state.from.length > 0) {
    if (data.params) {
      data.params.from = context.state.from
    } else {
      data.params = {
        from: context.state.from
      }
    }
  }
  return data
}

// API tracking
apiStore.actions.listProduct = (context) => {
  const t = track(context)
  context.dispatch('listProductRaw', t)
}
apiStore.actions.listCategory = (context) => {
  const t = track(context)
  context.dispatch('listCategoryRaw', t)
}
apiStore.actions.verifyPhone = (context, data) => {
  const t = track(context, data)
  context.dispatch('verifyPhoneRaw', t)
}
apiStore.actions.loginPhone = (context, data) => {
  const t = track(context, data)
  context.dispatch('loginPhoneRaw', t)
}
apiStore.actions.submitAppointment = (context, data) => {
  const t = track(context, data)
  context.dispatch('submitAppointmentRaw', t)
}

apiStore.mutations.homeVisit = (state, value) => {
  state.app.homeVisted = value
}

apiStore.mutations.modeChange = (state, value) => {
  state.mode = value
}

// Account
// - phone
apiStore.mutations.phoneUpdate = (state, value) => {
  state.account.phone = value
}
apiStore.actions.updatePhone = (context, value) => {
  context.commit('phoneUpdate', value)
}
// Appointment
// - name
apiStore.mutations.nameUpdate = (state, value) => {
  state.appointment.name = value
}
apiStore.actions.updateName = (context, value) => {
  context.commit('nameUpdate', value)
}
// - email
apiStore.mutations.emailUpdate = (state, value) => {
  state.appointment.email = value
}
apiStore.actions.updateEmail = (context, value) => {
  context.commit('emailUpdate', value)
}
// - datetime
apiStore.mutations.dateUpdate = (state, value) => {
  state.appointment.date = value
}
apiStore.actions.pickDatetime = (context, value) => {
  context.commit('dateUpdate', value)
}
// - trail product list
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
// - agree
apiStore.mutations.agreeUpdate = (state, value) => {
  state.appointment.agree = value
}
apiStore.actions.updateAgree = (context, value) => {
  context.commit('agreeUpdate', value)
}

// Photo
apiStore.mutations.updateDataUrl = (state, dataUrl) => {
  state.dataUrl = dataUrl
}

// from wx, wb, ...
apiStore.mutations.knowFrom = (state, from) => {
  state.from = from
}

const store = new Vuex.Store(apiStore)

export default store
