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
      title-class="error-dark1--bg white"
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
    <w-card
      v-else
      shadow
      v-for="entry in entries"
      :key="entry.id"
      class="mb8 pa3"
    >
      <template #title>
        <w-toolbar class="toolbar">
          <h2>{{ entry.title }}</h2>
          <div class="spacer"></div>
          <span class="ml2 caption">{{ entry.lastUpdated }}</span>
        </w-toolbar>
      </template>
      <p class="body-text">{{ entry.body }}</p>
      <template #actions>
        <div class="spacer"></div>
        <w-button lg class="ma1 teal-dark3--bg" :route="entry.id">
          View more
          <w-icon class="ml1">wi-chevron-right</w-icon>
        </w-button>
      </template>
    </w-card>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import "vue-cal/dist/vuecal.css";

import { getDataFromDB } from "@/helper-functions";

export default {
  mounted() {
    // Fetch data from database and store in Vuex
    getDataFromDB();
  },
  computed: {
    ...mapGetters({
      loading: "dialog/getLoadingState",
      error: "dialog/getErrorState",
      dialogIsVisible: "dialog/getDialogVisibility",
    }),
    ...mapGetters("journal", ["truncateEntryBody"]),
    entries() {
      // Get data from Vuex and show the first 100 characters
      const entries = this["truncateEntryBody"](100);

      // Filter out entries that do not have a lastUpdated property
      const validEntries = entries.filter((entry) => entry.lastUpdated);

      // Sort the valid entries by lastUpdated property in descending order
      return validEntries.sort(
        (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
      );
    },
  },
  methods: {
    ...mapActions("dialog", ["setError"]),
    confirmError() {
      this.setError(null);
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
}
#spinner {
  height: 65vh;
}
</style>