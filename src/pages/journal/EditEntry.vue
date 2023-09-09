<template>
  <w-card class="white--bg" content-class="px8 py10">
    <w-form @submit="handleSubmit">
      <w-input
        id="date"
        label="Date"
        type="date"
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
  <Teleport to="body">
    <ConfirmationDialog
      v-model="dialog.show"
      @discard-draft="discardDraft"
      @close-dialog="dialog.show = false"
    />
  </Teleport>
</template>

<script setup>
import { ref, reactive, inject, computed, onMounted } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

import ConfirmationDialog from "../../components/journal/ConfirmationDialog.vue";

const store = useStore();

const dialog = reactive({
  show: false,
  width: "50vw",
});

const docRef = ref(null);
const originalEntry = ref(null);

const entryDate = ref("");
const entryTitle = ref("");
const entryBody = ref("");

// Set the initial entry value when the component is mounted
onMounted(() => setEntryValue());

const setEntryValue = async () => {
  // Get the data for the current entry from Firebase
  originalEntry.value = await getDataFromFirebase();

  // If the data could not be obtained, exit the function
  if (!originalEntry.value) {
    console.warn("Entry is null.");
    return;
  }

  // Set the original contents for editing
  entryDate.value = originalEntry.value.start;
  entryTitle.value = originalEntry.value.title;
  entryBody.value = originalEntry.value.body;
};

// This id prop is passed from the route parameter
const props = defineProps({ id: String });

const getDataFromFirebase = async () => {
  // Get a reference to the document
  docRef.value = doc(db, "journal", props.id);

  // Get a snapshot of the document
  const docSnap = await getDoc(docRef.value);

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
};

const destination = ref(null);
const hasUnsavedChanges = computed(
  () => store.getters["journal/checkUnsavedChanges"]
);

onBeforeRouteLeave((to, from, next) => {
  // Check if there are unsaved changes
  if (hasUnsavedChanges.value) {
    destination.value = to.path;

    // Show dialog
    dialog.show = true;

    next(false);
  } else {
    // Allow leaving the page
    next();
  }
});

const setHasUnsavedChanges = (payload) =>
  store.dispatch("journal/setHasUnsavedChanges", payload);
const router = useRouter();
const getView = computed(() => store.getters.getView);

const formIsInvalid = ref(false);
const isDateValid = ref(null);
const isTitleValid = ref(null);
const isBodyValid = ref(null);

const modifiedData = reactive({});

const handleSubmit = async () => {
  // Set the editing state to false
  setHasUnsavedChanges(false);

  // Set input values
  setData();

  // If there are any empty fields, display error message and stop the process
  if (formIsInvalid.value) {
    // Set the corresponding validation flags to false
    if (entryDate.value === "") isDateValid.value = false;
    if (entryTitle.value === "") isTitleValid.value = false;
    if (entryBody.value === "") isBodyValid.value = false;

    // Return to stop the function execution
    return;
  }

  // Send data to Firebase
  await updateDoc(docRef.value, modifiedData);

  // Redirect to current view
  router.push("/journal/" + getView.value);

  // Show notification
  notifyEditsSaved();
};

// Set data to send
const setData = () => {
  modifiedData.start = entryDate.value;
  modifiedData.lastUpdated = moment().format("YYYY-MM-DD HH:mm");
  modifiedData.title = entryTitle.value;
  modifiedData.body = entryBody.value;
};

const $waveui = inject("$waveui");

// Notification
const notifyEditsSaved = () => {
  $waveui.notify({
    lg: true,
    message: "Your edits have been saved!",
    timeout: 3000,
    success: true,
    plain: true,
    shadow: true,
    dismiss: true,
    transition: "bounce",
  });
};

// Validation
const validateForm = () => {
  // Check if all the fields have values
  const isValid =
    entryDate.value !== "" && entryTitle.value !== "" && entryBody.value !== "";

  // When all the fields have values, set formIsInvalid to false
  if (!isValid) {
    formIsInvalid.value = true;
  } else {
    formIsInvalid.value = false;
  }

  // Check if there are unsaved changes
  if (
    entryTitle.value !== originalEntry.value.title ||
    entryBody.value !== originalEntry.value.body
  ) {
    setHasUnsavedChanges(true);
  }
};

const cancelEdit = () => {
  // Check if there are unsaved changes
  if (hasUnsavedChanges.value) {
    // Set destination to entry
    destination.value = "entry";

    // Show dialog
    dialog.show = true;
  } else {
    // Redirect to the current entry
    router.push("/journal/" + props.id);
  }
};

const discardDraft = () => {
  // Reset the input fields
  entryTitle.value = "";
  entryBody.value = "";

  // Set the editing state to false
  setHasUnsavedChanges(false);

  // Close the dialog
  dialog.show = false;

  // Navigate to the desired route
  if (destination.value === "entry") {
    router.push("/journal/" + props.id);
  } else {
    router.push(destination.value);
  }
};
</script>

<style scoped>
.w-input,
.w-textarea {
  font-size: 20px;
}
</style>