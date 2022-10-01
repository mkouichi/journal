import { createStore } from "vuex";

import JournalModule from "./modules/index.js";

const store = createStore({
  modules: { journals: JournalModule },
  state() {
    return {
      discardDialogIsVisible: false,
      inputIsInvalid: false,
    };
  },
  mutations: {
    showDialog(state) {
      state.discardDialogIsVisible = true;
    },
    hideDialog(state) {
      state.discardDialogIsVisible = false;
    },
    setInputIsInvalid(state, payload) {
      state.inputIsInvalid = payload;
    },
  },
  actions: {
    showDialog(context) {
      context.commit("showDialog");
    },
    hideDialog(context) {
      context.commit("hideDialog");
    },
    setInputIsInvalid(context, payload) {
      context.commit("setInputIsInvalid", payload);
    },
  },
  getters: {
    discardDialogIsVisible(state) {
      return state.discardDialogIsVisible;
    },
    inputIsInvalid(state) {
      return state.inputIsInvalid;
    },
  },
});

export default store;
