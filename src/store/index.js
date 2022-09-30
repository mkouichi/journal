import { createStore } from "vuex";

import JournalModule from "./modules/index.js";

const store = createStore({
  modules: { journals: JournalModule },
});

export default store;
