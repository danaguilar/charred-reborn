<script setup>
  import Lifepaths from './components/LifePaths.vue'
  import Summary from './components/Summary.vue'
  import Lists from './components/Lists.vue'
  import CharacterTraits from './components/CharacterTraits.vue'
  import CharacterResources from './components/CharacterResources.vue'
</script>

<template>
  <div class="bg-light">
    <b-row class="bg-dark text-light p-2">
      <b-col>
        <h3>(NAME)</h3>
      </b-col>
      <b-col>
        Perception
      </b-col>
      <b-col>
        Will
      </b-col>
      <b-col>
        Power
      </b-col>
      <b-col>
        Forte
      </b-col>
      <b-col>
        Agility
      </b-col>
      <b-col>
        Speed
      </b-col>
    </b-row>
    <b-row>
    <b-container fluid>
      <b-row>
        <b-col cols="4" class="pt-4" style="overflow: auto; height: 100vh">
          <Lifepaths />
        </b-col>
        <b-col cols="8" class="pt-4" style="overflow: auto; height: 100vh">
          <b-row>
            <b-col>
              <!-- <Summary /> -->
              <Lists />
            </b-col>
            <b-col>
              <CharacterTraits />
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col>
              <CharacterResources />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <br>
    </b-container>
    </b-row>
  </div>
</template>