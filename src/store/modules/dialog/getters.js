export default {
  getLoadingState(state) {
    return state.loading;
  },
  getErrorState(state) {
    return state.error;
  },
  getDialogVisibility(state) {
    return state.dialogIsVisible;
  },
};
