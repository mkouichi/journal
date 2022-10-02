<template>
  <section>
    <ul>
      <JournalItems
        v-for="journal in journals"
        :key="journal.id"
        :id="journal.id"
        :title="journal.title"
        :body="journal.body"
      />
    </ul>
  </section>
</template>

<script>
import JournalItems from "../components/layout/JournalItems.vue";

export default {
  components: { JournalItems },
  computed: {
    journals() {
      return this.$store.getters.truncateJournalBody(100);
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 40rem;
}
</style>