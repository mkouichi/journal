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
      <JournalEntry v-for="entry in entries" :key="entry.id" :entry="entry" />
    </ul>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import "vue-cal/dist/vuecal.css";

import { getDataFromDB } from "../helper-functions";
import JournalEntry from "../components/journal/JournalEntry.vue";

export default {
  components: { JournalEntry },
  mounted() {
    getDataFromDB();
  },
  computed: {
    ...mapGetters("journal", [
      "getLoadingState",
      "getErrorState",
      "truncateEntryBody",
    ]),
    entries() {
      // Get data from Vuex and show the first 100 characters
      return this["truncateEntryBody"](100);
    },
    loading() {
      return this.$store.getters["journal/getLoadingState"]("journal");
    },
    error() {
      this.$store.getters["journal/getErrorState"]("journal");
    },
  },
  methods: {
    ...mapActions("journal", [
      "setEntryData",
      "subscribeToDB",
      "setLoading",
      "confirmError",
    ]),
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