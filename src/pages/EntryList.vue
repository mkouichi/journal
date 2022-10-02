<template>
  <section>
    <ul>
      <JournalEntry
        v-for="entry in entries"
        :key="entry.id"
        :date="entry.date"
        :id="entry.id"
        :title="entry.title"
        :body="entry.body"
      />
    </ul>
  </section>
</template>

<script>
import JournalEntry from "../components/layout/JournalEntry.vue";

export default {
  components: { JournalEntry },
  computed: {
    entries() {
      return this.$store.getters["journal/truncateEntryBody"](100);
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 45rem;
}
</style>