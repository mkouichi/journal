import { createRouter, createWebHistory } from "vue-router";

import store from "../store";
import Calendar from "../pages/journal/Calendar.vue";
import EntryList from "../pages/journal/EntryList.vue";
import EntryDetails from "../pages/journal/EntryDetails.vue";
import NewEntry from "../pages/journal/NewEntry.vue";
import EditEntry from "../pages/journal/EditEntry.vue";
import NotFound from "../pages/NotFound.vue";
import Signup from "../pages/auth/Signup.vue";
import Login from "../pages/auth/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/journal/calendar",
    },
    {
      path: "/signup",
      name: "sign-up",
      component: Signup,
    },
    {
      path: "/login",
      name: "log-in",
      component: Login,
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

router.beforeEach((to) => {
  const isLoggedIn = store.getters.getAuthState;

  if (!isLoggedIn) {
    if (to.path === "/login" || to.path === "/signup") {
      // User is not logged in, trying to log in or sign up
      return;
    } else {
      // User is not logged in, trying to go somewhere
      return "/login";
    }
  } else {
    // User is logged in
    return;
  }
});

export default router;
