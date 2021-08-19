import axios from 'axios'
import _ from 'lodash'
import Cookies from 'js-cookie'

export const login = ({ commit }, parameter) => {
  return axios.post('/login', {
    userId: parameter.userId,
    password: parameter.password
  })
    .then(response => {
      if (response.data.data.id !== 0) {
        Cookies.remove('token')
        Cookies.remove('id')
        Cookies.set('token', response.data.token)
        Cookies.set('id', response.data.data.id)
        axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token
        commit('SET_LOGIN_STATE', true)
      }
    })
    .catch((error) => { commit('SET_ERROR_MESSAGE', error) })
}

export const getUser = ({ commit }, userId) => {
  axios.get(`/user/${userId}`)
    .then(response => { commit('SET_USER', response.data.result) })
    .catch((error) => { console.error(error) })
}

export const initSaveState = ({ commit }) => {
  commit('SAVE_STATE', false)
}

export const initUpdateState = ({ commit }) => {
  commit('UPDATE_STATE', false)
}

export const getStoreSelectItem = ({ commit }, dataName) => {
  axios.get(`/selectItem/${dataName}`)
    .then(response => { commit('SET_STORE_SELECT_ITEM', response.data.result) })
    .catch((error) => { console.error(error) })
}

export const getProductSelectItem = ({ commit }, dataName) => {
  axios.get(`/selectItem/${dataName}`)
    .then(response => { commit('SET_PRODUCT_SELECT_ITEM', response.data.result) })
    .catch((error) => { console.error(error) })
}

export const getCoffeeBeanSelectItem = ({ commit }, dataName) => {
  axios.get(`/selectItem/${dataName}`)
    .then(response => { commit('SET_COFFEEBEAN_SELECT_ITEM', response.data.result) })
    .catch((error) => { console.error(error) })
}

export const getProducts = ({ commit }, parameter) => {
  axios.get('/product', {
    params: {
      name: parameter.name
    }
  })
    .then(response => {
      var res = _.split(response, ',')
      var statue = _.get(res, 0).split(':')
      if (_.isEqual(_.get(statue, 0), 'ERROR')) {
        commit('SET_ERROR_MESSAGE', _.get(res, 1))
      } else {
        commit('SET_PRODUCTS', response.data)
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const getRecommendProducts = ({ commit }, parameter) => {
  axios.get('/products/recommend/data', {
    params: {
      name: parameter.name
    }
  })
    .then(response => {
      var res = _.split(response, ',')
      var statue = _.get(res, 0).split(':')
      if (_.isEqual(_.get(statue, 0), 'ERROR')) {
        commit('SET_ERROR_MESSAGE', _.get(res, 1))
      } else {
        commit('SET_PRODUCTS', response.data)
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const getProduct = ({ commit }, productId) => {
  axios.get(`/product/${productId}`)
    .then(response => { commit('SET_PRODUCT', response.data.result) })
    .catch((error) => { console.error(error) })
}

export const saveProduct = ({ commit }, parameter) => {
  var base64Image = _.split(parameter.image, ',')
  var decodedString = _.get(base64Image, 1)
  return axios.put('/product/add', {
    name: parameter.name,
    unit: parameter.unit,
    price: parseInt(parameter.price),
    image: decodedString,
    state: parseInt(parameter.state),
    memo: parameter.memo
  })
    .then(response => {
      if (_.isMatch(response.data, 'result:Error')) {
        commit('SET_ERROR_MESSAGE', 'Error')
      } else {
        if (_.isEqual(response.data.result, 'Success')) {
          commit('SAVE_STATE', true)
        } else {
          commit('SAVE_STATE', false)
        }
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const updateProduct = ({ commit }, parameter) => {
  // var base64Image = _.split(parameter.image, ',')
  // var decodedString = _.get(base64Image, 1)
  var decodedString = parameter.image
  return axios.post('/product/update', {
    id: parseInt(parameter.id),
    name: parameter.name,
    unit: parameter.unit,
    price: parseInt(parameter.price),
    state: parseInt(parameter.state),
    memo: parameter.memo,
    image: decodedString
  })
    .then(response => {
      if (_.isMatch(response.data, 'result:Error')) {
        commit('SET_ERROR_MESSAGE', 'Error')
      } else {
        if (response.data.indexOf('Success')) {
          commit('UPDATE_STATE', true)
        } else {
          commit('UPDATE_STATE', false)
        }
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const getStores = ({ commit }, parameter) => {
  axios.get('/store', {
    params: {
      name: parameter.name
    }
  })
    .then(response => {
      var res = _.split(response, ',')
      var statue = _.get(res, 0).split(':')
      if (_.isEqual(_.get(statue, 0), 'ERROR')) {
        commit('SET_ERROR_MESSAGE', _.get(res, 1))
      } else {
        commit('SET_STORES', response.data)
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const getRecommendStores = ({ commit }, parameter) => {
  axios.get('/stores/recommend/data', {
    params: {
      name: parameter.name
    }
  })
    .then(response => {
      var res = _.split(response, ',')
      var statue = _.get(res, 0).split(':')
      if (_.isEqual(_.get(statue, 0), 'ERROR')) {
        commit('SET_ERROR_MESSAGE', _.get(res, 1))
      } else {
        commit('SET_STORES', response.data)
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const getStore = ({ commit }, storeId) => {
  axios.get(`/store/${storeId}`)
    .then(response => { commit('SET_STORE', response.data.result) })
    .catch((error) => { console.error(error) })
}

export const saveStore = ({ commit }, parameter) => {
  var base64Image = _.split(parameter.image, ',')
  var decodedString = _.get(base64Image, 1)
  return axios.put('/store/add', {
    name: parameter.name,
    tel: parameter.tel,
    address: parameter.address,
    page: parameter.page,
    fb: parameter.fb,
    ig: parameter.ig,
    image: decodedString,
    state: parseInt(parameter.state),
    memo: parameter.memo
  })
    .then(response => {
      if (_.isMatch(response.data, 'result:Error')) {
        commit('SET_ERROR_MESSAGE', 'Error')
      } else {
        if (_.isEqual(response.data.result, 'Success')) {
          commit('SAVE_STATE', true)
        } else {
          commit('SAVE_STATE', false)
        }
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const updateStore = ({ commit }, parameter) => {
  // var base64Image = _.split(parameter.image, ',')
  // var decodedString = _.get(base64Image, 1)
  var decodedString = parameter.image
  return axios.post('/store/update', {
    id: parseInt(parameter.id),
    name: parameter.name,
    tel: parameter.tel,
    address: parameter.address,
    page: parameter.page,
    fb: parameter.fb,
    ig: parameter.ig,
    state: parseInt(parameter.state),
    memo: parameter.memo,
    image: decodedString
  })
    .then(response => {
      if (_.isMatch(response.data, 'result:Error')) {
        commit('SET_ERROR_MESSAGE', 'Error')
      } else {
        if (response.data.indexOf('Success')) {
          commit('UPDATE_STATE', true)
        } else {
          commit('UPDATE_STATE', false)
        }
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const getCoffeeBeans = ({ commit }, parameter) => {
  axios.get('/coffeeBeans', {
    params: {
      name: parameter.name
    }
  })
    .then(response => {
      var res = _.split(response, ',')
      var statue = _.get(res, 0).split(':')
      if (_.isEqual(_.get(statue, 0), 'ERROR')) {
        commit('SET_ERROR_MESSAGE', _.get(res, 1))
      } else {
        commit('SET_COFFEEBEANS', response.data)
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const getCoffeeBean = ({ commit }, coffeeBeanId) => {
  axios.get(`/coffeeBean/${coffeeBeanId}`)
    .then(response => {
      const moment = require('moment')
      var buyDate = response.data.result.buyDate
      var buyDateFormat = moment(buyDate).format('YYYY-MM-DD')
      response.data.result.buyDate = buyDateFormat
      commit('SET_COFFEEBEAN', response.data.result)
    })
    .catch((error) => { console.error(error) })
}

export const saveCoffeeBean = ({ commit }, parameter) => {
  var base64Image = _.split(parameter.image, ',')
  var decodedString = _.get(base64Image, 1)
  const moment = require('moment')
  const buyDate = moment.utc(parameter.buyDate)
  return axios.put('/coffeeBean/add', {
    sid: parseInt(parameter.sid),
    origin: parameter.origin,
    manor: parameter.manor,
    name: parameter.name,
    fermentation: parameter.fermentation,
    roast: parameter.roast,
    acidity: parameter.acidity,
    flavor: parameter.flavor,
    tasting: parameter.tasting,
    description: parameter.description,
    state: parseInt(parameter.state),
    image: decodedString,
    buyDate: buyDate,
    weight: parseInt(parameter.weight),
    price: parseInt(parameter.price)
  }
  )
    .then(response => {
      if (_.isMatch(response.data, 'result:Error')) {
        commit('SET_ERROR_MESSAGE', 'Error')
      } else {
        if (_.isEqual(response.data.result, 'Success')) {
          commit('SAVE_STATE', true)
        } else {
          commit('SAVE_STATE', false)
        }
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const updateCoffeeBean = ({ commit }, parameter) => {
  // var base64Image = _.split(parameter.image, ',')
  // var decodedString = _.get(base64Image, 1)
  var decodedString = parameter.image
  const moment = require('moment')
  const buyDate = moment.utc(parameter.buyDate)
  return axios.post('/coffeeBean/update', {
    id: parseInt(parameter.id),
    sid: parseInt(parameter.sid),
    origin: parameter.origin,
    manor: parameter.manor,
    name: parameter.name,
    fermentation: parameter.fermentation,
    roast: parameter.roast,
    acidity: parameter.acidity,
    flavor: parameter.flavor,
    tasting: parameter.tasting,
    description: parameter.description,
    state: parseInt(parameter.state),
    image: decodedString,
    buyDate: buyDate,
    weight: parseInt(parameter.weight),
    price: parseInt(parameter.price)
  })
    .then(response => {
      if (_.isMatch(response.data, 'result:Error')) {
        commit('SET_ERROR_MESSAGE', 'Error')
      } else {
        if (response.data.indexOf('Success')) {
          commit('UPDATE_STATE', true)
        } else {
          commit('UPDATE_STATE', false)
        }
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const getBrews = ({ commit }, parameter) => {
  axios.get('/brew', {
    params: {
      name: parameter.name
    }
  })
    .then(response => {
      var res = _.split(response, ',')
      var statue = _.get(res, 0).split(':')
      if (_.isEqual(_.get(statue, 0), 'ERROR')) {
        commit('SET_ERROR_MESSAGE', _.get(res, 1))
      } else {
        commit('SET_BREWS', response.data)
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const getBrew = ({ commit }, brewId) => {
  axios.get(`/brew/${brewId}`)
    .then(response => { commit('SET_BREW', response.data.result) })
    .catch((error) => { console.error(error) })
}

export const saveBrew = ({ commit }, parameter) => {
  return axios.put('/brew/add', {
    bid: parseInt(parameter.bid),
    grinder: parameter.grinder,
    scale: parseInt(parameter.scale),
    steaming: parseInt(parameter.steaming),
    waterCuts: parseInt(parameter.waterCuts),
    waterTemperature: parseInt(parameter.waterCuts),
    totalWater: parseInt(parameter.totalWater),
    description: parameter.description
  })
    .then(response => {
      if (_.isMatch(response.data, 'result:Error')) {
        commit('SET_ERROR_MESSAGE', 'Error')
      } else {
        if (_.isEqual(response.data.result, 'Success')) {
          commit('SAVE_STATE', true)
        } else {
          commit('SAVE_STATE', false)
        }
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const updateBrew = ({ commit }, parameter) => {
  return axios.post('/brew/update', {
    id: parseInt(parameter.id),
    bid: parseInt(parameter.bid),
    grinder: parameter.grinder,
    scale: parseInt(parameter.scale),
    steaming: parseInt(parameter.steaming),
    waterCuts: parseInt(parameter.waterCuts),
    waterTemperature: parseInt(parameter.waterCuts),
    totalWater: parseInt(parameter.totalWater),
    description: parameter.description
  })
    .then(response => {
      if (_.isMatch(response.data, 'result:Error')) {
        commit('SET_ERROR_MESSAGE', 'Error')
      } else {
        if (response.data.indexOf('Success')) {
          commit('UPDATE_STATE', true)
        } else {
          commit('UPDATE_STATE', false)
        }
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const getRunShops = ({ commit }, parameter) => {
  axios.get('/runShops', {
    params: {
      name: parameter.name
    }
  })
    .then(response => {
      var res = _.split(response, ',')
      var statue = _.get(res, 0).split(':')
      if (_.isEqual(_.get(statue, 0), 'ERROR')) {
        commit('SET_ERROR_MESSAGE', _.get(res, 1))
      } else {
        commit('SET_RUNSHOPS', response.data)
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const getRunShop = ({ commit }, runShopId) => {
  axios.get(`/runShop/${runShopId}`)
    .then(response => { commit('SET_RUNSHOP', response.data.result) })
    .catch((error) => { console.error(error) })
}

export const saveRunShop = ({ commit }, parameter) => {
  return axios.put('/runShop/add', {
    sid: parseInt(parameter.sid),
    pid: parseInt(parameter.pid),
    tasting: parameter.tasting,
    memo: parameter.memo,
    state: parseInt(parameter.state)
  })
    .then(response => {
      if (_.isMatch(response.data, 'result:Error')) {
        commit('SET_ERROR_MESSAGE', 'Error')
      } else {
        if (_.isEqual(response.data.result, 'Success')) {
          commit('SAVE_STATE', true)
        } else {
          commit('SAVE_STATE', false)
        }
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}

export const updateRunShop = ({ commit }, parameter) => {
  return axios.post('/runShop/update', {
    id: parseInt(parameter.id),
    sid: parseInt(parameter.sid),
    pid: parseInt(parameter.pid),
    tasting: parameter.tasting,
    memo: parameter.memo,
    state: parseInt(parameter.state)
  })
    .then(response => {
      if (_.isMatch(response.data, 'result:Error')) {
        commit('SET_ERROR_MESSAGE', 'Error')
      } else {
        if (response.data.indexOf('Success')) {
          commit('UPDATE_STATE', true)
        } else {
          commit('UPDATE_STATE', false)
        }
      }
    })
    .catch((error) => { console.error(error) })
    .finally(() => { /* 不論失敗成功皆會執行 */ })
}
