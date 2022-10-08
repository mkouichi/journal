<template>
  <section v-if="entries">
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
import { mapActions, mapGetters } from "vuex";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "@/firebase";
import "vue-cal/dist/vuecal.css";

import { getDataFromDBAndListenToChanges } from "../helper-functions";
import JournalEntry from "../components/journal/JournalEntry.vue";

export default {
  components: { JournalEntry },
  data() {
    return {
      loading: this.getLoadingState,
      error: this.getErrorState,
    };
  },
  mounted() {
    // const entries = [];

    // Set loading to true
    this.setLoading({ dataName: "journal", status: true });

    // Get initial data from Firebase
    const entries = getDataFromDBAndListenToChanges();
    // Keep on listening to changes in the collection
    // onSnapshot(collection(db, "journal"), (querySnapshot) => {
    //   // Loop through each entry in the collection
    //   querySnapshot.forEach((doc) => {
    //     const entry = {
    //       ...doc.data(),
    //       // Use the generated id
    //       id: doc.id,
    //     };
    //     entries.unshift(entry);
    //   });

    // Set loading to false
    this.setLoading({ dataName: "journal", status: false });

    // Set data to Vuex
    this.setEntryData(entries);
    // });
  },
  computed: {
    ...mapGetters("journal", [
      "getLoadingState",
      "getErrorState",
      "truncateEntryBody",
    ]),
    ...mapGetters(["getView"]),
    entries() {
      // Get data from Vuex and show the first 100 characters
      return this["truncateEntryBody"](100);
    },
  },
  methods: {
    ...mapActions("journal", ["setEntryData", "setLoading", "confirmError"]),
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