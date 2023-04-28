export default {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  showDialog(state) {
    state.dialogIsVisible = true;
  },
  hideDialog(state) {
    state.dialogIsVisible = false;
  },
};
