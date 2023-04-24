<script>
  export default {
    props: {
      trait: Object,
      IsCharacterTrait: Boolean,
      TraitFunctions: Array
    },
    methods:{
      handleClick(event) {
        console.log("Handling Event")
        if(this.IsCharacterTrait) {
          this.TraitFunctions[1](this.trait)
        }
        else {
          this.TraitFunctions[0](this.trait)
        }
      },
      borderColor() {
        if(this.trait.bought) return "dark"
        return "light"
      },
      headerColor() {
        if(this.trait.required) return "dark"
        if(this.trait.bought) return "secondary"
        return "light"
      },
      headerTextColor() {
        if(this.trait.bought) return "white"
        return "muted"
      },
      cardClassText() {
        return `mb-4 ${this.trait.bought ? "shadow" : ""} ${this.trait.required ? "" : "pointer"}`
      },
      bodyClassText() {
        if(this.trait.type == "character") return "d-none"
        return ""
      }
    }
  }
</script>

<template>
  <div>
    <b-card 
      :header-bg-variant="headerColor()"
      :header-text-variant="headerTextColor()"
      :border-variant="borderColor()"
      :header-border-variant="borderColor()"
      @click="handleClick"
      :class="cardClassText()"
      :body-class="bodyClassText()"
      >
      <template #header>
        <b-row>
          <b-col class="d-flex justify-content-between">
            <div></div>
            <b v-show="trait.required"><em>{{ trait.name }}</em></b>
            <b v-show="!trait.required">{{ trait.name }}</b>
            <div>{{ trait.cost }}{{ trait.cost > 1 ? "pts" : "pt"}}</div>
          </b-col>
        </b-row>
      </template>
      <div class="text-muted">{{ trait.desc }}</div>
    </b-card>

  </div>
</template>

<style>
  .pointer {
    cursor: pointer
  }
</style>