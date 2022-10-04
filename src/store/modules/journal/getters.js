export default {
  getLoadingState: (state) => (dataName) => {
    return state.status[dataName].loading;
  },
  getErrorState: (state) => (dataName) => {
    return state.status[dataName].error;
  },
  entries(state) {
    return state.entries;
  },
  truncateEntryBody: (state) => (maxLength) => {
    // Make a deep copy of entries stored in Vuex
    const journalCopy = JSON.parse(JSON.stringify(state.entries));

    journalCopy.forEach((entry, index) => {
      // When the characters of an entry body exceeds specified maxLength, trim it
      if (entry.body.length > maxLength) {
        journalCopy[index].body = entry.body.substring(0, maxLength) + "...";
      }
    });
    return journalCopy;
  },
  getEntryById: (state) => (id) => {
    return state.entries.find((entry) => entry.id === id);
  },
};
