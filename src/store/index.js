import { createStore } from "vuex";

import DialogModule from "./modules/dialog/index.js";
import JournalModule from "./modules/journal/index.js";

const store = createStore({
  modules: {
    dialog: DialogModule,
    journal: JournalModule,
  },
  state() {
    return {
      userId: "",
      isLoggedIn: false,
      view: "calendar",
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
  },
});

export default store;
