export default {
  state() {
    return {
      journals: [
        {
          id: "j1",
          title: "Beautiful day",
          body: "Today I woke up early and had some cereal for breakfast. I went for a walk with a coffee and saw a lot of squirrels!",
        },
        {
          id: "j2",
          title: "Sad day",
          body: "I had a good espresso in the house. I went for a walk afternoon and saw a squirrel run over.",
        },
      ],
    };
  },
  mutations: {
    addEntry(state, payload) {
      const newEntry = {
        id: new Date().toISOString(),
        title: payload.title,
        body: payload.body,
      };
      state.journals.unshift(newEntry);
    },
    deleteEntry(state, payload) {
      state.journals = state.journals.filter((entry) => entry.id !== payload);
    },
    modifyEntry(state, payload) {
      let originalEntry = state.journals.find(
        (entry) => entry.id === payload.id
      );
      originalEntry.title = payload.title;
      originalEntry.body = payload.body;
    },
  },
  actions: {
    addEntry(context, payload) {
      context.commit("addEntry", payload);
    },
    deleteEntry(context, payload) {
      context.commit("deleteEntry", payload);
    },
    modifyEntry(context, payload) {
      context.commit("modifyEntry", payload);
    },
  },
  getters: {
    journals(state) {
      return state.journals;
    },
    truncateJournalBody: (state) => (maxLength) => {
      const journalCopy = JSON.parse(JSON.stringify(state.journals));
      journalCopy.forEach((entry, index) => {
        if (entry.body.length > maxLength) {
          journalCopy[index].body = entry.body.substring(0, maxLength) + "...";
        }
      });
      return journalCopy;
    },
    getEntryById: (state) => (id) => {
      return state.journals.find((entry) => entry.id === id);
    },
  },
};
