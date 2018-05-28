import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    charts: [],
    // Local server: 'http://localhost:3000/',
    server: 'http://ecommers-server-dnd.damaradani.cf/',
    token: '',
    role: ''
  },
  getters: {
    guitars: state => {
      return state.items.filter(items => items.category === 'guitar')
    },
    bass: state => {
      return state.items.filter(items => items.category === 'bass')
    },
    keyboards: state => {
      return state.items.filter(items => items.category === 'keyboard')
    },
    drumset: state => {
      return state.items.filter(items => items.category === 'drumset')
    },
    chartFix: state => {
      // masih cara primitive
      if (state.items.length > 0) {
        let objItem = {}
        // ambil id yang sama
        state.charts.forEach(chart => {
          objItem[chart.item._id] = chart.item
        })
        // di balikin ke array lagi
        let newCharts = []
        for (let key in objItem) {
          newCharts.push(objItem[key])
        }
        // cari jumlah item yang id nya sama
        newCharts.forEach(chart => {
          let total = 0
          state.charts.forEach(chartOri => {
            if (chart._id === chartOri.item._id) {
              total++
            }
          })
          chart.total = total
          chart.totalPrice = total * chart.price
        })
        return newCharts
      }
    }
  },
  mutations: {
    clearState: function (state, value) {
      state.charts = []
      state.role = ''
      state.token = ''
    },
    setRole: function (state, value) {
      state.role = value
    },
    setToken: function (state, value) {
      state.token = value
    },
    // Items
    getItems: function (state, value) {
      state.items = value
    },
    addItem: function (state, value) {
      state.items.push(value)
    },
    editItem: function (state, editItem) {
      state.items.splice(editItem.index, 1, editItem.objItem)
    },
    deleteItem: function (state, index) {
      state.items.splice(index, 1)
    },
    // Chart
    getCharts: function (state, value) {
      state.charts = value
    },
    addToCharts: function (state, value) {
      state.charts.push(value)
    },
    deleteOneItem: function (state, index) {
      state.charts.splice(index, 1)
    },
    deleteChartItem: function (state, itemId) {
      let charts = state.charts
      let newCart = []
      for (let key in charts) {
        if (charts[key].item._id === itemId) {
          delete charts[key]
        }
        if (charts[key]) {
          newCart.push(charts[key])
        }
      }
      state.charts = newCart
    }
  },
  actions: {
    // Items
    getItems: function ({ commit }) {
      let url = this.state.server + 'item/'

      axios.get(url)
        .then(item => {
          let items = item.data.data
          commit('getItems', items)
        })
        .catch(() => {
          // console.log(err)
        })
    },
    addItem: function ({ commit }, objItem) {
      let url = this.state.server + 'item/add'
      let token = this.state.token
      // send to local
      commit('addItem', objItem)

      // send to server
      axios.post(url, objItem, {headers: { token }}) // kayanya bakal error
        .then(result => {
          swal(
            'New Instrument!',
            'Instrument has been added',
            'success'
          )
        })
        .catch(() => {
          // console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong'
          })
        })
    },
    uploadImg: function ({ dispatch, commit }, objItem) {
      let token = this.state.token
      let url = this.state.server + 'item/upload'
      let formData = new FormData()

      formData.append('image', objItem.image)
      axios.post(url, formData, {headers: {'Content-Type': 'multipart/form-data', token}})
        .then(response => {
          objItem.imgUrl = response.data.link
          dispatch('addItem', objItem)
        })
        .catch(err => {
          // console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    },
    uploadEditImg: function ({ dispatch, commit }, objItem) {
      let imgDataType = typeof (objItem.imgUrl)
      if (imgDataType === 'string') {
        dispatch('editItem', objItem)
      } else {
        // Harus Mesti kudu di coba
        let token = this.state.token
        let url = this.state.server + 'item/upload'
        let formData = new FormData()

        formData.append('image', objItem.imgUrl)
        axios.post(url, formData, {headers: {'Content-Type': 'multipart/form-data', token}})
          .then(response => {
            objItem.imgUrl = response.data.link
            dispatch('editItem', objItem)
          })
          .catch(err => {
            // console.log(err)
            swal({
              icon: 'error',
              title: 'Oops...',
              text: err
            })
          })
      }
    },
    editItem: function ({ commit }, objItem) {
      let url = this.state.server + 'item/edit/' + objItem._id
      let token = this.state.token
      let items = this.state.items
      items.forEach((item, index) => {
        if (item._id === objItem._id) {
          let editItem = {index, objItem}
          commit('editItem', editItem)
          return false
        }
      })
      axios.put(url, objItem, {headers: { token }}) // kayanya bakal ga jalan
        .then(response => {
          swal(
            'Instrument!',
            'Data Instrument succesfully Edited',
            'success'
          )
        })
        .catch(err => {
          swal({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    },
    deleteItem: function ({ commit }, itemId) {
      let items = this.state.items

      items.forEach((item, index) => {
        if (item._id === itemId) {
          commit('deleteItem', index)
        }
      })

      let url = this.state.server + 'item/delete/' + itemId
      let token = this.state.token
      axios.delete(url, {headers: { token }})
        .then(result => {
          swal(
            'Instrument!',
            'Instrument removed from Chart',
            'success'
          )
        })
        .catch(err => {
          swal({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    },
    // Charts
    getCharts: function ({ commit }) {
      let url = this.state.server + 'chart/'
      let token = this.state.token
      if (token !== '') {
        axios.get(url, {headers: { token }})
          .then(charts => {
            let chart = charts.data.data
            commit('getCharts', chart)
          })
          .catch(() => {
            // console.log(err)
          })
      }
    },
    addToCharts: function ({ commit }, objItem) {
      let url = this.state.server + 'chart/add'
      let item = objItem._id
      let token = this.state.token

      axios.post(url, { item }, {headers: { token }})
        .then(response => {
          if (!objItem.increase) {
            swal(
              `${objItem.name}`,
              'Has been added to Chart',
              'success'
            )
          }
          commit('addToCharts', response.data.data)
        })
        .catch(() => {
          // console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'U Need to Login'
          })
        })
    },
    deleteOneItem: function ({ commit }, itemId) {
      let charts = this.state.charts

      for (let key in charts) {
        if (charts[key].item._id === itemId) {
          // delete charts[key]
          commit('deleteOneItem', key)
          break
        }
      }

      let url = this.state.server + 'chart/delete/' + itemId + '/item'
      let token = this.state.token
      axios.delete(url, {headers: { token }})
        .then(() => {
          // console.log(result) // nanti di hapus ga perlu kayanya
        })
        .catch(() => {
          // console.log(err)
        })
    },
    deleteChartItem: function ({ commit }, itemId) {
      commit('deleteChartItem', itemId)
      let url = this.state.server + 'chart/delete/' + itemId
      let token = this.state.token
      axios.delete(url, {headers: { token }})
        .then(result => {
          swal(
            'Instrument!',
            'Instrument removed from Chart',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong'
          })
        })
    },
    // other
    cekToken: function ({ commit }, token) {
      let url = this.state.server + 'cektoken'
      axios.get(url, {headers: { token }})
        .then(response => {
          let role = response.data.user.role
          commit('setRole', role)
          commit('setToken', token)
          this.dispatch('getCharts')
        })
        .catch(() => {
          // console.log(err)
          // swal({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: err
          // })
        })
    }
  }
})
