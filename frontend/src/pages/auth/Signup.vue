<template>
  <w-card class="white--bg" content-class="pa0">
    <w-form
      v-model="form.valid"
      class="px8 py10"
      @keydown.enter.prevent
      @submit="createUser"
    >
      <w-input
        required
        type="email"
        label="Email address"
        :validators="[validators.required]"
        class="mt5 title3"
        v-model="emailInput"
      >
      </w-input>
      <w-input
        required
        type="password"
        label="Password"
        :validators="[validators.required]"
        class="mt5 title3"
        v-model="passwordInput"
      >
      </w-input>
      <w-flex wrap align-center justify-end class="mt4">
        <w-button lg text class="my1 mr2" route="/login"
          >Log in instead</w-button
        >
        <w-button lg type="submit" :disabled="!form.valid" class="my1">
          Sign up
        </w-button>
      </w-flex>
    </w-form>
  </w-card>

  <!-- Error dialog -->
  <Teleport to="body">
    <ErrorDialog
      v-if="form.error"
      :error="form.error"
      @reset-error="resetError"
    />
  </Teleport>
</template>

<script setup>
import { ref, reactive, inject } from "vue";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

import ErrorDialog from "../../components/journal/ErrorDialog.vue";

const form = reactive({
  valid: null,
  error: null,
});

const validators = {
  required: (value) => !!value || "This field is required",
};

const emailInput = ref("");
const passwordInput = ref("");
const router = useRouter();

const createUser = () => {
  resetError();

  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((userCredential) => {
      // Signed in
      // const user = userCredential.user;

      // Redirect to calendar view
      router.push("/journal/calendar");

      // Show notification
      notifySignUp();
    })
    .catch((error) => {
      form.error = {
        errorCode: error.code,
        errorMessage: error.message,
      };
    });
};

const resetError = () => {
  form.error = null;
};

// Notification
const $waveui = inject("$waveui");

const notifySignUp = () => {
  $waveui.notify({
    lg: true,
    message: "Account created successfully!",
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
</style>