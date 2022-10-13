import { createRouter, createWebHistory } from "vue-router";

import Calendar from "../pages/journal/Calendar.vue";
import EntryList from "../pages/journal/EntryList.vue";
import EntryDetails from "../pages/journal/EntryDetails.vue";
import NewEntry from "../pages/journal/NewEntry.vue";
import EditEntry from "../pages/journal/EditEntry.vue";
import NotFound from "../pages/NotFound.vue";
import UserAuth from "../pages/auth/UserAuth.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/journal/calendar",
    },
    {
      path: "/auth",
      name: "user-auth",
      component: UserAuth,
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
    {
      path: "/journal/new",
      name: "new-entry",
      component: NewEntry,
    },
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
