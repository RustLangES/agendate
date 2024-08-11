<template>
  <NuxtPage />
</template>

<style>
html, body, ul {
  border: 0;
  margin: 0;
}

h1, h2, h3 {
  font-family: Alfa Slab One, sans-serif;
  letter-spacing: 0.06em;
}

h4, h5, h6, span, a, ul {
  font-family: Work Sans, sans-serif;
}

h1 {
  font-size: 2.14em;
  margin-top: 0;
  margin-bottom: 0.8em;
  line-height: 1.2;
}
h2 {
  font-size: 1.42em;
  margin-top: 1.6em;
  margin-bottom: 0.8em;
  line-height: 1.4;
}
h3 {
  font-size: 1.28em;
  margin-top: 1.5em;
  margin-bottom: 0.4em;
  line-height: 1.5;
}
h4 {
  margin-top: 1.42em;
  margin-bottom: 0.57em;
  line-height: 1.42;
}

ul {
  display: grid;
  list-style: none;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2em;
}
.title { color: var(--p-orange-500) }
.text-center { text-align: center }

@media (min-width: 750px) { ul { grid-template-columns: repeat(3, 1fr); } }
</style>
