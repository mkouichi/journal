import { createRouter, createWebHistory } from "vue-router";

import { auth } from "@/firebase";
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
      meta: { requiresAuth: false },
    },
    {
      path: "/login",
      name: "log-in",
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: "/journal/calendar",
      name: "calendar",
      component: Calendar,
      meta: { requiresAuth: true },
    },
    {
      path: "/journal/list",
      name: "entry-list",
      component: EntryList,
      meta: { requiresAuth: true },
    },
    {
      path: "/journal/new",
      name: "new-entry",
      component: NewEntry,
      meta: { requiresAuth: true },
    },
    {
      path: "/journal/:id/edit",
      name: "edit-entry",
      component: EditEntry,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/journal/:id",
      name: "journal-details",
      component: EntryDetails,
      props: true,
      meta: { requiresAuth: true },
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  auth.onAuthStateChanged((user) => {
    if (requiresAuth && !user) {
      next("/login");
    } else if ((to.path === "/login" || to.path === "/signup") && user) {
      next("/");
    } else {
      next();
    }
  });
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // Listen for changes to the authentication state
  auth.onAuthStateChanged((user) => {
    // If the route requires authentication and the user is not authenticated, redirect to login
    if (requiresAuth && !user) {
      next("/login");
    // If the user is authenticated and trying to access the login or signup page, redirect to home
    } else if ((to.path === "/login" || to.path === "/signup") && user) {
      next("/");
    // Otherwise, allow access to the requested route
    } else {
      next();
    }
  });
});


export default router;
