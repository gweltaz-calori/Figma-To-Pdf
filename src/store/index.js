import { getCookie } from "@/js/utils/cookies";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  user: {
    access_token: getCookie("access_token"),
    expires_in: getCookie("expires_in"),
    refresh_token: getCookie("refresh_token")
  }
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
