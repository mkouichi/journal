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
      // dialogIsVisible: false,
      view: "calendar",
    };
  },
  mutations: {
    // showDialog(state) {
    //   state.dialogIsVisible = true;
    // },
    // hideDialog(state) {
    //   state.dialogIsVisible = false;
    // },
    setView(state, payload) {
      state.view = payload;
    },
  },
  actions: {
    // showDialog(context) {
    //   context.commit("showDialog");
    // },
    // hideDialog(context) {
    //   context.commit("hideDialog");
    // },
    setView(context, payload) {
      context.commit("setView", payload);
    },
  },
  getters: {
    // dialogIsVisible(state) {
    //   return state.dialogIsVisible;
    // },
    getView(state) {
      return state.view;
    },
  },
});

export default store;
