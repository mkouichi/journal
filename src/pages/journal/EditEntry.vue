<template>
  <w-card class="white--bg" content-class="pa0">
    <w-form
      error-placeholders
      v-model="form.valid"
      @keydown.enter.prevent
      @submit="submitModifiedData"
      ref="form"
      class="px8 py10"
    >
      <w-input
        required
        label="Title"
        id="title"
        class="mt5 title3 lh2"
        :validators="[validators.required]"
        ref="titleInput"
        v-model.trim="entryTitle"
      >
      </w-input>
      <w-textarea
        required
        label="Body"
        id="body"
        class="mt5 title3 lh2"
        :validators="[validators.required]"
        ref="bodyInput"
        v-model.trim="entryBody"
      >
      </w-textarea>
      <w-flex wrap align-center justify-end class="mt4">
        <div class="spacer" />
        <w-button lg bg-color="warning" type="reset" class="my3 mr5">
          Reset
        </w-button>
        <w-button lg @click="showDialog" bg-color="warning" class="my3 mr5">
          Cancel
        </w-button>
        <w-button lg type="submit" :disabled="form.valid !== true" class="my3">
          Save
        </w-button>
      </w-flex>
    </w-form>
    <!-- <w-notification
      v-model="form.sent"
      success
      transition="bounce"
      absolute
      plain
      round
      bottom
      lg
    >
      The entry was sent successfully!
    </w-notification> -->
  </w-card>

  <w-dialog
    v-if="dialogIsVisible"
    width="50vw"
    title-class="warning-dark1--bg white"
    @close="hideDialog"
  >
    <template #title>
      <w-icon class="mr2 title2">mdi mdi-tune</w-icon>
      <span class="title2">Discard</span>
    </template>
    <p>Are you sure you want to discard the draft?</p>
    <template #actions>
      <div class="spacer" />
      <w-button
        lg
        @click="discardDraft"
        class="mr5 white"
        bg-color="warning-dark1"
      >
        Discard
      </w-button>
      <w-button lg @click="hideDialog" class="white" bg-color="success-dark1">
        Back to entry
      </w-button>
    </template>
  </w-dialog>

  <!-- <BaseCard>
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
  </BaseCard> -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  beforeRouteLeave() {
    console.log("EditEntry beforeRouteLeave");
    this.setEditingToFalse();
    // const answer = window.confirm(
    //   "Do you really want to leave? you have unsaved changes!"
    // );
    // if (!answer) {
    //   return false;
    // } else {
    //   this.setEditingToFalse();
    // }
  },
  props: ["id"],
  data() {
    return {
      entryTitle: "",
      entryBody: "",
      form: {
        valid: null,
        sent: false,
      },
      validators: {
        required: (value) => !!value || "This field is required",
      },
    };
  },
  mounted() {
    this.setEntryValue;
  },
  computed: {
    ...mapGetters(["getView"]),
    ...mapGetters({ dialogIsVisible: "dialog/getDialogVisibility" }),
    ...mapGetters("journal", ["getTargetEntry"]),
    setEntryValue() {
      const entry = this.getTargetEntry;

      // Set the original contents for editing
      this.entryTitle = entry.title;
      this.entryBody = entry.body;
    },
  },
  methods: {
    ...mapActions("dialog", ["showDialog", "hideDialog", "setEditing"]),
    setEditingToFalse() {
      this.setEditing(false);
    },
    // TODO: Only show this when there are unsaved changes
    discardDraft() {
      // this.$refs.form.reset();
      this.hideDialog();
      this.setEditingToFalse();
      this.$router.push("/journal/" + this.id);
    },
    async submitModifiedData() {
      const enteredTitle = this.$refs.titleInput.inputValue;
      const enteredBody = this.$refs.bodyInput.inputValue;
      const modifiedData = {
        lastUpdated: moment().format("ddd, MMM D, YYYY, kk:mm"),
        id: this.id,
        title: enteredTitle,
        body: enteredBody,
      };

      // If there's an empty field, stop the process and show error
      if (enteredTitle === "" || enteredBody === "") {
        this.inputIsInvalid = true;
        return;
      }

      // Grab the original record from database
      const originalRef = doc(db, "journal", this.id);

      // Send data to Firebase
      await updateDoc(originalRef, modifiedData);

      // Reset the input fields
      // this.$refs.form.reset();

      // Reset states
      this.hideDialog();
      this.setEditingToFalse();

      // Redirect to current view
      this.$router.push("/journal/" + this.getView);
    },
  },
};
</script>

<style scoped>
/* textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 1rem;
  font-size: 1.3rem;
} */
/* .w-input--focused,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
} */
/* .form-control {
  margin: 1rem 0;
}
.flex {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 2rem;
} */
/* #date {
  color: #656565;
} */
</style>