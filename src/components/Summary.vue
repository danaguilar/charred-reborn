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
        characterWisdom: CharacterData.MentalAttributes.WillAttr,
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
      }
    }
  }
</script>
<template>
  <div>
    <h2>Summary</h2>
    <hr />
    <b-card>
      <h3>Basic</h3>
      <b-row>
        <b-col>Name:</b-col>
        <b-col><em>Cool Man</em></b-col>
        <b-col>Age:</b-col>
        <b-col>{{ currentAge }}</b-col>
      </b-row>
      <br /><br />
      <h3>Attributes</h3>
      <b-row>
        <b-col>Mental Pool</b-col>
        <b-col><b>{{ mentalLeft }} / {{ totalMentalPool }}</b></b-col>
      </b-row>
      <hr />
      <b-row>
        <Attribute :attribute="characterWisdom" :character="character"/>
        <Attribute :attribute="characterPerception" :character="character" />
      </b-row>
      <br />
      <br />
      <b-row>
        <b-col>Physical Pool</b-col>
        <b-col><b>{{ physicalLeft }} / {{ totalPhysicalPool }}</b></b-col>
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