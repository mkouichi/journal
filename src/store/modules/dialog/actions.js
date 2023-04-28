export default {
  setLoading(context, payload) {
    context.commit("setLoading", payload);
  },
  setError(context, payload) {
    context.commit("setError", payload);
  },
  showDialog(context) {
    context.commit("showDialog");
  },
  hideDialog(context) {
    context.commit("hideDialog");
  },
};
