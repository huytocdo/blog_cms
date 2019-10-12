import * as authenApi from '@/service/api/authenticate';
import Cookies from "js-cookie";
const state = {
  token: Cookies.get('jwt') || '',
  user: null,
  errorMsg: '',
  loading: false
}

const mutations = {
  'SET_TOKEN'(state, {token, expires}) {
    expires = parseInt(expires, 10);
    Cookies.set('jwt', token, {expires: expires})
    state.token = token;
  },
  'CLEAR_TOKEN'(state) {
    Cookies.remove('jwt')
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
        commit('SET_TOKEN', { token: data.token, expires: data.expires });
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
  },
  async 'LOGOUT'({commit}) {
    try {
      commit('CLEAR_ERROR');
      commit('SET_LOADING');
      const {status, data} = await authenApi.logout();
      commit('CLEAR_LOADING');
      if(status === 200) {
        commit('CLEAR_USER');
        commit('CLEAR_TOKEN');
        return true;
      }
      console.log(status, data)
    } catch(err) {
      commit('CLEAR_LOADING');
      commit('CLEAR_USER');
      commit('CLEAR_TOKEN');
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