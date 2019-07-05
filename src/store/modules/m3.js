const state = {
    m1: '3'
  }
  
  const getters = {
    getM: state => state.m1
  }
  
  const actions = {
    mAction ({commit},arg) {
        commit('mAction', arg)
    }
  }
  
  const mutations = {
    mAction: (state, payload) => {
      state.m1 = payload
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }