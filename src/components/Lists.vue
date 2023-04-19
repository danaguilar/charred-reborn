
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
  </div>
</template>