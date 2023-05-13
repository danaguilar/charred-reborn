<script setup>
  import GearList from './GearList.vue'
</script>

<script>
  import { CharacterData } from '../character-data';
  import { DwarfResourceList, Reputation, ReputationType} from '../core';
  export default {
    data() {
      let new_reputation = new Reputation()
      return {
          character: CharacterData,
          gear: CharacterData.gear,
          property: CharacterData.property,
          resourceList: DwarfResourceList,
          fields: [
            { key: 'rp', label: 'cost'},
            { key: 'name', label: 'name'}
          ],
          selected: new_reputation.type,
          options: [
            { text: ReputationType.Minor.name, value: 'Minor Rep' },
            { text: ReputationType.Notable.name, value: 'Major Rep' },
            { text: ReputationType.Major.name, value: 'Extreme Rep' }
          ]
        }
      },
      methods: {
        removeGear(gear) {
          CharacterData.RemoveResource(gear)
        }
      }
    }
</script>

<template>
  <div>
    <h2>Resources</h2>
    <hr>
    <b-card>
      <b-row>
        <b-col class="d-flex justify-content-between">
          <h5> 
          </h5>
          <h4 class="text-right">
            {{ character.AvailableResourcePoints() }} / {{ character.GetResourcePoints() }} <b-icon icon="currency-exchange"></b-icon>
          </h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
            <h3>Resources B1</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mx-2">
          <b-row class="border-bottom border-2">
            <h4 class="text-center">Gear <b-icon icon="gear-fill"></b-icon></h4>
          </b-row>
          <b-row>
            <b-table
              :items="gear"
              :fields="fields"
              thead-class="d-none"
              borderless
              small
              hover
            >
              <template #cell(rp)="row">
                {{ row.item.rp }} <b-icon icon="currency-exchange"></b-icon>
              </template>

              <template #cell(name)="row">
                <div class="d-flex justify-content-between align-items-center">
                  <b>{{ row.item.name }}</b>
                  <div class="pointer text-muted" @click="removeGear(row.item)">
                    <b-icon icon="x"></b-icon>
                  </div>
                </div>
              </template>
            </b-table>
          </b-row>
          <b-row>
            <b-button  size="sm" block class="w-100" variant="outline-primary" v-b-modal.gearListModal>
              <b-icon icon="plus"></b-icon>
                Add New Gear
              <b-icon icon="plus"></b-icon>
            </b-button>
          </b-row>
        </b-col>
          <b-modal 
            id="gearListModal" 
            size="xl" 
            centered 
            footerClass="p-0 border-top-0"
            title="Trait List">
            <template #modal-header>
              <div class="d-flex justify-content-between w-100">
                <h1>Gear</h1>
              </div>
            </template>
            <template #modal-footer>
              <span></span>
            </template>
            <GearList :gear-list="resourceList.gear" :avaiable-resource-points="character.AvailableResourcePoints()" />
          </b-modal>
        <b-col class="mx-2">
          <b-row class="border-bottom border-2">
            <h4 class="text-center">Properties<b-icon icon="house-fill"></b-icon></h4>
          </b-row>
          <b-row>
            <b-table
              :items="property"
              :fields="fields"
              thead-class="d-none"
              borderless
              small
              hover
            >
              <template #cell(rp)="row">
                {{ row.item.rp }} <b-icon icon="currency-exchange"></b-icon>
              </template>

              <template #cell(name)="row">
                <div class="d-flex justify-content-between align-items-center">
                  <b>{{ row.item.name }}</b>
                  <div class="pointer text-muted" @click="removeGear(row.item)">
                    <b-icon icon="x"></b-icon>
                  </div>
                </div>
              </template>
            </b-table>
          </b-row>
          <b-row>
            <b-col>
              <b-button  size="sm" block class="w-100" variant="outline-primary" v-b-modal.propertyListModal>
                <b-icon icon="plus"></b-icon>
                  Add New Property
                <b-icon icon="plus"></b-icon>
              </b-button>
            </b-col>
          <b-modal 
            id="propertyListModal" 
            size="xl" 
            centered 
            footerClass="p-0 border-top-0"
            title="Trait List">
            <template #modal-header>
              <div class="d-flex justify-content-between w-100">
                <h1>Gear</h1>
              </div>
            </template>
            <template #modal-footer>
              <span></span>
            </template>
            <GearList :gear-list="resourceList.property" :avaiable-resource-points="character.AvailableResourcePoints()"/>
          </b-modal>
          </b-row>
        </b-col>
      </b-row>
      <br>
      <hr>
      <br>
      <b-row>
        <b-col>
            <h3>Circles B1</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-row>
            <h4 class="text-center">Reputations<b-icon icon="trophy-fill"></b-icon></h4>
          </b-row>
          <b-row>
            <b-col>
              <b-button  size="sm" block class="w-100" variant="outline-primary" v-b-modal.reputationModal>
                <b-icon icon="plus"></b-icon>
                  Add New Reputation
                <b-icon icon="plus"></b-icon>
              </b-button>
            </b-col>
            <b-modal 
              id="reputationModal" 
              size="xl" 
              centered 
              footerClass="p-0 border-top-0"
              title="Trait List">
              <template #modal-header>
                <div class="d-flex justify-content-between w-100">
                  <h2>New Reputation</h2>
                  <h2>7 <b-icon icon="currency-exchange"></b-icon></h2>
                </div>
              </template>
              <b-row>
                <b-col class="d-flex justify-content-center">
                  <b-form-radio-group
                    id="btn-radios-2"
                    v-model="selected"
                    :options="options"
                    button-variant="outline-success"
                    size="lg"
                    name="radio-btn-outline"
                    buttons
                  ></b-form-radio-group>
                </b-col>
              </b-row>
              <template #modal-footer>
                <b-row>
                  <b-col>
                    <button class="button">Add Reputation</button>
                  </b-col>
                </b-row>
              </template>

            </b-modal>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <h4 class="text-center">Contacts<b-icon icon="person-badge-fill"></b-icon></h4>
          </b-row>
          <b-row>
            <b-col>
              <b-button  size="sm" block class="w-100" variant="outline-primary" v-b-modal.traitListModal>
                <b-icon icon="plus"></b-icon>
                  Add New Contact
                <b-icon icon="plus"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <h4 class="text-center">Affiliations<b-icon icon="people-fill"></b-icon></h4>
          </b-row>
          <b-row>
            <b-col>
              <b-button  size="sm" block class="w-100" variant="outline-primary" v-b-modal.traitListModal>
                <b-icon icon="plus"></b-icon>
                  Add New Affiliation
                <b-icon icon="plus"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<style>
  [type='radio'] {
    display: none; 
  }
</style>