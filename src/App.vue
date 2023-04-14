<template>
  <TheHeader />
  <w-flex grow>
    <main class="grow">
      <RouterView />
    </main>
  </w-flex>
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
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

* {
  box-sizing: border-box;
}
html {
  font-family: "Lato", sans-serif;
}
body {
  margin: 0;
}
main {
  max-width: 800px;
  margin: auto;
}
</style>
