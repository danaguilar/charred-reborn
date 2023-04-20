<script>
  import { DwarfSkillList } from '../core';
  import { CharacterData } from '../character-data';
  export default {
    data() {
      return {
        skillList: DwarfSkillList,
        fields: [
          { key: 'name', label: 'Skill' },
        ]
      }
    },
    methods: {
      buttonVariant(skill) {
        if(skill.isMagic) return "outline-primary"
        if(skill.unlockonly) return "secondary"
        return "outline-dark"
      },
      rootTextClass(skill) {
        if(skill.isMagic || skill.unlockonly) return ""
        return "text-muted"
      },
      addSkill(skill) {
        CharacterData.AddGeneralSkill(skill)
      }
    },
    computed: {
      skillListTypes() {
        return Object.keys(this.skillList).sort()
      }
    }
  }
</script>

<template>
  <div>
    <b-row class="pb-4" v-for="(typeName, index) in skillListTypes">
      <div class="separator">
        <h2>
          {{ typeName }}
        </h2>
      </div>
      <b-col class="mb-2" cols="3" v-for="(skill) in skillList[typeName]">
        <b-button @click="addSkill(skill)" size="sm" :variant="buttonVariant(skill)" class="w-100">
          {{ skill.name }} 
          <span :class="rootTextClass(skill)">({{ skill.roots.map(ele => ele.substring(0,2)).join("/")}})</span>
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>