export default {
  setEntryData(state, payload) {
    state.entries = payload.map((entry) => {
      return {
        id: entry.id,
        title: entry.title,
        body: entry.body,
        start: entry.start,
        end: entry.end,
        lastUpdated: entry.lastUpdated,
      };
    });
  },
  setTargetEntry(state, payload) {
    state.targetEntry = payload;
  },
  setSelectedDate(state, payload) {
    state.selectedDate = payload;
  },
  setHasUnsavedChanges(state, payload) {
    state.hasUnsavedChanges = payload;
  },
};
