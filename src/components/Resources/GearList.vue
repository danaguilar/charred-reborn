<script>
  import { CharacterData } from 'js/character-data';
  export default {
    props: {
      GearList: Array,
      avaiableResourcePoints: Number
    },
    methods: {
      addResource(gear) {
        CharacterData.AddResource(gear)
        this.$bvModal.hide('gearListModal')
        this.$bvModal.hide('propertyListModal')
      }
    }
  }
</script>

<template>
  <div>
    <b-row>
      <b-col cols="4" class="pb-3" v-for="gear in GearList">
        <b-button @click="addResource(gear)" size="md" variant="outline-dark" class="w-100 d-flex justify-content-between" :disabled="avaiableResourcePoints >= gear.rp ? false : true">
          <div></div>
          <b>{{ gear.name }}</b>
          <div>
            {{ gear.rp }} <b-icon icon="currency-exchange"></b-icon>
          </div>
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>