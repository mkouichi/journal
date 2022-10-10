<template>
  <section>
    <w-flex v-if="loading" justify-center>
      <w-spinner lg />
    </w-flex>
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
    <w-card
      v-else
      tile
      shadow
      v-for="entry in entries"
      :key="entry.id"
      class="mb7 mt3"
    >
      <template #title>
        <w-toolbar class="toolbar">
          <div class="title1">{{ entry.title }}</div>
          <div class="spacer"></div>
          <span class="ml2 date">{{ entry.date }}</span>
        </w-toolbar>
      </template>
      <p>{{ entry.body }}</p>
      <w-flex justify-end>
        <w-button class="ma1 m" bg-color="primary" :route="entry.id">
          View more
          <w-icon class="ml1">wi-chevron-right</w-icon>
        </w-button>
      </w-flex>
    </w-card>
    <!-- <ul v-else>
      <JournalEntry v-for="entry in entries" :key="entry.id" :entry="entry" />
    </ul> -->
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
/* ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 45rem;
} */
.toolbar {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.date {
  font-size: 1rem;
}
</style>