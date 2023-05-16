
<script>
  import { AffiliationType } from '../core'
  export default {
    props: {
      CharacterData: Object
    },
    data() {
      return {
        affiliationTypes: [
           AffiliationType.Small,
           AffiliationType.Large,
           AffiliationType.National
        ],
        new_name: ''
      }
    },
    methods: {
      updateAffiliationType(affType) {
        this.CharacterData.UpdateNewAffiliationType(affType)
      },
      checkRpCost(affType) {
        return affType.rp > this.CharacterData.AvailableResourcePoints()
      },
      AddNewAffiliation() {
        this.CharacterData.new_affiliation.name = this.new_name
        this.CharacterData.AddNewAffiliationToAffList()
        this.$bvModal.hide('affiliationModal')
      }
    }
  }
</script>

<template>
  <b-modal 
    id="affiliationModal"
    size="lg"
    centered 
    footerClass="border-top-0"
    title="Trait List">
    <template #modal-header>
      <div class="d-flex justify-content-between w-100">
        <h2>New Affiliation</h2>
        <h2>{{ CharacterData.new_affiliation.rp }} <b-icon icon="currency-exchange"></b-icon></h2>
      </div>
    </template>
    <b-row>
      <b-col class="d-flex justify-content-center">
        <b-button-group> 
          <b-button v-for="affType in affiliationTypes"
            :disabled="checkRpCost(affType)"
            variant="outline-primary" 
            @click="updateAffiliationType(affType)">
              {{ affType.name }} ({{ affType.rp }})
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <b-form-input v-model="new_name" placeholder="Affiliation Description"></b-form-input>
      </b-col>
    </b-row>
    <template #modal-footer>
      <b-row>
        <b-col>
          <b-button :disabled="checkRpCost(affiliationTypes[0])" @click="AddNewAffiliation()" variant="outline-success">Add Affiliation</b-button>
        </b-col>
      </b-row>
    </template>
  </b-modal>
</template>