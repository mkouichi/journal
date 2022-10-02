import { createStore } from "vuex";

import JournalModule from "./modules/index.js";

const store = createStore({
  modules: { journal: JournalModule },
  state() {
    return {
      dialogIsVisible: false,
    };
  },
  mutations: {
    showDialog(state) {
      state.dialogIsVisible = true;
    },
    hideDialog(state) {
      state.dialogIsVisible = false;
    },
  },
  actions: {
    showDialog(context) {
      context.commit("showDialog");
    },
    hideDialog(context) {
      context.commit("hideDialog");
    },
  },
  getters: {
    dialogIsVisible(state) {
      return state.dialogIsVisible;
    },
  },
});

export default store;
