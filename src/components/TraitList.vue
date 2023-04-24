<script setup>
  import Trait from './Trait.vue'
</script>

<script>
  import { DwarfTraitList, TraitList } from '../core';
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
      },
      affordableCosts() {
        return this.costList.filter(cost => cost <= CharacterData.GetTraitPointsLeft())
      }
    }
  }
</script>

<template>
  <div>
    <b-tabs content-class="mt-3" justified>
      <b-tab v-for="(traits, typeName) in traitList" :title="typeName" >
        <template #title>
          {{  TraitList.formattedType(typeName) }}
          <b-icon :icon="traits[0].IconString()"></b-icon>
        </template>
        <div v-for="cost in affordableCosts()">
          <div v-if="filterByCost(traits, cost).length != 0">
          <b-row>
            <h3 class="separator">
              {{ cost }} Point Traits
            </h3>
            <b-col class="mb-2" :cols="trait.ColSize()" v-for="(trait) in filterByCost(traits, cost)">
              <Trait :trait="trait"  :is-character-trait="false" :trait-functions="CharacterData.TraitFunctions()"/>
            </b-col>
          </b-row>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>