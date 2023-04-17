<template>
  <w-card class="white--bg" content-class="pa0">
    <div v-if="form.error" class="message-box">
      <w-transition-fade>
        <!-- <w-alert
          v-if="form.valid === false"
          error
          no-border
          class="my0 text-light"
        >
          The form has {{ form.errorsCount }} errors.
        </w-alert> -->
        <w-alert error no-border class="my0 text-light">
          {{ form.error.errorMessage }}
        </w-alert>
      </w-transition-fade>
    </div>
    <w-form
      v-model="form.valid"
      v-model:errors-count="form.errorsCount"
      class="px8 py10"
      @keydown.enter.prevent
      @submit="signIn"
    >
      <w-input
        required
        type="email"
        label="Email address"
        :validators="[validators.required]"
        class="mt5 title3"
        ref="emailInput"
      >
      </w-input>
      <w-input
        required
        type="password"
        label="Password"
        :validators="[validators.required]"
        class="mt5 title3"
        ref="passwordInput"
      >
      </w-input>
      <w-flex wrap align-center justify-end class="mt4">
        <w-button lg text class="my1 mr2" route="/signup"
          >Sign up instead</w-button
        >
        <w-button lg type="submit" :disabled="!form.valid" class="my1">
          Log in
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
        top
      >
        The form was sent successfully!
      </w-notification> -->
    <!-- <w-notification
      v-if="form.error"
      transition="bounce"
      absolute
      plain
      round
      bottom
    >
      {{ form.error.errorCode }}
      {{ form.error.errorMessage }}
    </w-notification> -->
  </w-card>

  <!-- <w-dialog
    v-if="form.error"
    width="50vw"
    title-class="error-dark1--bg white"
    @close="resetError"
  >
    <template #title>
      <w-icon class="mr2 title2">mdi mdi-tune</w-icon>
      <span class="title2">{{ form.error.errorCode }}</span>
    </template>
    <p>{{ form.error.errorMessage }}</p>
    <template #actions>
      <div class="spacer"></div>
      <w-button lg @click="resetError" class="white" bg-color="success-dark1">
        Okay
      </w-button>
    </template>
  </w-dialog> -->
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default {
  data: () => ({
    form: {
      valid: null,
      // submitted: false,
      // sent: false,
      // errorsCount: 0,
      error: null,
    },
    validators: {
      required: (value) => !!value || "This field is required",
      // consent: (value) => !!value || "You must agree",
    },
  }),
  methods: {
    resetError() {
      this.form.error = null;
    },
    signIn() {
      const enteredEmail = this.$refs.emailInput.inputValue;
      const enteredPassword = this.$refs.passwordInput.inputValue;

      this.resetError();

      signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then((userCredential) => {
          // Signed in
          // const user = userCredential.user;

          // Redirect to calendar view
          this.$router.push("/journal/calendar");
        })
        .catch((error) => {
          this.form.error = {
            errorCode: error.code,
            errorMessage: error.message,
          };
        });
    },
  },
};
</script>

<style scoped>
.message-box {
  min-height: 35px;
}
</style>