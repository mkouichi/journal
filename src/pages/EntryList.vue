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
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { mapActions, mapGetters } from "vuex";
import JournalEntry from "../components/layout/JournalEntry.vue";

export default {
  components: { JournalEntry },
  data() {
    return {
      loading: this.getLoadingState,
      error: this.getErrorState,
    };
  },
  async mounted() {
    // Get initial data from Firebase
    const querySnapshot = await getDocs(collection(db, "journal"));
    const entries = [];

    // Set loading to true
    this["setLoading"]({ dataName: "journal", status: true });

    querySnapshot.forEach((doc) => {
      const entry = {
        ...doc.data(),
        id: doc.id,
      };
      entries.unshift(entry);
    });

    // Set loading to false
    this["setLoading"]({ dataName: "journal", status: false });

    // Set data to Vuex
    this.setEntryData(entries);
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
  },
  methods: {
    ...mapActions("journal", [
      "setEntryData",
      "setLoading",
      "serError",
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