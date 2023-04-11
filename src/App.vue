<script setup>
  import Lifepaths from './components/LifePaths.vue'
  import Summary from './components/Summary.vue'
  import Lists from './components/Lists.vue'
</script>

<template>
  <div class="bg-light">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="p-2">
      <b-navbar-brand href="#">Character Burner</b-navbar-brand>
    </b-navbar>
    <b-container fluid>
      <b-row class="mt-4">
        <b-col cols="4">
          <Lifepaths />
        </b-col>
        <b-col cols="4">
          <Summary />
        </b-col>
        <b-col cols="4">
          <Lists />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>