<template>
  <section class="container">
    <Card class="card">
    <template #title>
      <section v-if="data && data.form" class="column">
        <h1 class="text-center">
          {{data.form.title}}
        </h1>
        <section class="form">
          <div class="column gap details">
            <span class="text-center" style="margin-bottom:2em">{{data.form.description}}</span>
            <div class="flex gap bold">
              <i class="flex content-center pi pi-clock" style="color:#3F3F46" />
              <span class="bold" style="color:#3F3F46">45 min</span>
            </div>
            <div class="flex gap bold">
              <i class="flex content-center pi pi-video" style="color:#3F3F46" />
              <span class="bold" style="color:#3F3F46">Los detalles de la reunion se revelaran cuando aceptes la invitacion</span>
            </div>
          </div>
          <Divider layout="vertical" />
          <Divider layout="horizontal" />
          <DatePicker inline :minDate="tomorrow"/>
        </section>
      </section>
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
const route = useRoute()
const { id } = route.params
const { data, status } = await useAsyncData('getFormId', async () => await $fetch(`/api/availability/${id}`))
const today = new Date()
const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
</script>

<style>
.p-datepicker-select-month, .p-datepicker-select-year { pointer-events: none; }
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #fed7aa;
}

.card {
  background-color: #FDCE9A;
  padding: 20px;
  border-radius: 0px;
  min-width: 100%;
}

.form {
  display: flex;
  flex-direction: row;
}
.form .p-divider-horizontal { display: none; }

.details { max-width: 400px; }
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
  .details { max-width: 100%; }
  .form { flex-direction: column; }
  .form .p-divider-vertical { display: none; }
  .form .p-divider-horizontal { display: flex; }
}

/*
max-sm	@media not all and (min-width: 640px) { ... }
max-md	@media not all and (min-width: 768px) { ... }
max-lg	@media not all and (min-width: 1024px) { ... }
max-xl	@media not all and (min-width: 1280px) { ... }
max-2xl	@media not all and (min-width: 1536px) { ... }
*/
</style>
