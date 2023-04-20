<script setup>
  import Trait from './Trait.vue'
</script>

<script>
  import { DwarfTraitList } from '../core';
  import { CharacterData } from '../character-data';

  export default {
    data() {
      return {
        traitList: DwarfTraitList,
        costList: [
        7,6,5,4,3,2,1
        ]
      }
    },
    methods: {
      filterByCost(traitList, cost) {
        return traitList.filter(trait => trait.cost == cost)
      }

    }
  }
</script>

<template>
  <div>
    <b-tabs content-class="mt-3" justified>
      <b-tab v-for="(traits, typeName) in traitList" :title="typeName" >
        <div v-for="cost in costList">
          <div v-if="filterByCost(traits, cost).length != 0">
          <b-row>
            <h3 class="separator">
              {{ cost }} Point Traits
            </h3>
            <b-col class="mb-2" :cols="trait.ColSize()" v-for="(trait) in filterByCost(traits, cost)">
              <Trait :trait="trait" />
            </b-col>
          </b-row>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>