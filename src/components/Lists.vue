
<script setup>
  import CharacterSkills from './CharacterSkills.vue'
</script>

<script>
  import { CharacterData } from '../character-data';
  export default {
    data() {
      return {
        characterLP: CharacterData.Lifepaths,
        characterData: CharacterData,
        fields: [
          { key: 'type', label: 'Type' },
          { key: 'name', label: 'Trait' },
          { key: 'cost', label: 'Cost' },
        ]
      }
    },
    computed: {
      currentRes() {
        return CharacterData.GetResourcePoints();
      },
      currentTraitPoints() {
        return CharacterData.GetTotalTraitPoints();
      },
      activeTraits() {
        return CharacterData.AvailableLPTraits
      }
    },
  }
</script>

<template>
  <div>
    <h2>The Lists</h2>
    <hr />
    <CharacterSkills />

    <br><br>
    <b-card
      header="Secondary"
      header-bg-variant="secondary"
      header-text-variant="light"
    >
    <template #header>
      <b-row align-v="center">
        <b-col>
          <h2>Traits</h2>
        </b-col>
      </b-row>
    </template>

      <b-table
        :items="activeTraits"
        :fields="fields"
        small
      >


      </b-table>
    <!-- <b-row>
      <b-col v-for="trait in CharacterData.AvailableLPTraits" cols="6">
        <b-card class="border-0">
          <template #header> 
            {{ trait.name }}
          </template>

          {{ trait.desc }}
        </b-card>
      </b-col>
    </b-row> -->
    </b-card>
  </div>
</template>