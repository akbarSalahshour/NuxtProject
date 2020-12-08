export const state = {
  perPageList: [{
    title: 5,
    value: 5
  }, {
    title: 10,
    value: 10
  }, {
    title: 15,
    value: 15
  }, {
    title: 20,
    value: 20
  }, {
    title: 'همه',
    value: -1
  }]
}
export const getters = {
  getPerPageList: (state) => {
    return state.perPageList
  },
}
