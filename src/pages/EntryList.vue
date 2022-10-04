<template>
  <section>
    <p v-if="loading">Loading...</p>
    <BaseModal v-else-if="error" :open="error" @close="confirmError">
      <template #header>
        <h2>Error</h2>
      </template>
      <template #default>
        <p>{{ error }}</p>
      </template>
      <template #actions>
        <BaseButton @click="confirmError">Okay</BaseButton>
      </template>
    </BaseModal>
    <p v-else-if="!entries || entries.length === 0">No entry found</p>
    <ul v-else>
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
import { mapActions } from "vuex";
import JournalEntry from "../components/layout/JournalEntry.vue";

export default {
  components: { JournalEntry },
  data() {
    return {
      loading: this.$store.getters["journal/getLoadingState"]("journal"),
      error: this.$store.getters["journal/getErrorState"]("journal"),
    };
  },
  created() {
    // Get initial data from Firebase
    this.$store.dispatch("journal/fetchEntries");
  },
  computed: {
    entries() {
      // Get data from Vuex and show the first 100 characters
      return this.$store.getters["journal/truncateEntryBody"](100);
    },
  },
  methods: {
    ...mapActions(["confirmError"]),
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