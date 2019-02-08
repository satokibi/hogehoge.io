export const state = () => ({
  result: [],
  error: {}
})

export const getters = {
  result: (state) => state.result,
  error: (state) => state.error,
  hasResult: (state) => state.result.length > 0,
  getFirstKey: (state) => state.result[0].keyword
}

export const mutations = {
  setResult(state, { result } ) {
    state.result = result
  },
  setError(state, { error } ) {
    state.error = error
  }
}

export const actions = {
  async search({commit}, {keywords}) {

    commit('setError', { error: [] } )
    commit('setIsLoading', { flag: true }, { root: true });
    try {
      const result = await Promise.all(
        keywords.map(async (keyword) => {
          return this.$axios.$get('/code?q=' + keyword)
        })
      )

      for(var i = 0; i < result.length; i++) {
        result[i].keyword = keywords[i]
      }
      commit('setResult', { result: result } )
    } catch(e) {
      console.log('Server error...')
      commit('setError', { error: { 'message': 'Server error....' } } )
    }

    commit('setIsLoading', { flag: false }, { root: true })
  }
}