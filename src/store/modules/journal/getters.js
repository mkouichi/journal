export default {
  entries(state) {
    return state.entries;
  },
  truncateEntryBody: (state) => (maxLength) => {
    const journalCopy = JSON.parse(JSON.stringify(state.entries));
    journalCopy.forEach((entry, index) => {
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
