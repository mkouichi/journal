<template>
  <BaseCard v-if="entry">
    <div class="flex">
      <h1>{{ entry.title }}</h1>
      <BaseButton mode="flat">EDIT</BaseButton>
      <BaseButton @click="showDialog" mode="flat">DELETE</BaseButton>
      <BaseModal @close="hideDialog" :open="dialogIsVisible">
        <template #header>
          <h2>Delete</h2>
        </template>
        <template #default>
          <p>Are you sure? Your entry will be parmanently deleted.</p>
        </template>
        <template #actions>
          <BaseButton @click="deleteEntry" mode="outline">Delete</BaseButton>
          <BaseButton @click="hideDialog">Back to entry</BaseButton>
        </template>
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
    dialogIsVisible() {
      return this.$store.getters.dialogIsVisible;
    },
  },
  methods: {
    ...mapActions(["showDialog", "hideDialog"]),
    deleteEntry() {
      this.$store.dispatch("deleteEntry", this.id);
      this.$router.push("/journal");
    },
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