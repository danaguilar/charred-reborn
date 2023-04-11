<script setup>
  import { AvailableLifepathList } from '../character-data';
  import { LeadsToIcons } from '../lifepath'
  import Lifepath from './SelectedLifepath.vue'
</script>
<script>
  export default {
    props: {
      AvailableLifepathList: Object
    }
  }
</script>
<template>
  <div>
    <div class="px-4 py-3" v-for="(settingLifepaths, setting) in AvailableLifepathList.SettingList">
      <div class="separator">
        <h3>
          <b-icon :icon="AvailableLifepathList.SettingNameToIcons(setting, LeadsToIcons)"></b-icon>
          {{ setting }}
          <b-icon :icon="AvailableLifepathList.SettingNameToIcons(setting, LeadsToIcons)"></b-icon>
        </h3>
      </div>
      <div class="py-2" v-for="lifepathData in settingLifepaths">
        <div>
          <Lifepath :lifepath-data = "lifepathData" :from-list = "true" />
        </div>
      </div>
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