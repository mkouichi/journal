<template>
  <section>
    <ul>
      <JournalItems
        v-for="journal in journals"
        :key="journal.id"
        :id="journal.id"
        :title="journal.title"
        :text="journal.text"
      >
      </JournalItems>
    </ul>
  </section>
  <RouterView />
</template>

<script>
import JournalItems from "../components/layout/JournalItems.vue";

export default {
  components: { JournalItems },
  computed: {
    journals() {
      return this.$store.getters["journals/trimmedJournals"];
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