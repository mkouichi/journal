<template>
  <BaseCard>
    <div class="flex">
      <h1>{{ entry.title }}</h1>
      <BaseButton mode="flat">EDIT</BaseButton>
      <BaseButton @click="showDialog" mode="flat">DELETE</BaseButton>
      <BaseModal @close="hideDialog" :open="discardDialogIsVisible">
        <p>test dialog</p>
        <BaseButton @click="hideDialog" mode="outline">Close it!</BaseButton>
      </BaseModal>
    </div>
    <p>{{ entry.body }}</p>
  </BaseCard>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["id"],
  computed: {
    entry() {
      return this.$store.getters.getEntryById(this.id);
    },
    discardDialogIsVisible() {
      return this.$store.getters.discardDialogIsVisible;
    },
  },
  methods: {
    ...mapActions(["showDialog", "hideDialog"]),
  },
};
</script>

<style scoped>
h1 {
  margin-right: auto;
}
.flex {
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>