<script setup>
  import Lifepaths from './components/LifePaths.vue'
  import Summary from './components/Summary.vue'
  import Lists from './components/Lists.vue'
  import CharacterTraits from './components/CharacterTraits.vue'
  import CharacterResources from './components/CharacterResources.vue'
</script>

<template>
  <div class="bg-light">
    <b-row class="pt-4 px-2">
      <b-container fluid>
        <b-row>
          <b-col cols="4" class="pt-4" style="overflow: auto; height: 100vh">
            <Lifepaths />
          </b-col>
          <b-col cols="8" class="pt-4" style="overflow: auto; height: 100vh">
            <b-tabs>
              <b-tab title="Stats and Attributes">
                <Summary />
              </b-tab>
              <b-tab title="Skills and Traits">
                <b-row>
                  <b-col>
                    <!-- <Summary /> -->
                    <Lists />
                  </b-col>
                  <b-col>
                    <CharacterTraits />
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Circles and Resources">
                <b-row class="mt-1">
                  <b-col>
                    <CharacterResources />
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
        <br>
      </b-container>
    </b-row>
  </div>
</template>