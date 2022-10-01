<template>
  <BaseModal v-if="inputIsInvalid" :open="inputIsInvalid" @close="confirmError">
    <template #header>
      <h2>Invalid input</h2>
    </template>
    <template #default>
      <p>
        At least one input is invalid. Make sure you have a title and body for
        your journal.
      </p>
    </template>
    <template #actions>
      <BaseButton @click="confirmError">Okay</BaseButton>
    </template>
  </BaseModal>
  <BaseCard>
    <form @submit.prevent="submitEntryData" ref="form">
      <div class="form-control">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          ref="titleInput"
          @keydown.enter.prevent
        />
      </div>
      <div class="form-control">
        <label for="body">Body</label>
        <textarea name="body" id="body" rows="10" ref="bodyInput"></textarea>
      </div>
      <div class="flex">
        <BaseButton @click="showDialog" mode="outline">CANCEL</BaseButton>
        <BaseButton type="submit">SAVE</BaseButton>
      </div>
      <BaseModal
        v-if="dialogIsVisible"
        :open="dialogIsVisible"
        @close="hideDialog"
      >
        <p>dialog text</p>
        <template #actions>
          <BaseButton @click="hideDialog">Close</BaseButton>
        </template>
      </BaseModal>
    </form>
  </BaseCard>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["dialogIsVisible"]),
  },
  data() {
    return {
      inputIsInvalid: false,
    };
  },
  methods: {
    ...mapActions(["showDialog", "hideDialog"]),
    submitEntryData() {
      const enteredTitle = this.$refs.titleInput.value.trim();
      const enteredBody = this.$refs.bodyInput.value.trim();
      const payload = {
        title: enteredTitle,
        body: enteredBody,
      };

      // If there's an empty field, stop the process and show the error dialog
      if (enteredTitle === "" || enteredBody === "") {
        this.inputIsInvalid = true;
        return;
      }
      this.$store.dispatch("addEntry", payload);

      // Reset the input fields
      this.$refs.form.reset();

      // Redirect to the list of entries
      this.$router.push("/journal");
    },
    confirmError() {
      this.inputIsInvalid = false;
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
}
</style>