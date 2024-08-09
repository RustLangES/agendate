<template>
    <section class="container">
        <Card class="card">
            <template #content>
            </template>
        </Card>
    </section>
</template>

<script setup>
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
