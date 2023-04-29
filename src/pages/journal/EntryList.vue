<template>
  <section>
    <!-- Loading -->
    <w-flex v-if="loading" id="spinner" justify-center align-center>
      <w-spinner lg />
    </w-flex>

    <!-- Error -->
    <w-dialog
      v-else-if="error"
      width="50vw"
      title-class="error--bg white"
      @close="confirmError"
    >
      <template #title>
        <w-icon class="mr2">mdi mdi-tune</w-icon>
        <span class="title2">Error</span>
      </template>
      <p>{{ error }}</p>
      <template #actions>
        <div class="spacer"></div>
        <w-button lg outline @click="confirmError">Okay</w-button>
      </template>
    </w-dialog>

    <!-- No entry -->
    <p v-else-if="!entries || entries.length === 0">No entry found</p>

    <!-- Entry found -->
    <div v-else-if="entries.length > 0">
      <w-flex class="xs12 sm6 mla">
        <span class="pt1">Sorted by: </span>
        <w-select
          v-model="selection"
          :items="sortItems"
          fit-to-content
          class="pl3"
          no-unselect
        ></w-select>
      </w-flex>
      <w-card v-for="entry in entries" :key="entry.id" class="mb8 pa3">
        <template #title>
          <w-toolbar class="toolbar">
            <h2>{{ entry.title }}</h2>
            <div class="spacer"></div>
            <span class="caption">{{ entry.lastUpdated }}</span>
          </w-toolbar>
        </template>
        <p class="body-text">{{ entry.body }}</p>
        <template #actions>
          <div class="spacer"></div>
          <w-button lg class="ma1 teal-dark2--bg" :route="entry.id">
            View more
            <w-icon class="ml1">wi-chevron-right</w-icon>
          </w-button>
        </template>
      </w-card>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import "vue-cal/dist/vuecal.css";

import { loadJournalEntries } from "@/helper-functions";

export default {
  async created() {
    // Fetch data from database and store it in Vuex
    await loadJournalEntries();

    // Show initial data
    // Get data from Vuex and store it in data property
    this.initEntries();
  },
  data: () => ({
    sortItems: [
      { label: "Newest first (default)", value: "newest" },
      { label: "Oldest first", value: "oldest" },
    ],
    selection: "newest",
    entries: [],
    error: null,
  }),
  watch: {
    // Watch for changes to the selection property
    selection(selection) {
      // Call the method with the new selection value
      this.sortEntriesByLastUpdated(selection);
    },
  },
  computed: {
    ...mapGetters({
      loading: "getLoadingState",
      truncateEntryBody: "journal/truncateEntryBody",
    }),
  },
  methods: {
    confirmError() {
      this.error = null;
    },
    async initEntries() {
      // Get data from Vuex and trim the body to the first 100 characters, then store it in data property
      this.entries = await this.truncateEntryBody(100);

      // Sort initially by lastUpdated in descending order
      this.sortEntriesByLastUpdated("newest");
    },
    sortEntriesByLastUpdated(selection) {
      // Sort entries based on selection
      switch (selection) {
        case "newest":
          this.entries.sort(
            (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
          );
          break;
        case "oldest":
          this.entries.sort(
            (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated)
          );
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.body-text {
  font-size: 1.1rem;
}
.toolbar {
  padding-top: 1rem;
  padding-bottom: 1rem;
  border: none;
  display: block;
}
.w-select {
  margin: auto 0 2rem auto;
}
.w-button.size--lg {
  padding: 1rem 1rem 1rem 1.5rem;
}

#spinner {
  height: 65vh;
}

@media (max-width: 835px) {
  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .toolbar {
    display: block;
    width: 80vw;
  }
  .w-button.size--lg {
    padding: 0.5rem 0.5rem 0.5rem 1rem;
  }
}
</style>