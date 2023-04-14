<script setup>
  import SkillList from './SkillList.vue'

</script>

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
        return CharacterData.AvailableLPSkills
          .filter(skill => { return skill.active })
          .sort((a, b) => {
            if(a.required == b.required) return 0
            if(a.required && !b.required) return -1
            if(!a.required && b.required) return 1
          })
      },
      activeGeneralSkill() {
        return CharacterData.GeneralSkills
      },
      spentSkillPoints() {
        return CharacterData.SpentSkillPoints()
      },
      spentGeneralPoints() {
        return CharacterData.SpentGeneralSkillPoints()
      }
    },
    methods: {
      rowClass(item, type) {
        if (!item || type !== 'row') return 'table-info'
        if (item.totalPoints == 0) return 'text-muted font-weight-light font-italic'
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
            <h2>Skills</h2>
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
                <h5>{{ currentGeneralSkillPoints - spentGeneralPoints }} / {{ currentGeneralSkillPoints }}</h5>
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
          <!-- <b-icon icon="plus" @click="row.item.IncrementPoints()"></b-icon> -->
          <b-icon icon="plus" @click="characterData.IncrementSkill(row.item)"></b-icon>
        </template>
        <template #cell(removePoints)="row">
          <b-icon icon="dash" @click="characterData.DecrementSkill(row.item)"></b-icon>
        </template>
        <template #cell(name)="row">
          <strong v-if="row.item.required">{{ row.item.name }}</strong>
          <div v-else>{{ row.item.name }}</div>
        </template>
        <template #cell(root)="row">
            <small>({{ row.item.roots.map(ele => ele.substring(0,2)).join("/") }})</small>
            {{ row.item.shade }}{{ row.item.CalculateStartingSkills(characterData) }}
        </template>
        <template #cell(pointsSpent)="row">
          {{ row.item.pointsSpent }} <span v-if="row.item.generalPointsSpent > 0">({{ row.item.generalPointsSpent }})</span>
          
        </template>
        <template #cell(final)="row">
            <div v-show="row.item.totalPoints == 0">-</div>
            <div v-show="row.item.totalPoints != 0">
            {{ row.item.shade }}{{ row.item.CalculateStartingSkills(characterData) + row.item.totalPoints }}
            </div>
        </template>
        <template #thead-top="data">
          <h5>Lifepath</h5>
        </template>
        
      </b-table>
      <b-table
        :items="activeGeneralSkill"
        :fields="fields"
        :tbody-tr-class="rowClass"
        small
      >
        <template #thead-top="data">
          <h5>General</h5>
        </template>

        <template #custom-foot>
          <b-tr>
            <b-th colspan="5">
              <b-button  v-b-modal.skillListModal size="sm" block variant="outline-primary" style="width: 100%">
                <b-icon icon="plus"></b-icon>
                  Add General Skill
                <b-icon icon="plus"></b-icon>
              </b-button>
            </b-th>
          </b-tr>
        </template>

        <template #cell(addPoints)="row">
          <b-icon icon="plus" @click="characterData.IncrementSkill(row.item)"></b-icon>
        </template>
        <template #cell(removePoints)="row">
          <b-icon icon="dash" @click="characterData.DecrementSkill(row.item)"></b-icon>
        </template>
        <template #cell(name)="row">
          <strong v-if="row.item.required">{{ row.item.name }}</strong>
          <div v-else>{{ row.item.name }}</div>
        </template>
        <template #cell(root)="row">
            <small>({{ row.item.roots.map(ele => ele.substring(0,2)).join("/") }})</small>
            {{ row.item.shade }}{{ row.item.CalculateStartingSkills(characterData) }}
        </template>
        <template #cell(pointsSpent)="row">
          {{ row.item.pointsSpent }} <span v-if="row.item.generalPointsSpent > 0">({{ row.item.generalPointsSpent }})</span>
          
        </template>
        <template #cell(final)="row">
            <div v-show="row.item.totalPoints == 0">-</div>
            <div v-show="row.item.totalPoints != 0">
            {{ row.item.shade }}{{ row.item.CalculateStartingSkills(characterData) + row.item.totalPoints }}
            </div>
        </template>
      </b-table>
    </b-card>

  <b-modal 
    id="skillListModal" 
    size="xl" 
    centered 
    footerClass="p-0 border-top-0"
    title="Skill List">
    <template #modal-header>
      <h2>Skills</h2>
    </template>
    <template #modal-footer>
      <span></span>
    </template>
    <SkillList />
  </b-modal>
  </div>
</template>