
<script>
  import { RelationshipType, RelationshipModifier } from 'js/core'
  export default {
    props: {
      CharacterData: Object
    },
    data() {
      return {
        relationshipTypes: [
          RelationshipType.Minor,
          RelationshipType.Important,
          RelationshipType.Powerful
        ],
        relationshipModifiers: [
          RelationshipModifier.ImmediateFamily,
          RelationshipModifier.OtherFamily,
          RelationshipModifier.Romantic,
          RelationshipModifier.Forbidden,
          RelationshipModifier.Hateful
        ],
        new_name: ''
      }
    },
    methods: {
      updateRelationshipType(relType) {
        this.CharacterData.UpdateNewRelationshipType(relType)
      },
      checkRpCost(relType) {
        return relType.rp > this.CharacterData.AvailableResourcePoints()
      },
      toggleMod(modifier) {
        this.CharacterData.ToggleNewRelationshipMod(modifier)
      },
      modButtonVariant(modifier) {
        if(this.CharacterData.new_relationship.rel_modifiers.indexOf(modifier) != -1) return "dark"
        return "outline-secondary"
      },
      typeButtonVariant(relType) {
        if(this.CharacterData.new_relationship.type == relType) return "primary"
        return "outline-primary"
      },
      AddRelationship() {
        this.CharacterData.new_relationship.name = this.new_name
        this.CharacterData.AddNewRelationshipToRelationships()
        this.$bvModal.hide('relationshipModal')
      }
    }
  }
</script>

<template>
  <b-modal 
    id="relationshipModal"
    size="lg"
    centered 
    footerClass="border-top-0"
    title="Trait List">
    <template #modal-header>
      <div class="d-flex justify-content-between w-100">
        <h2>New Relationship</h2>
        <h2>{{ CharacterData.new_relationship.rp }} <b-icon icon="currency-exchange"></b-icon></h2>
      </div>
    </template>
    <b-row>
      <b-col class="d-flex justify-content-center">
        <b-button-group> 
          <b-button v-for="relType in relationshipTypes"
            :variant="typeButtonVariant(relType)" 
            @click="updateRelationshipType(relType)">
              {{ relType.name }} ({{ relType.rp }})
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col class="d-flex justify-content-center">
        <b-button-group>
        <b-button 
          v-for="modifier in relationshipModifiers"
          @click="toggleMod(modifier)" 
          :variant="modButtonVariant(modifier)">
            {{ modifier.name }} ({{ modifier.rp }})
        </b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <b-form-input v-model="new_name" placeholder="Relationship Description"></b-form-input>
      </b-col>
    </b-row>
    <template #modal-footer>
      <b-row>
        <b-col>
          <b-button :disabled="checkRpCost(relationshipTypes[0])" @click="AddRelationship()" variant="outline-success">Add Relationship</b-button>
        </b-col>
      </b-row>
    </template>
  </b-modal>
</template>