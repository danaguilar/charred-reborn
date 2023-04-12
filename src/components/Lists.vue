<script>
  import { CharacterData } from '../character-data';
  export default {
    data() {
      return {
        characterLP: CharacterData.Lifepaths,
        characterData: CharacterData,
        fields: [
          { key: 'name', label: 'Skill' },
          { key: 'root', label: 'Root'},
          { key: 'pointsSpent', label: 'Points Spent' },
          { key: 'final', label: 'Final' },
          { key: 'removePoints', label: '' },
          { key: 'addPoints', label: '' }
        ]
      }
    },
    computed: {
      currentRes() {
        return CharacterData.GetResourcePoints();
      },
      currentTraitPoints() {
        return CharacterData.GetTotalTraitPoints();
      },
      currentGeneralSkillPoints() {
        return CharacterData.GetTotalGeneralSkillPoints();
      },
      currentLPSkillPoints() {
        return CharacterData.GetTotalLPSkillPoints();
      },
      activeSkills() {
        console.log(CharacterData.AvailableLPSkills)
        return CharacterData.AvailableLPSkills
          .filter(skill => { return skill.active })
          .sort((a, b) => {
            if(a.required == b.required) return 0
            if(a.required && !b.required) return -1
            if(!a.required && b.required) return 1
          })
      },
      spentSkillPoints() {
          return CharacterData.AvailableLPSkills
            .filter(skill => { return skill.active })
            .reduce((total, skill) => {
              return total + skill.pointsSpent
            }, 0)
      }
    },
    methods: {
      rowClass(item, type) {
        if (!item || type !== 'row') return 'table-info'
        if (item.pointsSpent == 0) return 'text-muted font-weight-light font-italic'
      }
    }
  }
</script>

<template>
  <div>
    <h2>The Lists</h2>
    <hr />
    <b-card
      header="Secondary"
      header-bg-variant="secondary"
      header-text-variant="light"
    >
      <template #header>
        <b-row align-v="center">
          <b-col>
            <h2>Skill </h2>
          </b-col>
          <b-col>
            <b-row>
              <b-col>
                <small class="text-white"><em>Lifepath</em></small>
              </b-col>
              <b-col>
                <small class="text-white"><em>General</em></small>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <h4>{{ currentLPSkillPoints - spentSkillPoints }} / {{ currentLPSkillPoints }}</h4>
              </b-col>
              <b-col>
                <h4>{{ currentLPSkillPoints - spentSkillPoints }} / {{ currentGeneralSkillPoints }}</h4>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </template>
      <b-row class="d-flex justify-content-between">
      </b-row>
      <b-table
        :items="activeSkills"
        :fields="fields"
        :tbody-tr-class="rowClass"
        small
      >
        <template #cell(addPoints)="row">
          <b-icon icon="plus" @click="row.item.IncrementPoints()"></b-icon>
        </template>
        <template #cell(removePoints)="row">
          <b-icon icon="dash" @click="row.item.DecrementPoints()"></b-icon>
        </template>
        <template #cell(name)="row">
          <strong v-if="row.item.required">{{ row.item.name }}</strong>
          <div v-else>{{ row.item.name }}</div>
        </template>
        <template #cell(root)="row">
            <small>({{ row.item.roots.map(ele => ele.substring(0,2)).join("/") }})</small>
            {{ row.item.shade }}{{ row.item.CalculateStartingSkills(characterData) }}
        </template>
        <template #cell(final)="row">
            <div v-show="row.item.pointsSpent == 0">-</div>
            <div v-show="row.item.pointsSpent != 0">
            {{ row.item.shade }}{{ row.item.CalculateStartingSkills(characterData) + row.item.pointsSpent }}
            </div>
        </template>
        
      </b-table>
    </b-card>
  </div>
</template>