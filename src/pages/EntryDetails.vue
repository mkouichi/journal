<template>
  <BaseCard v-if="entry && !isEditing">
    <div class="flex">
      <h1>{{ entry.title }}</h1>
      <BaseButton @click="editEntry" mode="flat">EDIT</BaseButton>
      <BaseButton @click="showDialog" mode="flat">DELETE</BaseButton>
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
    </div>
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
          :value="entry.title"
        />
      </div>
      <div class="form-control">
        <label for="body">Body</label>
        <textarea
          name="body"
          id="body"
          rows="10"
          ref="bodyInput"
          :value="entry.body"
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
      isEditing: false,
    };
  },
  computed: {
    entry() {
      return this.$store.getters["journal/getEntryById"](this.id);
    },
    dialogIsVisible() {
      return this.$store.getters.dialogIsVisible;
    },
  },
  methods: {
    ...mapActions(["showDialog", "hideDialog"]),
    editEntry() {
      this.isEditing = true;
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
      this.$router.push("/journal");
    },
    deleteEntry() {
      this.$store.dispatch("journal/deleteEntry", this.id);
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
.form-control {
  margin: 1rem 0;
}
.flex {
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>