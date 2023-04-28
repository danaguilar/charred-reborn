<script setup>
  import SelectedLifepath from './SelectedLifepath.vue'
  import AvailableLifepaths from './AvailableLifepaths.vue'
</script>

<script>
  import { CharacterData } from '../character-data';
  export default {
    data() {
      return {
        characterLP: CharacterData.Lifepaths,
        availableLifepathList: CharacterData.AvailableLifepathList
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
      <AvailableLifepaths :available-lifepath-list = "availableLifepathList" />
    </b-sidebar>
    <b-row>
      <b-col class="d-flex justify-content-between">
        <h3>Lifepaths</h3>
        <h3>
          {{ characterLP.Lifepaths ? characterLP.Lifepaths.length : 0 }} LP
        </h3>
      </b-col>
    </b-row>
    <hr />
    <div class="p-3">
      <b-row class="mb-4" v-for="lifePath in characterLP">
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
