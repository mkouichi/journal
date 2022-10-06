<template>
  <li>
    <div class="flex">
      <h2 id="title">{{ title }}</h2>
      <p id="date">{{ date }}</p>
    </div>
    <p>{{ body }}</p>
    <div>
      <BaseButton link :to="detailsLink" mode="outline">View More</BaseButton>
    </div>
  </li>
</template>

<script>
export default {
  props: ["date", "id", "title", "body"],
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
  padding: 2rem;
}
li a {
  margin-right: 0;
}
.flex {
  display: flex;
  justify-content: end;
  align-items: center;
}
#title {
  margin-right: auto;
}
#date {
  color: #656565;
}
</style>