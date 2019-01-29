import Vue from 'vue'
import Vuex from 'vuex'
import {getRandomId} from '@/const/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    containers: []
  },
  getters: {
    containers: state => state.containers,
    getContainer: state => containerId => state.containers.find(ctn => ctn.id === containerId) || {}
  },
  mutations: {
    addContainer (state, ctn = {}) {
      state.containers.push({
        id: getRandomId(32),
        name: '容器',
        components: [],
        ...ctn
      })
    },
    addComponent (state, {component, containerId}) {
      const ctn = state.containers.find(ctn => ctn.id === containerId)
      if (!ctn) {
        return
      }

      ctn.components.push({
        id: getRandomId(),
        ...component
      })
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
