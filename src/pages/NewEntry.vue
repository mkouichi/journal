<template>
  <BaseCard>
    <form @submit.prevent="submitData" ref="form">
      <div class="form-control">
        <label for="title">Title</label>
        <input type="text" id="title" name="title" ref="titleInput" />
      </div>
      <div class="form-control">
        <label for="text">Text</label>
        <textarea name="text" id="text" rows="10" ref="textInput"></textarea>
      </div>
      <div class="flex">
        <BaseButton @click="showDialog" mode="outline">CANCEL</BaseButton>
        <BaseButton type="submit">SAVE</BaseButton>
      </div>
      <teleport to="body">
        <BaseModal @close="hideDialog" :open="dialogIsVisible">
          <p>dialog text</p>
          <BaseButton @click="hideDialog" mode="outline">Close</BaseButton>
        </BaseModal>
      </teleport>
    </form>
  </BaseCard>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    dialogIsVisible() {
      return this.$store.getters.dialogIsVisible;
    },
  },
  methods: {
    ...mapActions(["showDialog", "hideDialog"]),
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