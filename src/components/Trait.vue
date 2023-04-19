
<script>
  export default {
    props: {
      trait: Object
    },
    methods:{
      toggleTraitBuying(event) {
        if(!this.trait.required) this.trait.bought = !this.trait.bought
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
        if(this.trait.bought) return "mb-4 shadow"
        return "mb-4"
      },
      bodyClassText() {
        if(!this.trait.desc) return "d-none"
        return ""
      }
    }
  }
</script>

<template>
  <b-card 
    style="cursor: pointer"
    :header-bg-variant="headerColor()"
    :header-text-variant="headerTextColor()"
    :border-variant="borderColor()"
    :header-border-variant="borderColor()"
    @click="toggleTraitBuying"
    :class="cardClassText()"
    :body-class="bodyClassText()"
    >
    <template #header>
      <b-row>
        <b-col class="d-flex justify-content-between">
          <div></div>
          <b>{{ trait.name }}</b>
          <div>{{ trait.cost }}{{ trait.cost > 1 ? "pts" : "pt"}}</div>
        </b-col>
      </b-row>
    </template>
    <div class="text-muted">{{ trait.desc }}</div>
  </b-card>
</template>