export default {
  setEntryData(context, payload) {
    context.commit("setEntryData", payload);
  },
  setTargetEntry(context, payload) {
    context.commit("setTargetEntry", payload);
  },
  setSelectedDate(context, payload) {
    context.commit("setSelectedDate", payload);
  },
  setHasUnsavedChanges(context, payload) {
    context.commit("setHasUnsavedChanges", payload);
  },
};
