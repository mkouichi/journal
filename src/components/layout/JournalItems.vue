<template>
  <li>
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
    <div>
      <BaseButton link :to="detailsLink" mode="outline">View More</BaseButton>
    </div>
  </li>
</template>

<script>
export default {
  props: ["id", "title", "text"],
  computed: {
    detailsLink() {
      return this.$route.path + "/" + this.id;
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: end;
}
li {
  margin: 1.5rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}
</style>