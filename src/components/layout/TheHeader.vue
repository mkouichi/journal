<template>
  <header class="teal-dark2--bg">
    <h1><RouterLink to="/">Journal</RouterLink></h1>

    <!-- Menu icon for md (900px) and below -->
    <w-flex justify-end>
      <button class="mdu-hide nav-button" @click="openDrawer = 'left'" outline>
        <w-icon color="white">mdi mdi-menu</w-icon>
      </button>
    </w-flex>

    <!-- Drawer for md (900px) and below -->
    <w-drawer v-model="openDrawer" :[position]="true" class="drawer">
      <w-button
        @click="openDrawer = false"
        sm
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
    <nav class="smd-hide">
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
        <li v-if="!loggedIn"><RouterLink to="/signup">Sign Up</RouterLink></li>
        <li v-if="!loggedIn"><RouterLink to="/login">Log In</RouterLink></li>
        <li v-if="loggedIn" @click="signOut" class="header-item">Log Out</li>
      </ul>
    </nav>
  </header>
  <!-- TODO: Show a better error -->
  <div v-if="error">
    {{ error.errorMessage }}
  </div>

  <!-- Cancel edit dialog -->
  <ConfirmationDialog
    v-model="dialog.show"
    @discardDraft="discardDraft"
    @closeDialog="dialog.show = false"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import "@mdi/font/css/materialdesignicons.min.css";

import ConfirmationDialog from "../journal/ConfirmationDialog.vue";

export default {
  components: { ConfirmationDialog },
  data() {
    return {
      dialog: {
        show: false,
        width: "50vw",
      },
      error: null,
      openDrawer: false,
      loggedInItems: [
        {
          label: "Calendar View",
          id: "calendar",
          route: "/journal/calendar",
        },
        {
          label: "List View",
          id: "entry-list",
          route: "/journal/list",
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
      ],
      loggedOutItems: [
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
      ],
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: "getAuthState",
      hasUnsavedChanges: "journal/checkUnsavedChanges",
    }),

    position() {
      return this.openDrawer || "left";
    },
  },
  methods: {
    ...mapActions({
      setView: "setView",
      setHasUnsavedChanges: "journal/setHasUnsavedChanges",
    }),

    toggleNav() {
      console.log(this.navOpen);
      this.navOpen = !this.navOpen;
    },

    handleItemClick(item) {
      // Sign out when logout button is clicked
      if (item.id === "log-out") this.signOut();

      // Close the drawer
      this.openDrawer = false;
    },

    discardDraft() {
      // Set the state of unsaved changes to false
      this.setHasUnsavedChanges(false);

      // Close the confirmation dialog
      this.dialog.show = false;

      // Call the signOut method to log out the user
      this.signOut();
    },

    signOut() {
      // If there are unsaved changes, show the confirmation dialog
      if (this.hasUnsavedChanges) {
        this.dialog.show = true;
        return;
      }

      // If there are no unsaved changes, call the signOut method
      signOut(auth)
        .then(() => {
          // Redirect to the login page
          this.$router.push("/login");
        })
        .catch((error) => {
          // Set the error message in the form
          this.form.error = {
            errorCode: error.code,
            errorMessage: error.message,
          };
        });
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  padding: 0 2rem;
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
</style>