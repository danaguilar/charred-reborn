<script setup>
  import { LeadsToIcons } from '../lifepath'
  import Lifepath from './LifepathChoice.vue'
  import DisabledLifepath from './LifepathDisabledChoice.vue'
</script>
<script>
  export default {
    props: {
      AvailableLifepathList: Object,
      showDisabled: false
    },
    methods: {
      lifepathsToShow(lifepathList) {
        if(this.showDisabled) return lifepathList
        return lifepathList.filter(lifepath => !lifepath.disabled)
      }
    }
  }
</script>
<template>
  <div>
    <b-row class="px-4 py-3">
      <b-col>
        <h2 class="d-flex justify-content-between">
          <div></div>
          <div class="form-check form-switch">
            <label class="form-check-label" for="flexSwitchCheckDefault">Show All Hidden</label>
            <input v-model="showDisabled" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
          </div>
        </h2>
      </b-col>
    </b-row>
    <div class="px-4 py-3" v-for="(settingLifepaths, setting) in AvailableLifepathList.SettingList">
      <div class="separator">
        <h3>
          <b-icon :icon="AvailableLifepathList.SettingNameToIcons(setting, LeadsToIcons)"></b-icon>
          {{ setting }}
          <b-icon :icon="AvailableLifepathList.SettingNameToIcons(setting, LeadsToIcons)"></b-icon>
        </h3>
      </div>

      <b-row>
        <b-col class="col-6" v-for="(lifepathData, index) in settingLifepaths" v-show="showDisabled || !lifepathData.disabled">
          <div v-if="lifepathData.disabled">
            <DisabledLifepath :lifepath-data = "lifepathData" />
          </div>
          <div v-else>
            <Lifepath :lifepath-data = "lifepathData" />
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>


<style>
  .separator {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .separator::before,
  .separator::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #000;
  }

  .separator:not(:empty)::before {
    margin-right: .25em;
  }

  .separator:not(:empty)::after {
    margin-left: .25em;
  }
</style>