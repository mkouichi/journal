export default {
  state() {
    return {
      journals: [
        {
          id: "j1",
          title: "Beautiful day",
          text: "Today I woke up early and had some cereal for breakfast. I went for a walk with a coffee and saw a lot of squirrels!",
        },
        {
          id: "j2",
          title: "Sad day",
          text: "I had a good espresso in the house. I went for a walk afternoon and saw a squirrel run over.",
        },
      ],
    };
  },
  mutations: {},
  actions: {},
  getters: {
    journals(state) {
      return state.journals;
    },
    truncateJournalText: (state) => (maxLength) => {
      const journalCopy = JSON.parse(JSON.stringify(state.journals));
      journalCopy.forEach((entry, index) => {
        if (entry.text.length > maxLength) {
          journalCopy[index].text = entry.text.substring(0, maxLength) + "...";
        }
      });
      return journalCopy;
    },
    getEntryById: (state) => (id) => {
      return state.journals.find((item) => item.id === id);
    },
  },
};
