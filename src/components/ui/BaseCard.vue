<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  margin: auto;
  max-width: 45rem;
}
</style>