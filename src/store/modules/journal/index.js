import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      status: {
        journal: {
          loading: false,
          error: null,
          isEditing: false,
        },
      },
      entries: [],
    };
  },
  mutations,
  actions,
  getters,
};
