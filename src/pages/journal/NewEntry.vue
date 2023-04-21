<template>
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
        <w-button lg bg-color="warning" @click="cancelEdit" class="mr5"
          >Cancel</w-button
        >
        <w-button lg type="submit" :disabled="inputIsInvalid">Save</w-button>
      </div>
    </w-form>
  </w-card>

  <!-- Discard edit dialog -->
  <w-dialog
    v-model="dialog.show"
    :width="dialog.width"
    title-class="warning--bg white"
  >
    <template #title>
      <w-icon class="mr2 title2">mdi mdi-tune</w-icon>
      <span class="title2">Cancel</span>
    </template>
    <p>Are you sure? Your draft will be lost.</p>

    <div class="spacer"></div>

    <template #actions>
      <div class="spacer"></div>
      <w-button lg @click="discardDraft" class="mr5 white" bg-color="warning">
        Discard
      </w-button>
      <w-button
        lg
        @click="dialog.show = false"
        class="white"
        bg-color="success-dark1"
        >Back to entry</w-button
      >
    </template>
  </w-dialog>
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

      dialog: {
        show: false,
        width: "50vw",
      },
    };
  },
  beforeRouteLeave(to, from, next) {
    // Check if there are unsaved changes
    if (this.enteredTitle !== "" || this.enteredBody !== "") {
      // Show dialog
      this.dialog.show = true;

      // Prevent leaving the page
      next(false);
    } else {
      // Set the selected date to null
      this.setSelectedDate(null);

      // Allow leaving the page
      next();
    }
  },
  mounted() {
    this.setInitialDate();
  },
  computed: {
    ...mapGetters({
      getView: "getView",
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

    cancelEdit() {
      // Check if there are unsaved changes
      if (this.enteredTitle !== "" || this.enteredBody !== "") {
        // Show dialog
        this.dialog.show = true;
      } else {
        // Redirect to current view
        this.$router.push("/journal/" + this.getView);
      }
    },

    discardDraft() {
      this.$refs.form.reset();

      // Redirect to current view
      this.$router.push("/journal/" + this.getView);
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