<template>
  <BaseCard v-if="foundEntry && !isEditing">
    <div class="flex">
      <BaseButton @click="goBack" class="left">Go Back</BaseButton>
      <BaseButton @click="showDialog" mode="outline">Delete</BaseButton>
      <BaseButton @click="setEditingToTrue" mode="outline">Edit </BaseButton>
    </div>
    <div class="flex">
      <h1>{{ foundEntry.title }}</h1>
      <p id="date">{{ foundEntry.date }}</p>
    </div>
    <BaseModal @close="hideDialog" :open="dialogIsVisible">
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
    <p>{{ foundEntry.body }}</p>
  </BaseCard>
  <EditEntry v-if="foundEntry && isEditing" :entry="foundEntry" />
</template>

<script>
import { mapActions } from "vuex";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import EditEntry from "../components/journal/EditEntry.vue";

export default {
  components: { EditEntry },
  props: ["id"],
  data() {
    return {
      foundEntry: {},
    };
  },
  async beforeMount() {
    // Try getting the entry's contents using its id from Vuex
    this.foundEntry = this.$store.getters["journal/getEntryById"](this.id);

    // If the entry doesn't exist in Vuex, try finding it in Firebase
    if (this.foundEntry === undefined) {
      const docRef = doc(db, "journal", this.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.foundEntry = docSnap.data();
      } else {
        console.log("No such document!");
      }
    }
    console.table(this.foundEntry);
  },
  computed: {
    isEditing() {
      return this.$store.getters["journal/getEditingState"]("journal");
    },
    dialogIsVisible() {
      return this.$store.getters.dialogIsVisible;
    },
  },
  methods: {
    ...mapActions(["showDialog", "hideDialog", "journal/setEditing"]),
    setEditingToTrue() {
      this["journal/setEditing"]({ dataName: "journal", status: true });
    },
    goBack() {
      this.$router.push("/journal");
    },
    async deleteEntry() {
      await deleteDoc(doc(db, "journal", this.id));
      this.$router.push("/journal");
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
.flex {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 2rem;
}
.left {
  margin-right: auto;
}
#date {
  color: #656565;
}
</style>