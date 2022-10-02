import { v4 as uuidv4 } from "uuid";

export default {
  addEntry(state, payload) {
    const newEntry = {
      id: uuidv4(),
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
