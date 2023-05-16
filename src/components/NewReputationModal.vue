
<script>
  import { ReputationType } from '../core'
  export default {
    props: {
      CharacterData: Object
    },
    data() {
      return {
        MinorReputationType: ReputationType.Minor,
        NotableReputationType: ReputationType.Notable,
        MajorReputationType: ReputationType.Major,
        new_name: ''
      }
    },
    methods: {
      updateReputationType(repType) {
        this.CharacterData.UpdateNewReputationType(repType)
      },
      checkRpCost(repType) {
        return repType.rp > this.CharacterData.AvailableResourcePoints()
      },
      AddNewReputation() {
        this.CharacterData.new_reputation.name = this.new_name
        this.CharacterData.AddNewReputationToRepList()
        this.$bvModal.hide('reputationModal')
      }
    }
  }
</script>

<template>
  <b-modal 
    id="reputationModal"
    size="lg"
    centered 
    footerClass="border-top-0"
    title="Trait List">
    <template #modal-header>
      <div class="d-flex justify-content-between w-100">
        <h2>New Reputation</h2>
        <h2>{{ CharacterData.new_reputation.rp }} <b-icon icon="currency-exchange"></b-icon></h2>
      </div>
    </template>
    <b-row>
      <b-col class="d-flex justify-content-center">
        <b-button-group>
          <b-button :disabled="checkRpCost(MinorReputationType)" variant="outline-primary" @click="updateReputationType(MinorReputationType)">{{ MinorReputationType.name }} ({{ MinorReputationType.rp }})</b-button>
          <b-button :disabled="checkRpCost(NotableReputationType)" variant="outline-primary" @click="updateReputationType(NotableReputationType)">{{ NotableReputationType.name }} ({{ NotableReputationType.rp }})</b-button>
          <b-button :disabled="checkRpCost(MajorReputationType)" variant="outline-primary" @click="updateReputationType(MajorReputationType)">{{ MajorReputationType.name }} ({{ MajorReputationType.rp }})</b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <b-form-input v-model="new_name" placeholder="Reputaion Name"></b-form-input>
      </b-col>
    </b-row>
    <template #modal-footer>
      <b-row>
        <b-col>
          <b-button :disabled="checkRpCost(MinorReputationType)" @click="AddNewReputation()" variant="outline-success">Add Reputation</b-button>
        </b-col>
      </b-row>
    </template>
  </b-modal>
</template>