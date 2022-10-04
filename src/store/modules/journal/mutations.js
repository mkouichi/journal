// import { v4 as uuidv4 } from "uuid";
// import moment from "moment";

export default {
  setLoading(state, payload) {
    state.status[payload.dataName].loading = payload.status;
  },
  setError(state, payload) {
    state.status[payload.dataName].error = payload.status;
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
  // addEntry(state, payload) {
  //   const newEntry = {
  //     date: moment().format("ddd, MMM D, YYYY, kk:mm"),
  //     id: uuidv4(),
  //     title: payload.title,
  //     body: payload.body,
  //   };
  //   state.entries.unshift(newEntry);
  // },
  // deleteEntry(state, payload) {
  //   state.entries = state.entries.filter((entry) => entry.id !== payload);
  // },
  // modifyEntry(state, payload) {
  //   let originalEntry = state.entries.find((entry) => entry.id === payload.id);
  //   originalEntry.title = payload.title;
  //   originalEntry.body = payload.body;
  // },
};
