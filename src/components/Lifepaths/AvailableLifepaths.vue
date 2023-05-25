<script setup>
  import { LeadsToIcons } from 'js/lifepath'
  import Lifepath from 'components/Lifepaths/LifepathChoice.vue'
  import DisabledLifepath from 'components/Lifepaths/LifepathDisabledChoice.vue'
</script>
<script>
  export default {
    props: {
      lifepaths: Object,
      showDisabled: false
    },
    methods: {
      shouldShowSetting(setting) {
        if(this.showDisabled) return true
        return this.lifepaths.SettingList[setting].reduce(
          (total, lifepath) => {
            return total + !lifepath.disabled
          },0)  != 0
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
    <div class="px-4 py-3" v-for="(settingLifepaths, setting) in lifepaths.SettingList">
      <div class="separator" v-show="shouldShowSetting(setting)">
        <h3>
          <b-icon :icon="lifepaths.SettingNameToIcons(setting, LeadsToIcons)"></b-icon>
          {{ setting }}
          <b-icon :icon="lifepaths.SettingNameToIcons(setting, LeadsToIcons)"></b-icon>
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