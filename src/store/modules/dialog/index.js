import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      error: null,
      isEditing: false,
      dialogIsVisible: false,
    };
  },
  mutations,
  actions,
  getters,
};
