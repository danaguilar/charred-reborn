<script setup>
  import Lifepaths from './components/LifePaths.vue'
  import Summary from './components/Summary.vue'
  import Lists from './components/Lists.vue'
  import CharacterTraits from './components/CharacterTraits.vue'
</script>

<template>
  <div class="bg-light">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="p-2">
      <b-navbar-brand href="#">Character Burner</b-navbar-brand>
    </b-navbar>
    <b-container fluid>
      <b-row>
        <b-col cols="4" class="pt-4" style="overflow: auto; height: 100vh">
          <Lifepaths />
        </b-col>
        <b-col cols="8" class="pt-4" style="overflow: auto; height: 100vh">
          <b-row>
            <b-col>
              <Summary />
            </b-col>
            <b-col>
              <Lists />
            </b-col>
          </b-row>
          <b-row>
            <CharacterTraits />
          </b-row>
        </b-col>
      </b-row>
      <br>
    </b-container>
  </div>
</template>