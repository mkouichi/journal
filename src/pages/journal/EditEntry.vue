<template>
  <w-card class="white--bg" content-class="px8 py10">
    <w-form @submit="handleSubmit" ref="form">
      <w-input
        id="date"
        label="Date"
        type="date"
        ref="dateInput"
        v-model="entryDate"
        @input="validateForm(), (isDateValid = null)"
        @keydown.enter.prevent
      ></w-input>
      <div v-if="isDateValid !== null && !isDateValid" class="error">
        Enter valid date.
      </div>
      <w-input
        id="title"
        class="mt5 title3 lh2"
        label="Title"
        ref="titleInput"
        v-model="entryTitle"
        @input="validateForm(), (isTitleValid = null)"
      >
      </w-input>
      <div v-if="isTitleValid !== null && !isTitleValid" class="error">
        Enter title.
      </div>
      <w-textarea
        id="body"
        class="mt5 title3 lh2"
        label="Body"
        ref="bodyInput"
        v-model="entryBody"
        @input="validateForm(), (isBodyValid = null)"
      >
      </w-textarea>
      <div v-if="isBodyValid !== null && !isBodyValid" class="error">
        Enter body.
      </div>

      <div class="text-right mt6">
        <w-button lg bg-color="warning" @click="cancelEdit" class="mr5"
          >Cancel</w-button
        >
        <w-button lg type="submit" :disabled="formIsInvalid">Save</w-button>
      </div>
    </w-form>
  </w-card>

  <!-- Cancel edit dialog -->
  <ConfirmationDialog
    v-model="dialog.show"
    @discardDraft="discardDraft"
    @closeDialog="dialog.show = false"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

import ConfirmationDialog from "../../components/journal/ConfirmationDialog.vue";

export default {
  components: { ConfirmationDialog },
  beforeRouteLeave(to, from, next) {
    // Check if there are unsaved changes
    if (this.hasUnsavedChanges) {
      this.destination = to.path;

      // Show dialog
      this.dialog.show = true;

      next(false);
    } else {
      // Allow leaving the page
      next();
    }
  },
  props: ["id"],
  data() {
    return {
      docRef: null,
      originalEntry: null,
      formIsInvalid: false,
      isDateValid: null,
      isTitleValid: null,
      isBodyValid: null,

      entryDate: "",
      entryTitle: "",
      entryBody: "",

      modifiedData: {},

      dialog: {
        show: false,
        width: "50vw",
      },

      destination: null,
    };
  },
  mounted() {
    // Set the initial entry value when the component is mounted
    this.setEntryValue();
  },
  computed: {
    ...mapGetters({
      getView: "getView",
      hasUnsavedChanges: "journal/checkUnsavedChanges",
    }),
  },
  methods: {
    ...mapActions({
      setHasUnsavedChanges: "journal/setHasUnsavedChanges",
    }),

    async getDataFromFirebase() {
      // Get a reference to the document
      this.docRef = doc(db, "journal", this.id);

      // Get a snapshot of the document
      const docSnap = await getDoc(this.docRef);

      // Check if the document exists
      if (docSnap.exists()) {
        // Return the document data
        return docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");

        // Return null if the document doesn't exist
        return null;
      }
    },

    async setEntryValue() {
      // Get the data for the current entry from Firebase
      this.originalEntry = await this.getDataFromFirebase();

      // If the data could not be obtained, exit the function
      if (!this.originalEntry) {
        console.warn("Entry is null.");
        return;
      }

      // Set the original contents for editing
      this.entryDate = this.originalEntry.start;
      this.entryTitle = this.originalEntry.title;
      this.entryBody = this.originalEntry.body;
    },

    cancelEdit() {
      // Check if there are unsaved changes
      if (this.hasUnsavedChanges) {
        // Set destination to entry
        this.destination = "entry";

        // Show dialog
        this.dialog.show = true;
      } else {
        // Redirect to the current entry
        this.$router.push("/journal/" + this.id);
      }
    },

    discardDraft() {
      // Reset the form
      this.$refs.form.reset();

      // Set the editing state to false
      this.setHasUnsavedChanges(false);

      // Close the dialog
      this.dialog.show = false;

      // Navigate to the desired route
      if (this.destination === "entry") {
        this.$router.push("/journal/" + this.id);
      } else {
        this.$router.push(this.destination);
      }
    },

    async handleSubmit() {
      // Set the editing state to false
      this.setHasUnsavedChanges(false);

      // Set input values
      this.setData();

      // If there are any empty fields, display error message and stop the process
      if (this.formIsInvalid) {
        // Set the corresponding validation flags to false
        if (this.entryDate === "") this.isDateValid = false;
        if (this.entryTitle === "") this.isTitleValid = false;
        if (this.entryBody === "") this.isBodyValid = false;

        // Return to stop the function execution
        return;
      }

      // Send data to Firebase
      await updateDoc(this.docRef, this.modifiedData);

      // Redirect to current view
      this.$router.push("/journal/" + this.getView);
    },

    // Set data to send
    setData() {
      this.modifiedData.start = this.entryDate;
      this.modifiedData.lastUpdated = moment().format(
        "ddd, MMM D, YYYY, kk:mm"
      );
      this.modifiedData.title = this.entryTitle;
      this.modifiedData.body = this.entryBody;
    },

    // Validation
    validateForm() {
      // Check if all the fields have values
      const isValid =
        this.entryDate !== "" &&
        this.entryTitle !== "" &&
        this.entryBody !== "";

      // When all the fields have values, set formIsInvalid to false
      if (!isValid) {
        this.formIsInvalid = true;
      } else {
        this.formIsInvalid = false;
      }

      // Check if there are unsaved changes
      if (
        this.entryTitle !== this.originalEntry.title ||
        this.entryBody !== this.originalEntry.body
      ) {
        this.setHasUnsavedChanges(true);
      }
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