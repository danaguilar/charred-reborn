<script setup>
  import Attribute from './Attribute.vue'
</script>

<script>
  import { CharacterData } from '../character-data';
  export default {
    data() {
      return {
        character: CharacterData,
        characterLP: CharacterData.Lifepaths,
        characterWill: CharacterData.MentalAttributes.WillAttr,
        characterPerception: CharacterData.MentalAttributes.PerceptionAttr,
        characterAgility: CharacterData.PhysicalAttributes.AgilityAttr,
        characterPower: CharacterData.PhysicalAttributes.PowerAttr,
        characterForte: CharacterData.PhysicalAttributes.ForteAttr,
        characterSpeed: CharacterData.PhysicalAttributes.SpeedAttr,
        characterReflexes: CharacterData.DerivedAttributes.ReflexesAttr,
        characterHealth: CharacterData.DerivedAttributes.HealthAttr,
        characterSteel: CharacterData.DerivedAttributes.SteelAttr,
        characterEmotion: CharacterData.DerivedAttributes.EmotionAttr,
      }
    },
    computed: {
      currentAge() {
        return CharacterData.GetAge();
      },
      startingMental() {
        return CharacterData.StartingMentalPool();
      },
      totalMentalPool() {
        return CharacterData.GetMentalPool();
      },
      startingPhysical() {
        return CharacterData.StartingPhysicalPool();
      },
      totalPhysicalPool() {
        return CharacterData.GetPhysicalPool();
      },
      mentalLeft() {
        return CharacterData.GetMentalPool() - CharacterData.SpentMental
      },
      physicalLeft() {
        return CharacterData.GetPhysicalPool() - CharacterData.SpentPhysical
      },
    }
  }
</script>
<template>
  <div>
    <h2>Attributes</h2>
    <hr />
    <b-card>
      <b-row>
        <b-col>Mental Pool</b-col>
        <b-col>
          <b>{{ mentalLeft }} / {{ totalMentalPool }}
          <b-icon 
            v-b-tooltip.hover title="Distribute Mental Points Evenly"
            @click="CharacterData.RebalanceMentalAttributes()"
            icon="arrow-clockwise" />
          </b>
        
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <Attribute :attribute="characterWill" :character="character"/>
        <Attribute :attribute="characterPerception" :character="character" />
      </b-row>
      <br />
      <br />
      <b-row>
        <b-col>Physical Pool</b-col>
        <b-col>
          <b>{{ physicalLeft }} / {{ totalPhysicalPool }}
          <b-icon 
            v-b-tooltip.hover title="Distribute Physical Points Evenly"
            @click="CharacterData.RebalancePhysicalAttributes()"
            icon="arrow-clockwise" />
          </b>
        </b-col>

      </b-row>
      <hr />
      <b-row>
        <Attribute :attribute="characterPower" :character="character"/>
        <Attribute :attribute="characterForte" :character="character"/>
        <Attribute :attribute="characterAgility" :character="character"/>
        <Attribute :attribute="characterSpeed" :character="character"/>
      </b-row>
      <br />
      <br />
      <b-row>
        <b-col>Derived</b-col>
      </b-row>
      <hr />
      <b-row>
        <Attribute :attribute="characterHealth" :character="character"/>
        <Attribute :attribute="characterReflexes" :character="character"/>
        <Attribute :attribute="characterSteel" :character="character"/>
        <Attribute :attribute="characterEmotion" :character="character"/>
      </b-row>
    </b-card>
  </div>
</template>