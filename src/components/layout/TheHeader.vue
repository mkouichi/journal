<template>
  <header class="teal-dark2--bg">
    <div id="header-container" class="d-flex grow">
      <h1 id="logo"><RouterLink to="/">Journal</RouterLink></h1>
      <div class="spacer"></div>

      <!-- Menu icon for md (900px) and below -->
      <w-flex justify-end class="mdu-hide">
        <button class="nav-button" @click="openDrawer = 'left'" outline>
          <w-icon color="white">mdi mdi-menu</w-icon>
        </button>
      </w-flex>

      <!-- Drawer for md (900px) and below -->
      <w-drawer v-model="openDrawer" :[position]="true" class="drawer">
        <w-button
          @click="openDrawer = false"
          lg
          outline
          round
          absolute
          icon="wi-cross"
        >
        </w-button>

        <!-- Menu items -->
        <!-- User is logged in -->
        <w-list
          v-if="loggedIn"
          :items="loggedInItems"
          nav
          item-class="nav-item w-flex justify-center pa8"
          @item-click="handleItemClick"
          class="grow teal-dark2"
        >
          <template #item="{ item }">
            <span>{{ item.label }}</span>
          </template>
        </w-list>

        <!-- User is not logged in -->
        <w-list
          v-if="!loggedIn"
          :items="loggedOutItems"
          nav
          item-class="nav-item w-flex justify-center pa8"
          @item-click="handleItemClick"
          class="grow teal-dark2"
        >
          <template #item="{ item }">
            <span>{{ item.label }}</span>
          </template>
        </w-list>
      </w-drawer>

      <!-- Menu items for md (900px) and above -->
      <nav class="smd-hide mdu-d-flex">
        <ul class="w-flex justify-center align-center">
          <li v-if="loggedIn">
            <RouterLink to="/journal/calendar" @click="setView('calendar')">
              Calendar View
            </RouterLink>
          </li>
          <li v-if="loggedIn">
            <RouterLink to="/journal/list" @click="setView('list')">
              List View
            </RouterLink>
          </li>
          <li v-if="loggedIn">
            <RouterLink to="/journal/new">New Entry</RouterLink>
          </li>
          <li v-if="!loggedIn">
            <RouterLink to="/signup">Sign Up</RouterLink>
          </li>
          <li v-if="!loggedIn"><RouterLink to="/login">Log In</RouterLink></li>
          <li v-if="loggedIn" @click="signOutUser" class="header-item">
            Log Out
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <!-- TODO: Show a better error -->
  <div v-if="error">
    {{ error.errorMessage }}
  </div>

  <!-- Cancel edit dialog -->
  <Teleport to="body">
    <ConfirmationDialog
      v-model="dialog.show"
      @discard-draft="discardDraft"
      @close-dialog="dialog.show = false"
    />
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed, inject } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import "@mdi/font/css/materialdesignicons.min.css";

import ConfirmationDialog from "../journal/ConfirmationDialog.vue";

const store = useStore();

const error = ref(null);

const dialog = reactive({
  show: false,
  width: "50vw",
});

const loggedIn = computed(() => store.getters.getAuthState);
const loggedInItems = [
  {
    label: "Calendar View",
    id: "calendar",
    route: "/journal/calendar",
    view: "calendar",
  },
  {
    label: "List View",
    id: "entry-list",
    route: "/journal/list",
    view: "list",
  },
  {
    label: "New Entry",
    id: "new-entry",
    route: "/journal/new",
  },
  {
    label: "Log out",
    id: "log-out",
    route: "/logout",
  },
];
const loggedOutItems = [
  {
    label: "Sign up",
    id: "sign-up",
    route: "/signup",
  },
  {
    label: "Log in",
    id: "log-in",
    route: "/login",
  },
];

const openDrawer = ref(false);

const position = computed(() => {
  return openDrawer.value || "left";
});

const setView = (payload) => store.dispatch("setView", payload);

const handleItemClick = (item) => {
  // Set view when calendar or list view button is clicked
  // Sign out when logout button is clicked
  switch (item.id) {
    case "calendar":
    case "entry-list":
      setView(item.view);
      break;
    case "log-out":
      signOutUser();
      break;
    default:
      break;
  }

  // Close the drawer
  openDrawer.value = false;
};

const discardDraft = () => {
  const setHasUnsavedChanges = (payload) =>
    store.dispatch("journal/setHasUnsavedChanges", payload);

  // Set the state of unsaved changes to false
  setHasUnsavedChanges(false);

  // Close the confirmation dialog
  dialog.show = false;

  // Call the signOutUser method to log out the user
  signOutUser();
};

const router = useRouter();
const signOutUser = () => {
  const hasUnsavedChanges = computed(
    () => store.getters["journal/checkUnsavedChanges"]
  );

  // If there are unsaved changes, show the confirmation dialog
  if (hasUnsavedChanges.value) {
    dialog.show = true;
    return;
  }

  // If there are no unsaved changes, call the signOut method
  signOut(auth)
    .then(() => {
      // Redirect to the login page
      router.push("/login");

      // Show notification
      notifyLogOut();
    })
    .catch((error) => {
      console.log(error);
      // Set the error message in the form
      error.value = {
        errorCode: error.code,
        errorMessage: error.message,
      };
    });
};

const $waveui = inject("$waveui");

// Notification
const notifyLogOut = () => {
  $waveui.notify({
    lg: true,
    message: "See you soon!",
    timeout: 3000,
    success: true,
    plain: true,
    shadow: true,
    dismiss: true,
    transition: "bounce",
  });
};
</script>

<style scoped>
header {
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
header a {
  text-decoration: none;
  color: #fff;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}
a:active,
a:hover,
a.router-link-active,
.header-item:hover {
  border: 1px solid #fff;
  cursor: pointer;
}
h1 {
  margin: 0;
}
h1 a {
  color: white;
  margin: 0;
}
h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}
header ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  margin: 0 0.2rem;
  font-size: 1.2rem;
}
.nav-button {
  cursor: pointer;
  padding: 0.75rem;
  background-color: inherit;
  border: none;
  color: #fff;
  font-size: 2rem;
}
.grow {
  font-size: 1.2rem;
}
.header-item {
  color: #fff;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}
#logo > a {
  padding: 0.75rem;
}
#header-container {
  max-width: 1100px;
}

@media (max-width: 1200px) {
  #header-container {
    margin: 0 3rem;
  }
}
@media (max-width: 835px) {
  #header-container {
    margin: 0 1rem;
  }
}
</style>