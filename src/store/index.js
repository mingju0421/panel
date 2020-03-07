import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reportData: [{"x":0,"y":0,"w":6,"h":6,"i":"0", type: 'Graph'}]
  },
  getters: {
    reportData: state => state.reportData
  },
  mutations: {
    update(state, data) {
      state.reportData[data.index].config = data.config
    },
    addReport(state, data) {
      if (data === 'Row') {
        state.reportData.push({x: 0, y: 0, w: 12, h: 1, i: state.reportData.length, type: data})
      }else {
        state.reportData.push({x: 0, y: 0, w: 6, h: 6, i: state.reportData.length, type: data})
      }
    },
    收起面板(state, data) {
      let item = state.reportData[data]
      let y = item.y, nextY = 999
      let children = [], arr = []
      state.reportData.forEach(item => {
        if (item.type === 'Row' && item.y > y && item.y < nextY) {
          nextY = item.y
        }
      })
      state.reportData.forEach(item => {
        if (item.type !== 'Row' && item.y > y && item.y < nextY) {
          children.push(item)
        }else {
          arr.push(item)
        }
      })
      item.children = children
      state.reportData = arr
    },
    展开面板(state, data) {
      let y = state.reportData[data].y
      state.reportData.forEach(item => {
        if (item.y > y) {
          item.y += 90
        }
      })
      state.reportData.splice(data, 0, ...state.reportData[data].children)
      state.reportData[data].children = null
    },
    移除面板(state, data) {
      state.reportData.splice(data, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
