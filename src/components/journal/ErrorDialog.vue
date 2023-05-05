<template>
  <w-dialog title-class="error--bg white" @close="$emit('resetError')">
    <template #title>
      <w-icon class="mr2 title2">mdi mdi-alert-circle</w-icon>
      <span class="title2">{{ error.errorCode }}</span>
    </template>
    <p>{{ error.errorMessage }}</p>
    <template #actions>
      <div class="spacer"></div>
      <w-button lg outline @click="$emit('resetError')">Okay</w-button>
    </template>
  </w-dialog>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

const emits = defineEmits(["resetError"]);
</script>

<style scoped>
</style>