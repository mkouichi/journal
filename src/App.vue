<template>
  <TheHeader />
  <w-flex grow>
    <main class="grow mt8">
      <RouterView />
    </main>
  </w-flex>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

import TheHeader from "./components/layout/TheHeader.vue";

const store = useStore();

const login = () => store.dispatch("login");
const logout = () => store.dispatch("logout");
const setUserId = (payload) => store.dispatch("setUserId", payload);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      // Set login state to true
      login();

      // Set userId
      setUserId(user.uid);
    } else {
      // User is signed out
      // Set login state to false
      logout();
    }
  });
});
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
  margin: 32px auto 4rem auto;
}
.w-button.size--lg {
  height: 3rem;
  padding: 1.5rem;
}
.w-notification-manager {
  width: 350px;
}

@media (max-width: 835px) {
  main {
    margin: 32px 1rem 4rem 1rem;
  }
  .w-button.size--lg {
    height: 2.5rem;
    padding: 0.5rem;
  }
}
</style>
