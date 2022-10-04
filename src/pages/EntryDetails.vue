<template>
  <BaseCard v-if="entry && !isEditing">
    <div class="flex">
      <BaseButton @click="goBack" class="left">Go Back</BaseButton>
      <BaseButton @click="showDialog" mode="outline">Delete</BaseButton>
      <BaseButton @click="editEntry" mode="outline">Edit</BaseButton>
    </div>
    <div class="flex">
      <h1>{{ entry.title }}</h1>
      <p id="date">{{ entry.date }}</p>
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
    <p>{{ entry.body }}</p>
  </BaseCard>
  <BaseCard v-if="entry && isEditing">
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
        </template>
      </BaseModal>
    </form>
  </BaseCard>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["id"],
  data() {
    return {
      // results: [],
      // isLoading: false,
      // error: false,
      isEditing: false,
      // foundEntry: {},
      // Initial value for editing
      entryTitle: "",
      entryBody: "",
    };
  },
  computed: {
    entry() {
      // Get the entry's contents using its id from Vuex
      const foundEntry = this.$store.getters["journal/getEntryById"](this.id);

      // If the entry doesn't exist, stop the process
      // Need this also for when deleting an entry
      if (foundEntry === undefined) return;

      // Set the contents for editing
      this.entryTitle = foundEntry.title;
      this.entryBody = foundEntry.body;

      return foundEntry;
    },
    dialogIsVisible() {
      return this.$store.getters.dialogIsVisible;
    },
  },
  methods: {
    ...mapActions(["showDialog", "hideDialog", "journal/fetchEntryById"]),
    editEntry() {
      this.isEditing = true;
    },
    goBack() {
      this.$router.push("/journal");
    },
    submitModifiedData() {
      const enteredTitle = this.$refs.titleInput.value.trim();
      const enteredBody = this.$refs.bodyInput.value.trim();
      const modifiedData = {
        id: this.id,
        title: enteredTitle,
        body: enteredBody,
      };

      // If there's an empty field, stop the process and show the error dialog
      if (enteredTitle === "" || enteredBody === "") {
        this.inputIsInvalid = true;
        return;
      }

      this.$store.dispatch("journal/modifyEntry", modifiedData);

      // Reset the input fields
      this.$refs.form.reset();

      // Redirect to the list of entries
      this.$router.push("/journal");
    },
    discardDraft() {
      this.$refs.form.reset();
      this.hideDialog();

      // Force reload
      // this.$router.go();
      this.$router.push("/journal");
    },
    // deleteEntry() {
    //   this.$store.dispatch("journal/deleteEntry", this.id);
    //   this.$router.push("/journal");
    // },
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
.form-control {
  margin: 1rem 0;
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