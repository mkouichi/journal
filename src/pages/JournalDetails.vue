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
      const journals = this.$store.getters["journals/journals"];
      const foundEntry = journals.find((item) => item.id === this.id);
      return foundEntry;
    },
  },
};
</script>