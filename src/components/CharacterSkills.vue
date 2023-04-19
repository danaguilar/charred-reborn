<script setup>
  import SkillList from './SkillList.vue'
</script>

<script>
  import { CharacterData } from '../character-data';
  export default {
    data() {
      return {
        fields: [
          { key: 'name', label: 'Name' },
          { key: 'root', label: 'Root'},
          { key: 'pointsSpent', label: 'Spent' },
          { key: 'final', label: 'Final' }
        ]
      }
    },
    methods: {
      rowClass(item, type) {
        if (!item || type !== 'row') return 'table-info'
        if (item.totalPoints == 0) return 'text-muted font-weight-light font-italic'
      }
    },
    computed: {
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
      },
      currentGeneralSkillPoints() {
        return CharacterData.GetTotalGeneralSkillPoints();
      },
    }
  }
</script>
<template>
  <div>
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
              <small class="text-white"><em>(General)</em></small>
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
    <h5>Lifepath Skills</h5>
    <hr>
    <b-table
      :items="activeSkills"
      :fields="fields"
      :tbody-tr-class="rowClass"
      :borderless=true
      :hover=true
      small
    >
      <template #cell(name)="row">
        <strong v-if="row.item.required">{{ row.item.name }}</strong>
        <div v-else>{{ row.item.name }}</div>
      </template>
      <template #cell(root)="row">
          <small>({{ row.item.roots.map(ele => ele.substring(0,2)).join("/") }})</small>
          {{ row.item.shade }}{{ row.item.CalculateStartingSkills(CharacterData) }}
      </template>
      <template #cell(pointsSpent)="row">
        <b-icon icon="dash" @click="CharacterData.DecrementSkill(row.item)"></b-icon>
        <span class="user-select-none">
          {{ row.item.pointsSpent }} <span v-if="row.item.generalPointsSpent > 0">({{ row.item.generalPointsSpent }})</span>
        </span>
        <b-icon icon="plus" @click="CharacterData.IncrementSkill(row.item)"></b-icon>
      </template>
      <template #cell(final)="row">
          <div v-show="row.item.totalPoints == 0">-</div>
          <div v-show="row.item.totalPoints != 0">
          {{ row.item.shade }}{{ row.item.CalculateStartingSkills(CharacterData) + row.item.totalPoints - 1}}
          </div>
      </template>
      
    </b-table>

    <h5>General Skills</h5>
    <hr>
    <b-table
      :items="activeGeneralSkill"
      :fields="fields"
      :tbody-tr-class="rowClass"
      :borderless=true
      :hover=true
      thead-class="d-none"
      small
    >

      <template #custom-foot>
        <b-tr>
          <b-th colspan="5">
            <b-button  v-show="CharacterData.HasGeneralSkillPointsLeft()" v-b-modal.skillListModal size="sm" block variant="outline-primary" style="width: 100%">
              <b-icon icon="plus"></b-icon>
                Add General Skill
              <b-icon icon="plus"></b-icon>
            </b-button>
          </b-th>
        </b-tr>
      </template>

      <template #cell(addPoints)="row">
        <b-icon icon="plus" @click="CharacterData.IncrementGeneralSkill(row.item)"></b-icon>
      </template>
      <template #cell(removePoints)="row">
        <b-icon icon="dash" @click="CharacterData.DecrementGeneralSkill(row.item)"></b-icon>
      </template>
      <template #cell(name)="row">
        <strong v-if="row.item.required">{{ row.item.name }}</strong>
        <div v-else>{{ row.item.name }}</div>
      </template>
      <template #cell(root)="row">
          <small>({{ row.item.roots.map(ele => ele.substring(0,2)).join("/") }})</small>
          {{ row.item.shade }}{{ row.item.CalculateStartingSkills(CharacterData) }}
      </template>
      <template #cell(pointsSpent)="row">
        {{ row.item.pointsSpent }} <span v-if="row.item.generalPointsSpent > 0">({{ row.item.generalPointsSpent }})</span>
        
      </template>
      <template #cell(final)="row">
          <div v-show="row.item.totalPoints == 0">-</div>
          <div v-show="row.item.totalPoints != 0">
          {{ row.item.shade }}{{ row.item.CalculateStartingSkills(CharacterData) + row.item.totalPoints - 1 }}
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
      <div class="d-flex justify-content-between w-100">
        <h1>Skills</h1>
        <div>
          <b-button size="sm" variant="outline-primary" disabled class="w-100 mb-2"><em>Open ended (Magic) skill</em></b-button>
          <b-button size="sm" variant="secondary" disabled class="w-100"><em>Training Skill (2 pts)</em></b-button>
        </div>
      </div>

    </template>
    <template #modal-footer>
      <span></span>
    </template>
    <SkillList />
  </b-modal>
</div>
</template>