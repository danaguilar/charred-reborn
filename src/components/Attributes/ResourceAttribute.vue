<script>
  import { CharacterData } from 'js/character-data';
  export default {
    data() {
      return {
        character: CharacterData,
        collapse: true

      }
    },
    methods: {
      hideClassToggle() {
        if(this.collapse) return "d-none"
        return ""
      },
      toggleBottomBorder() {
        let normalClassTxt = "text-center m-2 p-2 border-top border-5 rounded-pill text-dark border-dark pointer user-select-none"
        if(!this.collapse) return normalClassTxt
        return `${normalClassTxt} border-bottom`
      },
      toggleCollapse() {
        this.collapse = !this.collapse
      }
    }
  }
</script>
<template>
  <div >
  <b-row @click="toggleCollapse">
    <b-col :class="toggleBottomBorder()">
      <h4 class="d-flex justify-content-between align-items-end">
        <b-icon icon="chevron-down" class="px-2" ></b-icon>
        <span><em>Resources</em> {{ character.GetResourceShade() }}{{ character.GetResourceValue() }}</span>
        <div></div>
      </h4>
    </b-col>
  </b-row>
  <b-row :class="hideClassToggle()">
    <b-col>
      <table class="table small table-borderless">
        <tbody>
          <tr class="row-with-border">
            <td colspan="3" class="text-center"><em>Sum of X / 15</em></td>
          </tr>
          <tr>
            <th>Property</th>
            <td class="text-end">{{ character.SumOfProperty() }}</td>
          </tr>
          <tr>
            <th>Reputations</th>
            <td class="text-end">{{ character.SumOfReputations() }}</td>
          </tr>
          <tr>
            <th>Affiliations</th>
            <td class="text-end">{{ character.SumOfAffiliations() }}</td>
          </tr>
        </tbody>
      </table>
    </b-col>
  </b-row>
  <b-row :class="hideClassToggle()">
    <b-col class="text-center m-2 p-2 border-bottom border-5 rounded-pill text-dark border-dark">
      <h3> </h3>
    </b-col>
  </b-row>
</div>
</template>