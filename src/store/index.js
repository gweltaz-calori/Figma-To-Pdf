import { getCookie, deleteCookie } from "@/js/utils/cookies";

import Vue from "vue";
import Vuex from "vuex";
import { logout } from "@/api";

Vue.use(Vuex);

const state = {
  user: {
    access_token: getCookie("access_token"),
    expires_in: getCookie("expires_in"),
    refresh_token: getCookie("refresh_token")
  }
};

const mutations = {
  logoutUser(state) {
    state.user.access_token = null;
    state.user.expires_in = null;
    state.user.refresh_token = null;

    ["access_token", "expires_in", "refresh_token"].map(cookieName =>
      deleteCookie(cookieName)
    );
  }
};

const actions = {
  async logout({ commit }) {
    commit("logoutUser");
  }
};

const getters = {
  user: state => state.user
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
