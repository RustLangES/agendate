<template>
  <li v-if="props.form">
    <Button as="router-link" :to="'/form/' + form.id">
      <h3 class="text-center">{{props.form.title}}</h3>
      <span>{{props.form.description}}</span>
    </Button>
  </li>
</template>

<script setup>
const props = defineProps({
  form: {
    id: Number,
    title: String,
    description: String,
  },
})
</script>

<style>
.p-button {
  display: flex;
  height: 100%;
  color: black;
  border: 1px solid black;
  flex-direction: column;
  text-decoration: none;
}

.p-button:not(:disabled):hover {
  color: black;
  border: 1px solid black;
  box-shadow: 5px 5px 0px 0 black;
}
</style>
