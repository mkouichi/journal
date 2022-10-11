<template>
  <header class="teal-dark3--bg">
    <h1><RouterLink to="/">Journal</RouterLink></h1>
    <nav>
      <ul>
        <li>
          <RouterLink to="/journal/calendar" @click="setView('calendar')">
            Calendar View
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/journal/list" @click="setView('list')">
            List View
          </RouterLink>
        </li>
        <li><RouterLink to="/journal/new">+ New Entry</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setView"]),
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  padding: 0 2rem;
  /* background-color: #3d008d; */
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
a.router-link-active {
  border: 1px solid #fff;
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
  margin: 0 0.5rem;
}
</style>