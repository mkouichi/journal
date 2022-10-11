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
      view: "calendar",
    };
  },
  mutations: {
    setView(state, payload) {
      state.view = payload;
    },
  },
  actions: {
    setView(context, payload) {
      context.commit("setView", payload);
    },
  },
  getters: {
    getView(state) {
      return state.view;
    },
  },
});

export default store;
