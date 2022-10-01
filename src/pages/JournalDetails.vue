<template>
  <BaseCard>
    <div class="flex">
      <h1>{{ entry.title }}</h1>
      <BaseButton mode="flat">EDIT</BaseButton>
      <BaseButton @click="showDialog" mode="flat">DELETE</BaseButton>
      <teleport to="body">
        <BaseModal @close="hideDialog" :open="dialogIsVisible">
          <p>test dialog</p>
          <BaseButton @click="hideDialog" mode="outline">Close it!</BaseButton>
        </BaseModal>
      </teleport>
    </div>
    <p>{{ entry.text }}</p>
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
h1 {
  margin-right: auto;
}
.flex {
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>