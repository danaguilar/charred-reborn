<script setup>
  import SelectedLifepath from './SelectedLifepath.vue'
  import AvailableLifepaths from './AvailableLifepaths.vue'
</script>

<script>
  import { CharacterData, AvailableLifepathList } from '../character-data';
  export default {
    data() {
      return {
        characterLP: CharacterData.Lifepaths
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
      <AvailableLifepaths :available-lifepath-list = "AvailableLifepathList" />
    </b-sidebar>
    <b-row>
      <b-col>
        <h2>LIFEPATHS</h2>
      </b-col>
      <b-col class="d-flex align-items-center justify-content-between">
        <div></div>
        <b-button v-b-toggle.sidebar-1 variant="success">Add New Lifepath</b-button>
      </b-col>
    </b-row>
    <hr />
    <div class="p-3">
      <b-row class="mb-4" v-for="lifePath in characterLP">
        <SelectedLifepath :lifepath-data = "lifePath" :from-list = "false"/>
      </b-row>
    </div>
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
