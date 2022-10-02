export default {
  addEntry(state, payload) {
    const newEntry = {
      id: new Date().toISOString(),
      title: payload.title,
      body: payload.body,
    };
    state.entries.unshift(newEntry);
  },
  deleteEntry(state, payload) {
    state.entries = state.entries.filter((entry) => entry.id !== payload);
  },
  modifyEntry(state, payload) {
    let originalEntry = state.entries.find((entry) => entry.id === payload.id);
    originalEntry.title = payload.title;
    originalEntry.body = payload.body;
  },
};
