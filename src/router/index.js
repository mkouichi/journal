import { createRouter, createWebHistory } from "vue-router";

import JournalList from "../pages/JournalList.vue";
import JournalDetails from "../pages/JournalDetails.vue";
import NewEntry from "../pages/NewEntry.vue";
import NotFound from "../pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/journal",
    },
    {
      path: "/journal",
      name: "journal-list",
      component: JournalList,
    },
    { path: "/journal/new", name: "new-entry", component: NewEntry },
    {
      path: "/journal/:id",
      name: "journal-details",
      component: JournalDetails,
      props: true,
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
