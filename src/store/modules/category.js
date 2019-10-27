import * as category from '@/service/api/category';
const state = {
  loading: false,
  errorMsg: '',
  categories: [],
}

const mutations = {
  'SET_CATEGORIES'(state, value) {
    state.categories = [...value];
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
  async 'GET_ALL_CATEGORIES'({commit}) {
    try {
      commit('CLEAR_ERROR');
      commit('SET_LOADING');
      const {status, data} = await category.getAll();
      commit('CLEAR_LOADING');
      if(status === 200) {
        commit('SET_CATEGORIES', data.data.data); // BAD
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
  async 'GET_CATEGORY'({commit}, {id}) {
    try {
      commit('CLEAR_ERROR');
      commit('SET_LOADING');
      const { data } = await category.getCategory(id);
      commit('CLEAR_LOADING');
      return data;
    } catch (err) {
      commit('CLEAR_LOADING');
      commit('SET_ERROR', err);
    }
  },
  async 'DELETE_CATEGORY'({commit}, {id}) {
    try {
      commit('CLEAR_ERROR');
      commit('SET_LOADING');
      await category.deleteCategory(id);
      commit('CLEAR_LOADING');
    } catch (error) {
      commit('CLEAR_LOADING');
      commit('SET_ERROR', error);
    }
  },
  async 'CREATE_CATEGORY'({commit}, data) {
    try {
      commit('CLEAR_ERROR');
      commit('SET_LOADING');
      await category.createNew(data);
      commit('CLEAR_LOADING');
    } catch (error) {
      commit('CLEAR_LOADING');
      commit('SET_ERROR', error);
    }
  },
  async 'EDIT_CATEGORY'({commit}, {id, data}) {
    try {
      commit('CLEAR_ERROR');
      commit('SET_LOADING');
      await category.editCategory(id, data);
      commit('CLEAR_LOADING');
    } catch (error) {
      commit('CLEAR_LOADING');
      commit('SET_ERROR', error);
    }
  }
}

const getters = {
  getAllCategories: state => state.categories
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}