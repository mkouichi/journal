<template>
  <header class="teal-dark3--bg">
    <h1><RouterLink to="/">Journal</RouterLink></h1>

    <w-flex justify-end>
      <button class="mdu-hide nav-button" @click="openDrawer = 'left'" outline>
        <w-icon color="white">mdi mdi-menu</w-icon>
      </button>
    </w-flex>

    <w-drawer v-model="openDrawer" :[position]="true">
      <w-button
        @click="openDrawer = false"
        sm
        outline
        round
        absolute
        icon="wi-cross"
      >
      </w-button>
    </w-drawer>

    <nav class="smd-hide">
      <ul>
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
          <RouterLink to="/journal/new">+ New Entry</RouterLink>
        </li>
        <li v-if="!loggedIn"><RouterLink to="/signup">Sign up</RouterLink></li>
        <li v-if="!loggedIn"><RouterLink to="/login">Log in</RouterLink></li>
        <li v-if="loggedIn" @click="signOut" class="header-item">Log out</li>
      </ul>
    </nav>
  </header>
  <!-- TODO: Show a better error -->
  <div v-if="error">
    {{ error.errorMessage }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import "@mdi/font/css/materialdesignicons.min.css";

export default {
  data() {
    return {
      error: null,
      openDrawer: false,
    };
  },
  computed: {
    ...mapGetters({ loggedIn: "getAuthState" }),

    position() {
      return this.openDrawer || "left";
    },
  },
  methods: {
    ...mapActions(["setView"]),
    toggleNav() {
      console.log(this.navOpen);
      this.navOpen = !this.navOpen;
    },
    signOut() {
      signOut(auth)
        .then(() => {
          // Redirect to the login page
          this.$router.push("/login");
        })
        .catch((error) => {
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

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: end;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
.header-item {
  color: #fff;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}
</style>