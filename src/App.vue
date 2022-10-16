<template>
  <w-app>
    <TheHeader />
    <w-flex grow>
      <aside v-if="loggedIn">Nav menu</aside>
      <main class="grow">
        <RouterView />
      </main>
    </w-flex>
    <footer>Footer</footer>
  </w-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  components: { TheHeader },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        // Set login state to true
        this.login();
      } else {
        // User is signed out
        // Set login state to false
        this.logout();
      }
    });
  },
  computed: {
    ...mapGetters({ loggedIn: "getAuthState" }),
  },
  methods: {
    ...mapActions(["login", "logout"]),
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

/* Demo styles - can be discarded. */
/* .w-app {
  padding: 4px;
  background-color: #fffeed;
} */

footer,
aside,
main {
  margin: 4px;
  padding: 1rem;
  color: #666;
}
/* section {
  padding: 1rem;
} */
footer {
  background-color: #e9f8fe;
  min-height: 60px;
}
aside {
  width: 15vw;
  background-color: #fef2ff;
}
main {
  max-width: 800px;
  margin: 2rem auto;
}
</style>
