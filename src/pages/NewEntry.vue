<template>
  <!-- TODO: Validation -->
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
  <BaseCard>
    <form @submit.prevent="submitEntryData" ref="form">
      <div class="form-control">
        <label for="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          ref="dateInput"
          :value="setInitialDate"
          @keydown.enter.prevent
        />
      </div>
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
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  // TODO: Only show this when there are unsaved changes
  // TODO: Show a better deagram
  beforeRouteLeave() {
    this.setSelectedDate(null);

    // const answer = window.confirm(
    //   "Do you really want to leave? you have unsaved changes!"
    // );
    // if (!answer) return false;
  },
  computed: {
    ...mapGetters(["getView"]),
    ...mapGetters({
      error: "dialog/getErrorState",
      dialogIsVisible: "dialog/getDialogVisibility",
    }),
    // ...mapGetters("dialog", ["getErrorState", "getDialogVisibility"]),
    ...mapGetters("journal", ["getSelectedDate"]),
    setInitialDate() {
      const selectedDate = this.getSelectedDate;

      if (selectedDate) return selectedDate;
      else {
        const today = moment().format("YYYY-MM-DD");
        return today;
      }
    },
  },
  data() {
    return {
      inputIsInvalid: false,
      // error: this.$store.getters["journal/getErrorState"]("journal"),
      // error: this.getErrorState,
    };
  },
  methods: {
    ...mapActions("dialog", ["showDialog", "hideDialog", "setError"]),
    ...mapActions("journal", ["setSelectedDate"]),
    submitEntryData() {
      const enteredTitle = this.$refs.titleInput.value.trim();
      const enteredBody = this.$refs.bodyInput.value.trim();
      const enteredDate = this.$refs.dateInput.value;
      const entryData = {
        date: moment().format("ddd, MMM D, YYYY, kk:mm"),
        start: enteredDate,
        end: enteredDate,
        title: enteredTitle,
        body: enteredBody,
      };

      // If there's an empty field, stop the process and show the error dialog
      if (enteredTitle === "" || enteredBody === "" || enteredDate === "") {
        this.inputIsInvalid = true;
        return;
      }

      // Set error to null
      this.setError(null);
      // this["journal/setError"]({ dataName: "journal", status: null });

      // Send data to Firebase
      // Add a new document with a generated id
      addDoc(collection(db, "journal"), entryData);

      // Reset the input fields
      this.$refs.form.reset();

      // Redirect to current view
      this.$router.push("/journal/" + this.getView);
    },

    // TODO: Only show this when there are unsaved changes
    discardDraft() {
      this.$refs.form.reset();
      this.hideDialog();
      // Redirect to current view
      this.$router.push("/journal/" + this.getView);
    },
    confirmError() {
      this.inputIsInvalid = false;
      // this.$store.dispatch("journal/confirmError");
      this.setError(null);
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