<template>
  <w-card v-if="targetEntry" class="pa5">
    <w-flex class="mt3 mb10">
      <w-button lg @click="goBack" class="teal-dark2--bg">Go Back</w-button>
      <div class="spacer"></div>
      <w-button lg @click="dialog.show = true" class="error--bg mr5"
        >Delete</w-button
      >
      <w-button lg class="warning--bg" :route="editLink"> Edit </w-button>
    </w-flex>
    <w-toolbar align-center class="toolbar mb7">
      <h1>{{ targetEntry.title }}</h1>
      <span id="date" class="caption">{{ targetEntry.lastUpdated }}</span>
    </w-toolbar>
    <p id="body" class="lh5">{{ targetEntry.body }}</p>
  </w-card>

  <!-- Delete draft dialog -->
  <w-dialog
    v-model="dialog.show"
    :width="dialog.width"
    title-class="error--bg white"
    @close="dialog.show = false"
  >
    <template #title>
      <w-icon class="mr2 title2">mdi mdi-delete</w-icon>
      <span class="title2">Delete</span>
    </template>
    <p>Are you sure you want to delete this entry?</p>
    <template #actions>
      <div class="spacer"></div>
      <w-button lg @click="deleteEntry" class="mr5 white" bg-color="error">
        Delete
      </w-button>
      <w-button
        lg
        @click="dialog.show = false"
        class="white"
        bg-color="success"
      >
        Back to entry
      </w-button>
    </template>
  </w-dialog>
</template>

<script setup>
import { reactive, inject, computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

const store = useStore();

const route = useRoute();
const editLink = computed(() => route.path + "/edit");
const targetEntry = computed(() => store.getters["journal/getTargetEntry"]);

const dialog = reactive({
  show: false,
  width: "50vw",
});

// This id prop is passed from the route parameter
const props = defineProps({ id: String });

const setTargetEntry = (payload) =>
  store.dispatch("journal/setTargetEntry", payload);

onBeforeMount(async () => {
  const getEntryById = computed(() =>
    store.getters["journal/getEntryById"](props.id)
  );
  let entry;

  // Try getting the entry's contents from Vuex using its id
  entry = getEntryById.value;

  // If the entry doesn't exist in Vuex, try finding it in Firebase
  if (entry === undefined) {
    const docRef = doc(db, "journal", props.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      entry = docSnap.data();
    } else {
      console.log("No such document!");
    }
  }

  // Set found entry to Vuex
  setTargetEntry(entry);
});

const router = useRouter();
const getView = computed(() => store.getters.getView);

const goBack = () => {
  // Redirect to current view
  router.push("/journal/" + getView.value);
};

const deleteEntry = async () => {
  await deleteDoc(doc(db, "journal", props.id));
  dialog.show = false;
  router.push("/journal/" + getView.value);
  notifyPostDeleted();
};

const $waveui = inject("$waveui");

// Notification
const notifyPostDeleted = () => {
  $waveui.notify({
    lg: true,
    message: "Post deleted successfully!",
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

.toolbar {
  padding-top: 1rem;
  padding-bottom: 1rem;
  border: none;
  display: block;
}

#body {
  font-size: 1.3rem;
  white-space: pre-line;
}
</style>