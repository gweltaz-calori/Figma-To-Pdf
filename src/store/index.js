import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  user: null
};

const mutations = {};

const actions = {};

const getters = {
  user: state => state.user
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
