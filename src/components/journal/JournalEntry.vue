<template>
  <li>
    <div class="flex">
      <h2 id="title">{{ entry.title }}</h2>
      <p id="date">{{ entry.date }}</p>
    </div>
    <p>{{ entry.body }}</p>
    <div>
      <BaseButton link :to="entry.id" mode="outline">View More</BaseButton>
    </div>
  </li>
</template>

<script>
export default {
  props: ["entry"],
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
p {
  margin: inherit;
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