<template>
  <w-card class="white--bg" content-class="px8 py10">
    <w-form @submit.prevent="handleSubmit">
      <w-input
        id="date"
        label="Date"
        type="date"
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
        v-model="enteredTitle"
        @input="validateForm(), (isTitleValid = null)"
      >
      </w-input>
      <div v-if="isTitleValid !== null && !isTitleValid" class="error">
        Enter title.
      </div>
      <w-textarea
        id="body"
        class="mt5"
        label="Body"
        v-model="enteredBody"
        rows="10"
        @input="validateForm(), (isBodyValid = null)"
      ></w-textarea>
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

  <!-- Discard edit dialog -->
  <ConfirmationDialog
    v-model="dialog.show"
    @discardDraft="discardDraft"
    @closeDialog="dialog.show = false"
  />
</template>

<script setup>
import { ref, reactive, inject, computed, onMounted } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { useStore } from "vuex";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import moment from "moment";

import ConfirmationDialog from "../../components/journal/ConfirmationDialog.vue";

const store = useStore();

const dialog = reactive({
  show: false,
  width: "50vw",
});

const enteredDate = ref("");
const enteredTitle = ref("");
const enteredBody = ref("");

// Set the initial date to be displayed
const setInitialDate = () => {
  const getSelectedDate = computed(
    () => store.getters["journal/getSelectedDate"]
  );

  // Check if user chose a date in the calendar
  const selectedDate = getSelectedDate;

  // If there is already a selected date, use it as the initial date
  if (selectedDate.value) {
    enteredDate.value = selectedDate;
  }
  // If not, use the current date as the initial date
  else {
    const today = moment().format("YYYY-MM-DD");
    enteredDate.value = today;
  }
};

onMounted(() => setInitialDate());

const hasUnsavedChanges = computed(
  () => store.getters["journal/checkUnsavedChanges"]
);
const setSelectedDate = (payload) =>
  store.dispatch("journal/setSelectedDate", payload);

onBeforeRouteLeave((to, from, next) => {
  // Check if there are unsaved changes
  if (hasUnsavedChanges.value) {
    // Show dialog
    dialog.show = true;

    // Prevent leaving the page
    next(false);
  } else {
    // Set the selected date to null
    setSelectedDate(null);

    // Allow leaving the page
    next();
  }
});

const formIsInvalid = ref(true);
const isDateValid = ref(null);
const isTitleValid = ref(null);
const isBodyValid = ref(null);
const entryData = reactive({
  userId: "",
  start: "",
  end: "",
  lastUpdated: "",
  title: "",
  body: "",
});

const setHasUnsavedChanges = (payload) =>
  store.dispatch("journal/setHasUnsavedChanges", payload);

// Function on form submission
const handleSubmit = () => {
  // Set the editing state to false
  setHasUnsavedChanges(false);

  // Set input values
  setData();

  // If there are any empty fields, display error message and stop the process
  if (formIsInvalid.value) {
    // Set the corresponding validation flags to false
    if (enteredDate.value === "") isDateValid.value = false;
    if (enteredTitle.value === "") isTitleValid.value = false;
    if (enteredBody.value === "") isBodyValid.value = false;

    // Return to stop the function execution
    return;
  }

  // Send data to Firebase
  sendData();
};

// Set data to send
const setData = () => {
  const getUserId = computed(() => store.getters.getUserId);

  entryData.userId = getUserId.value;
  entryData.start = enteredDate.value;
  entryData.end = enteredDate.value;
  entryData.lastUpdated = moment().format("ddd, MMM D, YYYY, kk:mm");
  entryData.title = enteredTitle.value;
  entryData.body = enteredBody.value;
};

// Validation
const validateForm = () => {
  // Check if there are unsaved changes
  const unsavedChangesDetected =
    enteredDate.value.length > 0 ||
    enteredTitle.value.length > 0 ||
    enteredBody.value.length > 0;

  // If there are, set the flag to true
  setHasUnsavedChanges(unsavedChangesDetected);

  // When all the fields have values, set formIsInvalid to false
  formIsInvalid.value = !(
    enteredDate.value &&
    enteredTitle.value &&
    enteredBody.value
  );
};

const router = useRouter();
const getView = computed(() => store.getters.getView);

// Send data to Firebase
const sendData = () => {
  // Add a new document with a generated id
  addDoc(collection(db, "journal"), entryData);

  // Reset the input fields
  enteredTitle.value = "";
  enteredBody.value = "";

  // Redirect to current view
  router.push("/journal/" + getView.value);

  // Show notification
  notifyNewPostSaved();
};

const cancelEdit = () => {
  // Check if there are unsaved changes
  if (enteredTitle.value !== "" || enteredBody.value !== "") {
    // Show dialog
    dialog.show = true;
  } else {
    // Redirect to current view
    router.push("/journal/" + getView.value);
  }
};

const discardDraft = () => {
  // Reset the input fields
  enteredTitle.value = "";
  enteredBody.value = "";

  // Set the editing state to false
  setHasUnsavedChanges(false);

  // Redirect to current view
  router.push("/journal/" + getView.value);
};

const $waveui = inject("$waveui");

// Notification
const notifyNewPostSaved = () => {
  $waveui.notify({
    lg: true,
    message: "Post saved successfully!",
    timeout: 3000,
    success: true,
    plain: true,
    shadow: true,
    dismiss: true,
    transition: "bounce",
  });
};
</script>

<style scoped>
.w-input,
.w-textarea {
  font-size: 20px;
}
</style>