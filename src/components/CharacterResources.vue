<script setup>
  import GearList from './GearList.vue'
</script>

<script>

  import { CharacterData } from '../character-data';
  import { DwarfResourceList } from '../core';
  export default {
    data() {
      return {
          character: CharacterData,
          resourceList: DwarfResourceList
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
          <div></div>
          <h4 class="text-right">
            {{ character.GetResourcePoints() }} / {{ character.GetResourcePoints() }}
          </h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-row>
            <h4 class="text-center">Gear</h4>
          </b-row>
          <b-row>
            <b-col>
              <b-button  size="sm" block class="w-100" variant="outline-primary" v-b-modal.gearListModal>
                <b-icon icon="plus"></b-icon>
                  Add New Gear
                <b-icon icon="gear-wide-connected"></b-icon>
                <b-icon icon="plus"></b-icon>
              </b-button>
            </b-col>
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
            <GearList :gear-list="resourceList.gear" />
          </b-modal>
        <b-col>
          <b-row>
            <h4 class="text-center">Properties</h4>
          </b-row>
          <b-row>
            {{  resourceList.property  }}
            <b-col>
              <b-button  size="sm" block class="w-100" variant="outline-primary" v-b-modal.traitListModal>
                <b-icon icon="plus"></b-icon>
                  Add New Property
                <b-icon icon="house-fill"></b-icon>
                <b-icon icon="plus"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <h4 class="text-center">Reputations</h4>
          </b-row>
          <b-row>
            <b-col>
              <b-button  size="sm" block class="w-100" variant="outline-primary" v-b-modal.traitListModal>
                <b-icon icon="plus"></b-icon>
                  Add New Reputation
                <b-icon icon="trophy-fill"></b-icon>
                <b-icon icon="plus"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <h4 class="text-center">Contacts</h4>
          </b-row>
          <b-row>
            <b-col>
              <b-button  size="sm" block class="w-100" variant="outline-primary" v-b-modal.traitListModal>
                <b-icon icon="plus"></b-icon>
                  Add New Contact
                <b-icon icon="person-badge-fill"></b-icon>
                <b-icon icon="plus"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <h4 class="text-center">Affiliations</h4>
          </b-row>
          <b-row>
            <b-col>
              <b-button  size="sm" block class="w-100" variant="outline-primary" v-b-modal.traitListModal>
                <b-icon icon="plus"></b-icon>
                  Add New Affiliation
                <b-icon icon="people-fill"></b-icon>
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