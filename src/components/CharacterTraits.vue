<script setup>
  import Trait from './Trait.vue'
</script>

<script>
  import { CharacterData } from '../character-data';
  export default {
    computed: {
      currentTraitPoints() {
        return CharacterData.GetTotalTraitPoints();
      },
      activeDieTraits() {
        return CharacterData.AvailableLPTraits.filter(trait => trait.type == "die")
      },
      activeCallOnTraits() {
        return CharacterData.AvailableLPTraits.filter(trait => trait.type == "call_on")
      },
      activeCharacterTraits() {
        return CharacterData.AvailableLPTraits.filter(trait => trait.type == "character")
      },
      spentCharacterTraits() {
        return CharacterData.SpentTraitPoints()
      }
    }
  }
</script>

<template>
  <div>
    <hr>
    <b-card>
      <b-row>
        <b-col class="d-flex justify-content-between">
          <b-button  size="sm" block variant="outline-danger">
            <b-icon icon="plus"></b-icon>
              Add New Trait
            <b-icon icon="plus"></b-icon>
          </b-button>
          <h3>
            {{ currentTraitPoints - spentCharacterTraits }} / {{ currentTraitPoints }}
          </h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h4 class="text-center">Die Traits</h4>
          <hr>
          <b-row v-for="trait in activeDieTraits">
            <b-col>
              <Trait :trait="trait" />
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <h4 class="text-center">Call-On Traits</h4>
          <hr>
          <b-row v-for="trait in activeCallOnTraits">
            <b-col>
              <Trait :trait="trait" />
            </b-col>
          </b-row>
        </b-col>
        </b-row>
        <b-row>
        <b-col>
          <h4 class="text-center">Character Traits</h4>
          <hr>
          <b-row>
            <b-col cols="4" v-for="trait in activeCharacterTraits">
              <Trait :trait="trait" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
    <br><br>
    <br><br>
    <br><br>
  </div>
</template>