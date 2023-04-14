<script>
  import { DwarfSkillList } from '../core';
 export default {
    data() {
      return {
        skillList: DwarfSkillList,
        fields: [
          { key: 'name', label: 'Skill' },
        ]
      }
    }
  }
</script>

<template>
  <b-card-group columns>
    <b-card
      v-for="(skills, typeName) in skillList"
      :title="typeName"
      class="d-inline-block border-0 w-20"
    >
      <b-card-text>
        <b-table
          :items="skills"
          :fields="fields"
          small
        ></b-table>
      </b-card-text>
    </b-card>
  </b-card-group>
  <!-- <b-row>
    <b-col v-for="(skills, typeName) in skillList" class="col-4">
      <h4>{{ typeName }}</h4>
      <b-table
        :items="skills"
        :fields="fields"
        small
      ></b-table>
      
    </b-col>
  </b-row> -->
</template>