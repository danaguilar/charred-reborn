<script setup>
  import SkillsText from 'components/Skills/SkillsText.vue'
  import TraitsText from 'components/Traits/TraitsText.vue'
</script>

<script>
  import { CharacterData } from 'js/character-data';
  export default {
    props: {
      lifepathData: Object
    },
    data() {
      return {
        isHovered: false
      }
    },
    methods: {
      removeLifepath(event) {
        CharacterData.RemoveLifepath(this.lifepathData)
      }
    }
  }
</script>

<template>
  <b-card 
    header-bg-variant="white"
    header-tag="header" 
    footer-tag="footer"
    text-variant="muted"
    class="p-0 my-4">
    <template #header>
      <div>
        <b-row>
          <b-col cols="3" class="fs-6"><small>Title</small></b-col>
          <b-col cols="2" class="fs-6"><small>Res</small></b-col>
          <b-col cols="2" class="fs-6"><small>Years</small></b-col>
          <b-col cols="2" class="fs-6"><small>Stats</small></b-col>
          <b-col cols="2" class="fs-6"><small>Leads</small></b-col>
          <b-col cols="1" class="d-flex justify-content-between">
            <div></div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b>{{ lifepathData.id }}</b>
          </b-col>
          <b-col cols="2">
            {{ lifepathData.res }} <b-icon icon="currency-exchange"></b-icon>
          </b-col>
          <b-col cols="2">
            {{ lifepathData.time }} {{ lifepathData.disabled }}
          </b-col>
          <b-col cols="2">
            <span v-for="index in Math.abs(lifepathData.physicalStat)">
              <b-icon :icon="lifepathData.physicalStat > 0 ? 'plus' : 'dash'"></b-icon>
              <b-icon icon="heart-fill" ></b-icon>
            </span>
            <span v-for="index in Math.abs(lifepathData.mentalStat)">
              <b-icon :icon="lifepathData.mentalStat > 0 ? 'plus' : 'dash'"></b-icon>
              <b-icon icon="lightbulb-fill" ></b-icon>
            </span>
            <span v-if="lifepathData.chooseStat">
              <b-icon icon="plus"></b-icon>
              <b-icon icon="heart-fill" ></b-icon>/<b-icon icon="lightbulb-fill" ></b-icon>
            </span>
            <span v-if="!lifepathData.chooseStat && lifepathData.physicalStat == 0 && lifepathData.mentalStat == 0">
              <b-icon icon="dash"></b-icon>
            </span>
          </b-col>
          <b-col cols="3" class="d-flex justify-content-begin align-items-end">
            <span v-for="lead in lifepathData.leads" style="font-size: 1.2rem;">
              <b-icon :icon="lead.icon" v-b-tooltip.hover :title="lead.name"></b-icon>
            </span>
          </b-col>
        </b-row>
      </div>
    </template>
    <b-card-text>
      <em>Skills: </em><SkillsText :lifepath-data = "lifepathData"/> 
      <span v-if="lifepathData.generalSkillPts > 0">, {{ lifepathData.generalSkillPts }} pts: General</span>
      <br>
      <em>Traits: </em><TraitsText :lifepath-data = "lifepathData"/> 
      <br>
      <div class="d-flex justify-content-between">
        <div></div>
        <small class="text-secondary" v-if="lifepathData.requires">Requires: <em>{{ lifepathData.requires }}</em></small>
      </div>
    </b-card-text>
  </b-card>
</template>