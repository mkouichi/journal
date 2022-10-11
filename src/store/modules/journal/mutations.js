export default {
  setEntryData(state, payload) {
    state.entries = payload.map((entry) => {
      return {
        date: entry.date,
        id: entry.id,
        title: entry.title,
        body: entry.body,
        start: entry.start,
        end: entry.end,
      };
    });
  },
  setTargetEntry(state, payload) {
    state.targetEntry = payload;
  },
  setSelectedDate(state, payload) {
    state.selectedDate = payload;
  },
};
