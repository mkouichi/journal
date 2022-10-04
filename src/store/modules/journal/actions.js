export default {
  confirmError(context) {
    context.commit("setError", { dataName: "journal", status: null });
  },
  fetchEntries(context) {
    const url =
      "https://vue-journal-7a97c-default-rtdb.firebaseio.com/journal.json";

    context.commit("setLoading", { dataName: "journal", status: true });

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        context.commit("setLoading", { dataName: "journal", status: false });
        const fetchedEntryData = [];
        for (const firebaseId in data) {
          fetchedEntryData.unshift({
            date: data[firebaseId].date,
            id: data[firebaseId].id,
            title: data[firebaseId].title,
            body: data[firebaseId].body,
          });
        }
        context.commit("setEntryData", fetchedEntryData);
      })
      .catch((error) => {
        console.log(error);
        context.commit("setLoading", { dataName: "journal", status: false });
        context.commit("setError", {
          dataName: "journal",
          status: "Failed to fetch data - please try again later.",
        });
      });
  },
  // fetchEntryById(context, payload) {
  //   let foundEntry = {};
  //   const url =
  //     "https://vue-journal-7a97c-default-rtdb.firebaseio.com/journal.json";

  //   context.commit("setLoading", { dataName: "journal", status: true });
  //   context.commit("setError", { dataName: "journal", status: null });

  //   fetch(url)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //     })
  //     .then((data) => {
  //       context.commit("setLoading", { dataName: "journal", status: false });

  //       for (const firebaseId in data) {
  //         if (data[firebaseId].id === payload.id) {
  //           foundEntry = {
  //             date: data[firebaseId].date,
  //             id: data[firebaseId].id,
  //             title: data[firebaseId].title,
  //             body: data[firebaseId].body,
  //           };
  //         }
  //       }
  //       console.log(foundEntry);
  //       return foundEntry;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       context.commit("setLoading", { dataName: "journal", status: false });
  //       context.commit("setError", {
  //         dataName: "journal",
  //         status: "Failed to fetch data - please try again later.",
  //       });
  //     });
  // },
  // addEntry(context, payload) {
  //   context.commit("addEntry", payload);
  // },
  // deleteEntry(context, payload) {
  //   context.commit("deleteEntry", payload);
  // },
  // modifyEntry(context, payload) {
  //   context.commit("modifyEntry", payload);
  // },
};
