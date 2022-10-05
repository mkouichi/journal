export default {
  setLoading(context, payload) {
    context.commit("setLoading", payload);
  },
  setError(context, payload) {
    context.commit("setError", payload);
  },
  confirmError(context) {
    context.commit("setError", { dataName: "journal", status: null });
  },
  setEntryData(context, payload) {
    context.commit("setEntryData", payload);
  },
  // addEntry(context, payload) {
  //   context.commit("addEntry", payload);
  // },
  // deleteEntry(context, payload) {
  //   context.commit("deleteEntry", payload);
  // },
  // modifyEntry(context, payload) {
  //   context.commit("modifyEntry", payload);
  // },
};
