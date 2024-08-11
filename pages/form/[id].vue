<template>
  <section class="container">
    <Card class="card">
    <template #title>
      <h1 v-if="data && data.form" class="text-center">
        {{data.form.title}}
      </h1>
      <h1 v-else class="text-center">No se encontro ningun Calendario</h1>
    </template>
    <template #content>
      <div class="content-center">
        <img class="ferris" v-if="!data || !data.form" src="/FerrisChambeador.png" />
      </div>
    </template>
    </Card>
  </section>
</template>

<script setup>
const route = useRoute();
const { id } = route.params;
const { data, status } = await useAsyncData('getFormId', async () => await $fetch(`/api/availability/${id}`))
</script>

<style>
html, body {
  border: 0;
  margin: 0;
}

* { color: black; }

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #FFEDD5;
}

.card {
  background-color: #FDCE9A;
  padding: 20px;
  border-radius: 0px;
  min-width: 100%;
}

.ferris { max-width: 500px; }

@media (min-width: 1024px) {
  .card {
    min-width: 900px;
    max-width: 1060px;
  }
}

@media not all and (min-width: 640px) {
  .card { max-width: 680px; }
  .ferris { width: 100%; }
}

/*
max-sm	@media not all and (min-width: 640px) { ... }
max-md	@media not all and (min-width: 768px) { ... }
max-lg	@media not all and (min-width: 1024px) { ... }
max-xl	@media not all and (min-width: 1280px) { ... }
max-2xl	@media not all and (min-width: 1536px) { ... }
*/
</style>
