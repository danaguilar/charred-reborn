<script setup>
  import PhysicalAttribute from 'components/Attributes/PhysicalAttribute.vue'
  import MentalAttribute from 'components/Attributes/MentalAttribute.vue'
  import HealthAttribute from 'components/Attributes/HealthAttribute.vue'
</script>

<script>
  import { CharacterData } from 'js/character-data';
import SteelAttribute from '../Attributes/SteelAttribute.vue';
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
            characterResource: CharacterData.DerivedAttributes.ResouceAttr,
            characterCircles: CharacterData.DerivedAttributes.CircleAttr,
            characterEmotion: CharacterData.GetEmotionAttribute()
        };
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
            return CharacterData.GetMentalPool() - CharacterData.SpentMental;
        },
        physicalLeft() {
            return CharacterData.GetPhysicalPool() - CharacterData.SpentPhysical;
        },
    },
    components: { SteelAttribute }
}
</script>
<template>
  <b-row>
    <b-col>
      <h2>Stats</h2>
      <hr />
      <b-card>
        <b-row>
          <b-col>
            <b-row class="d-flex justify-content-between">
              <b-col>
                <h4 class="text-primary">Mental</h4>
              </b-col>
              <b-col class="d-flex justify-content-between align-items-center">
                <div></div>
                <h4 class="text-success">Physical</h4>
              </b-col>
            </b-row>
            <b-row class="d-flex justify-content-between">
              <b-col>
                <span class="text-primary">
                  <h4>{{ mentalLeft }} / {{ totalMentalPool }}
                  <b-icon 
                    v-b-tooltip.hover title="Distribute Mental Points Evenly"
                    @click="CharacterData.RebalanceMentalAttributes()"
                    icon="arrow-clockwise" />
                  </h4>
                </span>
              </b-col>
              <b-col class="d-flex justify-content-between align-items-center">
                <div></div>
                <span class="text-success">
                  <h4>{{ physicalLeft }} / {{ totalPhysicalPool }}
                  <b-icon 
                    v-b-tooltip.hover title="Distribute Physical Points Evenly"
                    @click="CharacterData.RebalancePhysicalAttributes()"
                    icon="arrow-clockwise" />
                  </h4>
                </span>
              </b-col>
            </b-row>
            <hr>
            <b-row>
              <b-col cols="1"></b-col>
              <MentalAttribute :attribute="characterWill" :character="character"/>
              <MentalAttribute :attribute="characterPerception" :character="character" />
              <PhysicalAttribute :attribute="characterPower" :character="character"/>
            </b-row>
            <b-row>
              <b-col cols="1"></b-col>
              <PhysicalAttribute :attribute="characterForte" :character="character"/>
              <PhysicalAttribute :attribute="characterAgility" :character="character"/>
              <PhysicalAttribute :attribute="characterSpeed" :character="character"/>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mt-2">
        </b-row>
        <b-row>
        </b-row>
      </b-card>
    </b-col>
    <b-col>
      <h2>Attributes</h2>
      <hr />
      <b-card>
        <b-row>
          <b-col cols="6">
            <HealthAttribute />
          </b-col>
          <b-col cols="6">
            <SteelAttribute />
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>