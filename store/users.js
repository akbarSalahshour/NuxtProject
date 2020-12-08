export const state = () => ({
    users: [],
  })
  
  export const getters={
    getUsers:(state)=>{
      return state.users
    },
    getUserById:(state,id)=>{
      return state.users.filter(user => user.id == id);
    }
  }
  export const mutations={
    setUsers:(state,users)=>{
      state.users = users
    }
  }
  export const actions={
    loadUsers:async ({commit},$this)=>{
      await $this.$axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response=>{
        commit('setUsers',response.data)
      })
    }
  }