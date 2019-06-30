import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    hotProducts: []
  },
  mutations: {
    retrieveProduct(state, products) {
      state.products = products
    },
    retrieveHotProducts(state, products) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].hotProducts) {
          state.hotProducts.push(products[i])
        }
      }
    }
  },
  actions: {
    retrieveProduct({commit}) {
      axios({
        method: "GET",
        url: `http://localhost:3000/products`,
        responseType: 'json',
        headers: {
            "token" : localStorage.getItem('token')
        }
      })     
      .then( ({data}) => {
        commit("retrieveProduct", data)
        commit("retrieveHotProducts", data)
      })
      .catch(err => {
          console.log(err)
      }) 
    },
  }
})
