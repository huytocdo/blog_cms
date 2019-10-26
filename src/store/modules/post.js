import * as post from '@/service/api/post';
const state = {
  loading: false,
  errorMsg: '',
  posts: [],
}

const mutations = {
  'SET_POSTS'(state, value) {
    state.posts = [...value];
  },
  'SET_LOADING'(state) {
    state.loading = true;
  },
  'CLEAR_LOADING'(state) {
    state.loading = false;
  },
  'SET_ERROR'(state, error) {
    state.errorMsg = error;
  },
  'CLEAR_ERROR'(state) {
    state.errorMsg = null;
  },
}

const actions = {
  async 'GET_ALL_POSTS'({commit}) {
    try {
      commit('CLEAR_ERROR');
      commit('SET_LOADING');
      const {status, data} = await post.getAll({fields: '-html -description'});
      commit('CLEAR_LOADING');
      if(status === 200) {
        commit('SET_POSTS', data.data.data); // BAD
        return true;
      } else {
        commit('SET_ERROR', data.message);
        return false;
      }
    } catch (err) {
      commit('CLEAR_LOADING');
      commit('SET_ERROR', err);
      return false;
    }
  },
  async 'DELETE_POST'({commit}, {id}) {
    try {
      commit('CLEAR_ERROR');
      commit('SET_LOADING');
      await post.deletePost(id);
      commit('CLEAR_LOADING');
    } catch (error) {
      commit('CLEAR_LOADING');
      commit('SET_ERROR', error);
    }
  }
}

const getters = {
  getAllPosts: state => state.posts
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}