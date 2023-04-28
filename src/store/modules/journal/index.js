import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      entries: [],
      targetEntry: {},
      selectedDate: null,
      hasUnsavedChanges: false,
    };
  },
  mutations,
  actions,
  getters,
};
