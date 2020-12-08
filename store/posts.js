export const state = () => ({
    posts: [],
  })
  
  export const getters={
    getPosts:(state)=>{
      return state.posts
    }
  }
  export const mutations={
    setPosts:(state,posts)=>{
      state.posts = posts
    },
    setPostById:(state,post)=>{
      state.posts = post
    }
  }
  export const actions={
    loadPosts:async ({commit},$this)=>{
      await $this.$axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response=>{
        commit('setPosts',response.data)
      })
    },
    loadPost:async ({commit},[$this,id])=>{
      await $this.$axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response=>{
        commit('setPostById',response.data)
      })
    }
  }