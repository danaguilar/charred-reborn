<script setup>
  import SelectedLifepath from 'components/Lifepaths/SelectedLifepath.vue'
  import AvailableLifepaths from 'components/Lifepaths/AvailableLifepaths.vue'
</script>

<script>
  import { CharacterData } from 'js/character-data';
  export default {
    data() {
      return {
        characterLP: CharacterData.Lifepaths,
        availableLifepathList: CharacterData.StockData.availableLifepathList
      }
    },
    methods: {
      AddLifepath(event) {
        CharacterData.AddRandomLifepath()
      }
    }
  }
</script>

<template>
  <div>
    <b-sidebar id="sidebar-1" title="LifePaths" shadow backdrop no-header>
      <AvailableLifepaths :lifepaths = "availableLifepathList" />
    </b-sidebar>
    <b-row class="border-bottom">
      <b-col class="d-flex justify-content-between">
        <h2>Lifepaths</h2>
        <h2>
          {{ characterLP.length }} LP
        </h2>
      </b-col>
    </b-row>
    <div class="p-3">
      <b-row class="mb-4" v-for="lifePath in characterLP">
        <div class="separator mb-4" v-show="lifePath.new_setting">
          <em>
            Moving to {{ lifePath.setting }}
          </em>
        </div>
        <SelectedLifepath :lifepath-data = "lifePath" />
      </b-row>
      <b-row>
        <b-button v-b-toggle.sidebar-1 variant="outline-success">
          <b-icon icon="plus"></b-icon>
          Add New Lifepath
          <b-icon icon="plus"></b-icon>
        </b-button>
      </b-row>
    </div>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<style>
  .lp-list-bg {
    background-color: cornflowerblue;
  }
  .lp-summary-bg {
    background-color:brown;
  }
  
  .b-sidebar {
    width: 90%
  }
</style>
