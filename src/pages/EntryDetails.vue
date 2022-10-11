<template>
  <w-card v-if="targetEntry && !isEditing" shadow class="pa5">
    <w-flex class="mt3 mb10">
      <w-button xl @click="goBack" class="teal-dark3--bg">Go Back</w-button>
      <div class="spacer"></div>
      <w-button xl outline @click="showDialog" class="mr5">Delete</w-button>
      <w-button xl outline @click="setEditingToTrue" :route="editLink">
        Edit
      </w-button>
    </w-flex>
    <w-flex align-center class="mb7">
      <h1>{{ targetEntry.title }}</h1>
      <p id="date">{{ targetEntry.date }}</p>
    </w-flex>
    <p id="body" class="lh5">{{ targetEntry.body }}</p>
  </w-card>

  <!-- <BaseCard v-if="targetEntry && !isEditing">
    <BaseModal @close="hideDialog" :open="getDialogVisibility">
      <template #header>
        <h2>Delete</h2>
      </template>
      <template #default>
        <p>Are you sure? Your entry will be parmanently deleted.</p>
      </template>
      <template #actions>
        <BaseButton @click="deleteEntry" mode="outline">Delete</BaseButton>
        <BaseButton @click="hideDialog">Back to entry</BaseButton>
      </template>
    </BaseModal>
  </BaseCard> -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  async beforeMount() {
    let entry;

    // Try getting the entry's contents from Vuex using its id
    entry = this.getEntryById[this.id];

    // If the entry doesn't exist in Vuex, try finding it in Firebase
    if (entry === undefined) {
      const docRef = doc(db, "journal", this.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        entry = docSnap.data();
      } else {
        console.log("No such document!");
      }
    }

    // Set found entry to Vuex
    this.setTargetEntry(entry);
  },
  props: ["id"],
  computed: {
    ...mapGetters(["getView"]),
    ...mapGetters({
      dialogIsVisible: "dialog/getDialogVisibility",
      isEditing: "dialog/getEditingState",
    }),
    ...mapGetters("journal", ["getEntryById"]),
    ...mapGetters({ targetEntry: "journal/getTargetEntry" }),
    editLink() {
      return this.$route.path + "/edit";
    },
  },
  methods: {
    ...mapActions("dialog", ["showDialog", "hideDialog", "setEditing"]),
    ...mapActions("journal", ["setTargetEntry"]),
    setEditingToTrue() {
      this.setEditing(true);
    },
    goBack() {
      // Redirect to current view
      this.$router.push("/journal/" + this.getView);
    },
    async deleteEntry() {
      await deleteDoc(doc(db, "journal", this.id));
      this.hideDialog();
      this.$router.push("/journal/" + this.getView);
    },
  },
};
</script>

<style scoped>
h1 {
  margin-right: auto;
}
input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 1rem;
  border: 1px solid #ccc;
}
input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}
.teal-dark3--bg:hover {
  background-color: #1db3a8;
}
#body {
  font-size: 1.3rem;
}
</style>