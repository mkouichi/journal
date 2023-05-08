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
        <w-icon class="mr2">mdi mdi-alert-circle</w-icon>
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
            <div class="caption mt2">Date: {{ entry.start }}</div>
            <div class="caption mt2">Updated: {{ entry.lastUpdated }}</div>
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

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import "vue-cal/dist/vuecal.css";

import { loadJournalEntries } from "@/helper-functions";

const store = useStore();

const sortItems = [
  { label: "Date (Descending) (default)", value: "date descending" },
  { label: "Date (Ascending)", value: "date ascending" },
  { label: "Date updated (Descending)", value: "updated descending" },
  { label: "Date updated (Ascending)", value: "updated ascending" },
];

const loading = computed(() => store.getters.getLoadingState);
const userId = computed(() => store.getters.getUserId);
const entries = ref([]);

// Load entries for the user when the component is mounted
await loadJournalEntries(userId.value);

const truncateEntryBody = computed(() =>
  store.getters["journal/truncateEntryBody"](100)
);

const initEntries = async () => {
  // Get data from Vuex and trim the body to the first 100 characters, then store it in data property
  entries.value = await truncateEntryBody.value;

  // Sort initially by date in descending order
  sortEntriesByLastUpdated("date descending");
};

// Show initial data
// Get data from Vuex and store it in data property
initEntries();

const selection = ref("date descending");

const sortEntriesByLastUpdated = (selection) => {
  // Sort entries based on selection
  switch (selection) {
    case "date descending":
      entries.value.sort((a, b) => new Date(b.start) - new Date(a.start));
      break;
    case "date ascending":
      entries.value.sort((a, b) => new Date(a.start) - new Date(b.start));
      break;
    case "updated descending":
      entries.value.sort(
        (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
      );
      break;
    case "updated ascending":
      entries.value.sort(
        (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated)
      );
      break;
    default:
      break;
  }
};

// Watch for changes to the selection property
watch(selection, (newVal, oldVal) => {
  // Call the method with the new selection value
  sortEntriesByLastUpdated(newVal);
});

const error = ref(null);
const confirmError = () => (error.value = null);
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
.caption.mt2 {
  font-size: 0.8rem;
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