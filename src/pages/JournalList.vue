<template>
  <section>
    <ul>
      <li
        v-for="journal in journals"
        :key="journal.id"
        :title="journal.title"
        :text="journal.text"
      >
        {{ journal.title }}
      </li>
    </ul>
  </section>
  <RouterView />
</template>

<script>
export default {
  computed: {
    journals() {
      return this.$store.getters["journals/journals"];
    },
  },
};
</script>