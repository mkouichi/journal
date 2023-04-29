import { createStore } from "vuex";

import JournalModule from "./modules/journal/index.js";

const store = createStore({
  modules: {
    journal: JournalModule,
  },
  state() {
    return {
      userId: "",
      isLoggedIn: false,
      view: "calendar",
      loading: false,
    };
  },
  mutations: {
    setUserId(state, payload) {
      state.userId = payload;
    },
    setAuth(state, payload) {
      state.isLoggedIn = payload;
    },
    setView(state, payload) {
      state.view = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    setUserId(context, payload) {
      context.commit("setUserId", payload);
    },
    login(context) {
      context.commit("setAuth", true);
    },
    logout(context) {
      context.commit("setAuth", false);
    },
    setView(context, payload) {
      context.commit("setView", payload);
    },
    setLoading(context, payload) {
      context.commit("setLoading", payload);
    },
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },
    getAuthState(state) {
      return state.isLoggedIn;
    },
    getView(state) {
      return state.view;
    },
    getLoadingState(state) {
      return state.loading;
    },
  },
});

export default store;
