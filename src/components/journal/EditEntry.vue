<template>
  <BaseCard>
    <form @submit.prevent="submitModifiedData" ref="form">
      <div class="form-control">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          ref="titleInput"
          @keydown.enter.prevent
          v-model="entryTitle"
        />
      </div>
      <div class="form-control">
        <label for="body">Body</label>
        <textarea
          name="body"
          id="body"
          rows="10"
          ref="bodyInput"
          v-model="entryBody"
        ></textarea>
      </div>
      <div class="flex">
        <BaseButton type="button" @click="showDialog" mode="outline"
          >CANCEL</BaseButton
        >
        <BaseButton type="submit">SAVE</BaseButton>
      </div>
      <BaseModal
        v-if="dialogIsVisible"
        :open="dialogIsVisible"
        @close="hideDialog"
      >
        <template #header>
          <h2>Cancel</h2>
        </template>
        <template #default>
          <p>Are you sure? Your draft will be lost.</p>
        </template>
        <template #actions>
          <BaseButton @click="discardDraft" mode="outline">Discard</BaseButton>
          <BaseButton @click="hideDialog">Back to edit</BaseButton>
          <BaseButton @click="log">log</BaseButton>
        </template>
      </BaseModal>
    </form>
  </BaseCard>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  props: ["entry"],
  data() {
    return {
      entryTitle: "",
      entryBody: "",
    };
  },
  mounted() {
    this.setEntryValue;
  },
  computed: {
    // ...mapGetters("journal", { isEditing: "getEditingState" }),
    // ...mapGetters({ isEditing: "journal/getEditingState('journal')" }),
    isEditing() {
      return this.$store.getters["journal/getEditingState"]("journal");
    },
    dialogIsVisible() {
      return this.$store.getters.dialogIsVisible;
    },
    setEntryValue() {
      // Set the original contents for editing
      this.entryTitle = this.entry.title;
      this.entryBody = this.entry.body;
    },
  },
  methods: {
    ...mapActions(["showDialog", "hideDialog", "journal/setEditing"]),
    setEditingToFalse() {
      this["journal/setEditing"]({ dataName: "journal", status: false });
    },
    discardDraft() {
      this.$refs.form.reset();
      this.hideDialog();
      this.setEditingToFalse();
    },
    async submitModifiedData() {
      const enteredTitle = this.$refs.titleInput.value.trim();
      const enteredBody = this.$refs.bodyInput.value.trim();
      const modifiedData = {
        lastUpdated: moment().format("ddd, MMM D, YYYY, kk:mm"),
        id: this.entry.id,
        title: enteredTitle,
        body: enteredBody,
      };

      // If there's an empty field, stop the process and show error
      if (enteredTitle === "" || enteredBody === "") {
        this.inputIsInvalid = true;
        return;
      }

      // Grab the original record from database
      const originalRef = doc(db, "journal", this.entry.id);

      // Send data to Firebase
      await updateDoc(originalRef, modifiedData);

      // Reset the input fields
      this.$refs.form.reset();

      // Reset states
      this.hideDialog();
      this.setEditingToFalse();

      // Redirect to the list of entries
      this.$router.push("/journal");
    },
  },
};
</script>

<style scoped>
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
.form-control {
  margin: 1rem 0;
}
.flex {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 2rem;
}
#date {
  color: #656565;
}
</style>