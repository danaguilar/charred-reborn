<script setup>
  import PhysicalAttribute from 'components/Attributes/PhysicalAttribute.vue'
  import MentalAttribute from 'components/Attributes/MentalAttribute.vue'
  import HealthAttribute from 'components/Attributes/HealthAttribute.vue'
  import SteelAttribute from 'components/Attributes/SteelAttribute.vue';
  import ResourceAttribute from 'components/Attributes/ResourceAttribute.vue'
  import CirclesAttribute from 'components/Attributes/CirclesAttribute.vue'
  import ReflexesAttribute from 'components/Attributes/ReflexesAttribute.vue'
  import MortalWoundsAttribute from 'components/Attributes/MortalWoundsAttribute.vue'
  import HesitationAttribute from 'components/Attributes/HesitationAttribute.vue'
</script>

<script>
  import { CharacterData } from 'js/character-data';
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
            <b-row >
              <b-col class="d-flex justify-content-between">
                <h4>
                  Mental Pool
                  <b-icon 
                    v-b-tooltip.hover title="Distribute Mental Points Evenly"
                    @click="CharacterData.RebalanceMentalAttributes()"
                    class="pointer"
                    icon="shuffle" />
                </h4>
                <h4>
                  {{ mentalLeft }} / {{ totalMentalPool }} <b-icon icon="lightbulb-fill"></b-icon>
                </h4>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="1"></b-col>
              <MentalAttribute :attribute="characterWill" :character="character"/>
              <MentalAttribute :attribute="characterPerception" :character="character" />
            </b-row>
            <hr>
            <b-row>
              <b-col class="d-flex justify-content-between align-items-center">
                <h4>
                  Physical 
                  <b-icon 
                    v-b-tooltip.hover title="Distribute Physical Points Evenly"
                    @click="CharacterData.RebalancePhysicalAttributes()"
                    class="pointer"
                    icon="shuffle" />
                </h4>
                <h4>
                  {{ physicalLeft }} / {{ totalPhysicalPool }} <b-icon icon="heart-fill"></b-icon>
                </h4>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="1"></b-col>
              <PhysicalAttribute :attribute="characterPower" :character="character"/>
              <PhysicalAttribute :attribute="characterForte" :character="character"/>
            </b-row>
            <b-row>
              <b-col cols="1"></b-col>
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
          <b-col cols="6">
            <ResourceAttribute />
          </b-col>
          <b-col cols="6">
            <CirclesAttribute />
          </b-col>
          <b-col cols="6">
            <ReflexesAttribute />
          </b-col>
          <b-col cols="6">
            <MortalWoundsAttribute />
          </b-col>
          <b-col cols="6">
            <HesitationAttribute />
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>