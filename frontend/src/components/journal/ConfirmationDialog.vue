<template>
  <w-dialog title-class="warning--bg white">
    <template #title>
      <w-icon class="mr2 title2">mdi mdi-cancel</w-icon>
      <span class="title2">Cancel</span>
    </template>
    <p>Are you sure? Your draft will be lost.</p>

    <div class="spacer"></div>

    <template #actions>
      <div class="spacer"></div>
      <w-button
        lg
        @click="$emit('discardDraft')"
        class="mr5 white"
        bg-color="warning"
      >
        Discard
      </w-button>
      <w-button
        lg
        @click="$emit('closeDialog')"
        class="white"
        bg-color="success"
        >Back to entry</w-button
      >
    </template>
  </w-dialog>
</template>

<script setup>
const emits = defineEmits(["discardDraft", "closeDialog"]);
</script>

<style scoped>
</style>