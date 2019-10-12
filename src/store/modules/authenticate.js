import * as authenApi from '@/service/api/authenticate';
const state = {
  token: localStorage.getItem('user-token') || '',
  user: null,
  errorMsg: '',
  loading: false
}

const mutations = {
  'SET_TOKEN'(state, value) {
    localStorage.setItem('user-token', value);
    state.token = value;
  },
  'CLEAR_TOKEN'(state) {
    state.token = '';
  },
  'SET_USER'(state, user) {
    state.user = user;
  },
  'CLEAR_USER'(state) {
    state.user = null;
  },
  'SET_ERROR'(state, error) {
    state.errorMsg = error;
  },
  'CLEAR_ERROR'(state) {
    state.errorMsg = null;
  },
  'SET_LOADING'(state) {
    state.loading = true;
  },
  'CLEAR_LOADING'(state) {
    state.loading = false;
  }
}

const actions = {
  async 'LOGIN'({commit}, {email, password}) {
    try {
      commit('CLEAR_ERROR');
      commit('SET_LOADING');
      const {status, data} = await authenApi.login(email, password);
      commit('CLEAR_LOADING');
      if(status === 200) {
        commit('SET_TOKEN', data.token);
        commit('SET_USER', data.data.user);
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
  }
}

const getters = {
  getToken: state => {
    return state.token
  },
  isLogin: state => {
    return !!state.token
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}