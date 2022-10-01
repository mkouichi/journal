<template>
  <BaseCard>
    <h1>{{ entry.title }}</h1>
    <p>{{ entry.text }}</p>
  </BaseCard>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    entry() {
      return this.$store.getters.getEntryById(this.id);
    },
  },
};
</script>