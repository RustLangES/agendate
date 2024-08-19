<template>
  <section class="container">
    <Card class="card">
    <template #title>
      <section v-if="data.form" class="column">
        <h1 class="text-center">
          {{data.form.title}}
        </h1>
      </section>
      <h1 v-else class="text-center">No se encontro ningun Calendario</h1>
    </template>
    <template #content>
      <section class="form">
        <div class="column gap details">
          <span style="margin-bottom:2em">{{data.form.description}}</span>
          <div class="flex gap bold">
            <i class="flex content-center pi pi-clock" style="color:#3F3F46" />
            <span class="bold" style="color:#3F3F46">{{data.form.duration}} min</span>
          </div>
          <div class="flex gap bold">
            <i class="flex content-center pi pi-globe" style="color:#3F3F46" />
            <span class="bold" style="color:#3F3F46">{{timeZoneName}}</span>
          </div>
          <div class="flex gap bold">
            <i class="flex content-center pi pi-video" style="color:#3F3F46" />
            <span v-if="step === 0" class="bold" style="color:#3F3F46">Los detalles de la reunion se revelaran cuando aceptes la invitacion</span>
            <span v-if="step === 1" class="bold" style="color:#3F3F46">{{selectedDate.toLocaleDateString('es-ES', {day:'numeric',month:'long',year:'numeric',hourCycle:'h23',hour:'2-digit',minute:'2-digit'})}}</span>
          </div>
        </div>
        <Divider layout="vertical" />
        <Divider layout="horizontal" />
        <client-only>
        <div v-if="step === 0" class="row gap">
          <DatePicker inline :minDate="tomorrow" v-model="selectedDate" @date-select="selectDate"/>
          <Listbox
            v-if="selectedDate && groupedAvailableTime && groupedAvailableTime.length > 0"
            v-model="selectedTime"
            :options="groupedAvailableTime"
            scrollHeight="20rem"
            optionLabel="value"
            @change="selectTime"
            listStyle="min-width:5rem">
              <template #optiongroup="slotProps">
                  <div class="flex items-center">
                      <i v-if="slotProps.option.label == 'am'" class="flex content-center pi pi-sun" />
                      <i v-else class="flex content-center pi pi-moon" />
                      <div style="margin-left:8px">{{ slotProps.option.label }}</div>
                  </div>
              </template>
          </Listbox>
        </div>
        <div v-if="step === 1" class="column gap">
          <span>Hola toy laburando</span>
        </div>
        </client-only>
      </section>
      <div class="content-center">
        <img class="ferris" v-if="!data || !data.form" src="/FerrisChambeador.png" />
      </div>
      <client-only>
      <div v-if="groupedAvailableTime && groupedAvailableTime.length > 0 && selectedTime" class="flex" style="justify-content:end;margin-top:1rem">
        <Button as="button" @click="nextStep">
          <span>Continuar</span>
        </Button>
      </div>
      </client-only>
    </template>
    </Card>
  </section>
</template>

<script setup>
const route = useRoute()
const { id } = route.params
const today = new Date()
const step = ref(0)
const confirmedDate = ref()
const selectedDate = ref()
const selectedTime = ref()
const groupedAvailableTime = ref()
const timeZoneName = new Intl.DateTimeFormat('es-ES', { timeStyle: 'full' })
  .formatToParts(today)
  .find(k => k.type === "timeZoneName")
  .value;
const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

const { data, status } = await useAsyncData(
  'getFormId',
  async () => await $fetch(`/api/availability/${id}`),
)

function nextStep() { step.value = step.value + 1 }

function selectTime({ value }) {
  console.log(value.value, value.utc)
  const utc = new Date(value.utc)
  const hours = utc.getUTCHours()
  const minutes = utc.getUTCMinutes()

  selectedDate.value = new Date(selectedDate.value.setUTCHours(hours, minutes, 0))
  // selectedTime.value = value.value
  confirmedDate.value = value
}

function selectDate (date) {
  const availables = (data.value.availabilities || [])
    .filter(el => el.day_of_week === date.getDay())
    .map(el => getIntervals(date, el.start_time, el.end_time, data.value.form.duration))
    .flat(1)

  groupedAvailableTime.value = availables
  selectedTime.value = null
}
</script>

<style>
.p-datepicker-select-month, .p-datepicker-select-year { pointer-events: none; }
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
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
