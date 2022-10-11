export default {
  getLoadingState(state) {
    return state.loading;
  },
  getErrorState(state) {
    return state.error;
  },
  getEditingState(state) {
    return state.isEditing;
  },
  getDialogVisibility(state) {
    return state.dialogIsVisible;
  },
};
