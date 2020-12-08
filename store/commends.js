export const state = () => ({
  commends: [],
})

export const getters = {
  getCommends: (state) => {
    return state.commends
  }
}
export const mutations = {
  setCommends: (state, commends) => {
    state.commends = commends
  },
}
export const actions = {
  loadCommends: async ({
    commit
  }, [$this, postId]) => {
    await $this.$axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        let data = response.data.filter(commend => commend.postId == postId)
        commit('setCommends', data)
      })
  },
}
