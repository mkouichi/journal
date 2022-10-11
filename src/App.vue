<template>
  <w-app>
    <TheHeader />
    <!-- <RouterView /> -->
    <w-flex grow>
      <aside>Nav menu</aside>
      <main class="grow">
        <RouterView />
      </main>
    </w-flex>
    <footer>Footer</footer>
  </w-app>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  components: { TheHeader },
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
  padding: 12px;
  color: #666;
}

footer {
  background-color: #e9f8fe;
  min-height: 60px;
}
aside {
  width: 15vw;
  background-color: #fef2ff;
}
main {
  max-width: 50vw;
  margin: auto;
}
</style>
