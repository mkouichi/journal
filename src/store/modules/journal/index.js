import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      entries: [
        {
          date: "Sun, Oct 2, 2022, 18:07",
          id: "j2",
          title: "Sad day",
          body: "I had a good espresso in the house. I went for a walk afternoon and saw a squirrel run over.",
        },
        {
          date: "Sat, Oct 1, 2022, 18:07",
          id: "j1",
          title: "Beautiful day",
          body: "Today I woke up early and had some cereal for breakfast. I went for a walk with a coffee and saw a lot of squirrels!",
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
