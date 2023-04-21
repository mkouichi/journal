<template>
  <!-- TODO: Validation -->
  <!-- <BaseModal v-if="inputIsInvalid" :open="inputIsInvalid" @close="confirmError">
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
  </BaseModal> -->

  <w-card class="pa5">
    <w-form @submit.prevent="handleSubmit" ref="form">
      <w-input
        id="date"
        label="Date"
        type="date"
        ref="dateInput"
        v-model="enteredDate"
        @input="validateForm(), (isDateValid = null)"
        @keydown.enter.prevent
      ></w-input>
      <div v-if="isDateValid !== null && !isDateValid" class="error">
        Enter valid date.
      </div>
      <w-input
        id="title"
        class="mt5"
        label="Title"
        ref="titleInput"
        v-model="enteredTitle"
        @input="validateForm(), (isTitleValid = null)"
        @keydown.enter.prevent
      >
      </w-input>
      <div v-if="isTitleValid !== null && !isTitleValid" class="error">
        Enter title.
      </div>
      <w-textarea
        id="body"
        class="mt5"
        label="Body"
        ref="bodyInput"
        v-model="enteredBody"
        @input="validateForm(), (isBodyValid = null)"
        rows="10"
      ></w-textarea>
      <div v-if="isBodyValid !== null && !isBodyValid" class="error">
        Enter body.
      </div>

      <div class="text-right mt6">
        <w-button lg bg-color="warning" @click="showDialog" class="mr5"
          >Cancel</w-button
        >
        <w-button lg type="submit" :disabled="inputIsInvalid">Save</w-button>
      </div>
    </w-form>
  </w-card>

  <!-- <BaseCard>
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
        <input type="text" id="title" name="title" ref="titleInput" />
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
  </BaseCard> -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  data() {
    return {
      inputIsInvalid: true,
      isDateValid: null,
      isTitleValid: null,
      isBodyValid: null,

      enteredDate: "",
      enteredTitle: "",
      enteredBody: "",

      entryData: {
        start: "",
        end: "",
        lastUpdated: "",
        title: "",
        body: "",
      },
    };
  },
  // TODO: Only show this when there are unsaved changes
  // TODO: Show a better deagram
  // Set the selected date to null before leaving the current route
  beforeRouteLeave() {
    this.setSelectedDate(null);

    // const answer = window.confirm(
    //   "Do you really want to leave? you have unsaved changes!"
    // );
    // if (!answer) return false;
  },
  mounted() {
    this.setInitialDate();
  },
  computed: {
    ...mapGetters({
      getView: "getView",
      error: "dialog/getErrorState",
      dialogIsVisible: "dialog/getDialogVisibility",
      getSelectedDate: "journal/getSelectedDate",
    }),
  },
  methods: {
    ...mapActions("dialog", ["showDialog", "hideDialog", "setError"]),
    ...mapActions("journal", ["setSelectedDate"]),

    // Set the initial date to be displayed
    setInitialDate() {
      // Check if user chose a date in the calendar
      const selectedDate = this.getSelectedDate;

      // If there is already a selected date, use it as the initial date
      if (selectedDate) this.enteredDate = selectedDate;
      // If not, use the current date as the initial date
      else {
        const today = moment().format("YYYY-MM-DD");
        this.enteredDate = today;
      }
    },

    // Function on form submission
    handleSubmit() {
      // Set input values
      this.setData();

      // If there are any empty fields, display error message and stop the process
      if (this.inputIsInvalid) {
        // Set the corresponding validation flags to false
        if (this.enteredDate === "") this.isDateValid = false;
        if (this.enteredTitle === "") this.isTitleValid = false;
        if (this.enteredBody === "") this.isBodyValid = false;

        // Return to stop the function execution
        return;
      }

      // Set error to null
      // this.setError(null);

      // Send data to Firebase
      this.sendData();
    },

    // Set data to send
    setData() {
      this.entryData.start = this.enteredDate;
      this.entryData.end = this.enteredDate;
      this.entryData.lastUpdated = moment().format("ddd, MMM D, YYYY, kk:mm");
      this.entryData.title = this.enteredTitle;
      this.entryData.body = this.enteredBody;
    },

    // Validation
    validateForm() {
      // Check if all the fields have values
      const isValid =
        this.enteredDate !== "" &&
        this.enteredTitle !== "" &&
        this.enteredBody !== "";

      // When all the fields have values, set inputIsInvalid to false
      if (!isValid) {
        this.inputIsInvalid = true;
      } else {
        this.inputIsInvalid = false;
      }
    },

    // Send data to Firebase
    sendData() {
      // Add a new document with a generated id
      addDoc(collection(db, "journal"), this.entryData);

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
      this.setError(null);
    },
  },
};
</script>

<style scoped>
.w-input,
.w-textarea {
  font-size: 20px;
}
</style>