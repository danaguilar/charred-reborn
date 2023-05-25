<script setup>
  import SkillsText from 'components/Skills/SkillsText.vue'
  import TraitsText from 'components/Traits/TraitsText.vue'
  import WarningIcon from 'components/Helpers/WarningIcon.vue'
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
      },
      ChooseMental() {
        this.lifepathData.mentalStat = this.lifepathData.mentalChoice
        this.lifepathData.physicalStat = 0
      },
      ChoosePhysical() {
        this.lifepathData.physicalStat = this.lifepathData.physicalChoice
        this.lifepathData.mentalStat = 0
      },
      NoStatSelected() {
        return this.lifepathData.physicalStat == 0 && this.lifepathData.mentalStat == 0 && this.lifepathData.chooseStat
      },
      ChooseMentalClass() {
        return this.lifepathData.mentalStat != 0 ? '' : 'text-muted'
      },
      ChoosePhysicalClass() {
        return this.lifepathData.physicalStat != 0 ? '' : 'text-muted'
      },
      ChooseHeartIcon() {
        return this.lifepathData.physicalStat != 0 ? 'heart-fill' : 'heart'
      },
      ChooseBulbIcon() {
        return this.lifepathData.mentalStat != 0 ? 'lightbulb-fill' : 'lightbulb'
      }
    }
  }
</script>

<template>
  <b-card 
    border-variant="secondary"
    :header-bg-variant="isHovered ? 'secondary' : ''"
    :header-text-variant="isHovered ? 'white' : ''"
    header-tag="header" 
    footer-tag="footer"
    class="p-0">
    <template #header>
      <div>
        <b-row>
          <b-col cols="3" class="fs-6"><small>Title</small></b-col>
          <b-col cols="2" class="fs-6"><small>Res</small></b-col>
          <b-col cols="2" class="fs-6"><small>Years</small></b-col>
          <b-col cols="2" class="fs-6"><small>Stats <span v-if="NoStatSelected()"> <WarningIcon  hoveroverText="Select a stat"/></span></small></b-col>
          <b-col cols="2" class="fs-6"><small>Leads</small></b-col>
          <b-col cols="1" class="d-flex justify-content-between">
            <div></div>
            <button @click="removeLifepath" type="button" class="btn-close" aria-label="Close"></button>
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
            {{ lifepathData.time }}
          </b-col>
          <b-col cols="2">
            <span v-if="!lifepathData.chooseStat">
              <span v-for="index in lifepathData.physicalStat">
                <b-icon icon="plus"></b-icon>
                <b-icon icon="heart-fill" ></b-icon>
              </span>
              <span v-for="index in lifepathData.mentalStat">
                <b-icon icon="plus"></b-icon>
                <b-icon icon="lightbulb-fill"></b-icon>
              </span>
            </span>
            <span v-if="lifepathData.chooseStat">
              <div v-show="NoStatSelected()">
                <b-icon icon="plus"></b-icon>
                <b-icon icon="heart" @click="ChoosePhysical" class="pointer"></b-icon>
                /
                <b-icon icon="lightbulb" @click="ChooseMental" class="pointer"></b-icon>
              </div>
              <div v-show="!NoStatSelected()">
                <b-icon icon="plus"></b-icon>
                <b-icon :icon="ChooseHeartIcon()" @click="ChoosePhysical" class="pointer" :class="ChoosePhysicalClass()"></b-icon>
                /
                <b-icon :icon="ChooseBulbIcon()" @click="ChooseMental" class="pointer" :class="ChooseMentalClass()"></b-icon>
              </div>
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