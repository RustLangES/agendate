<template>
  <section class="container">
    <Card class="card">
    <template #title>
      <h1 class="text-center">Reunete con los miembros de <div class="title">RustLangES</div></h1>
    </template>
    <template #content>
      <div v-if="status == 'pending' || status == 'idle'">
        <Skeleton width="10rem" height="4rem" />
        <Skeleton width="10rem" height="4rem" />
        <Skeleton width="10rem" height="4rem" />
        <Skeleton width="10rem" height="4rem" />
      </div>
      <ul v-else>
        <FormItem v-for="form in data.forms" :key="form.id" :form="form" />
      </ul>
    </template>
    </Card>
  </section>
</template>

<script setup>
const { data, status } = await useAsyncData('getForms', async () => await $fetch(`/api/forms`))
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #fed7aa;
}

.card {
  padding: 20px;
  border-radius: 0px;
  min-width: 100%;
}

@media (min-width: 1024px) {
  .card {
    min-width: 900px;
    max-width: 1060px;
  }
}

@media not all and (min-width: 640px) {
  .card {
    max-width: 680px;
  }
}

/*
   max-sm	@media not all and (min-width: 640px) { ... }
   max-md	@media not all and (min-width: 768px) { ... }
   max-lg	@media not all and (min-width: 1024px) { ... }
   max-xl	@media not all and (min-width: 1280px) { ... }
   max-2xl	@media not all and (min-width: 1536px) { ... }
 */
</style>
