import { createRouter, createWebHistory } from "vue-router";

import Calendar from "../pages/Calendar.vue";
import EntryList from "../pages/EntryList.vue";
import EntryDetails from "../pages/EntryDetails.vue";
import NewEntry from "../pages/NewEntry.vue";
import EditEntry from "../pages/EditEntry.vue";
import NotFound from "../pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/journal/calendar",
    },
    {
      path: "/journal/calendar",
      name: "calendar",
      component: Calendar,
    },
    {
      path: "/journal/list",
      name: "entry-list",
      component: EntryList,
    },
    { path: "/journal/new", name: "new-entry", component: NewEntry },
    {
      path: "/journal/:id/edit",
      name: "edit-entry",
      component: EditEntry,
      props: true,
    },
    {
      path: "/journal/:id",
      name: "journal-details",
      component: EntryDetails,
      props: true,
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
