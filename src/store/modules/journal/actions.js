export default {
  setLoading(context, payload) {
    context.commit("setLoading", payload);
  },
  setError(context, payload) {
    context.commit("setError", payload);
  },
  setEditing(context, payload) {
    context.commit("setEditing", payload);
  },
  confirmError(context) {
    context.commit("setError", { dataName: "journal", status: null });
  },
  setEntryData(context, payload) {
    context.commit("setEntryData", payload);
  },
};
