export default {
  setLoading(state, payload) {
    state.status[payload.dataName].loading = payload.status;
  },
  setError(state, payload) {
    state.status[payload.dataName].error = payload.status;
  },
  setEditing(state, payload) {
    state.status[payload.dataName].isEditing = payload.status;
  },
  setEntryData(state, payload) {
    state.entries = payload.map((entry) => {
      return {
        date: entry.date,
        id: entry.id,
        title: entry.title,
        body: entry.body,
      };
    });
  },
};
