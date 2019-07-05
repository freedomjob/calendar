const state = {
    m1: '1'
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
    state,
    getters,
    actions,
    mutations
  }