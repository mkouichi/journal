export default {
  addEntry(context, payload) {
    context.commit("addEntry", payload);
  },
  deleteEntry(context, payload) {
    context.commit("deleteEntry", payload);
  },
  modifyEntry(context, payload) {
    context.commit("modifyEntry", payload);
  },
};
