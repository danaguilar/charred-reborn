<script>
  export default {
    props: {
      lifepathData: Object
    }
  }
</script>

<template>
  <span>
    {{ lifepathData.traitPts }} pts: 
    <span v-if="lifepathData.traits.length == 0">-</span>
    <span v-for="trait in lifepathData.traits"> 
      <strong v-if="trait.required==true">{{ trait.name }} <b-icon :icon="trait.IconString()"></b-icon> </strong>
            
      <s v-else-if="trait.active==false">{{ trait.name }}</s>
      <span v-else>{{ trait.name }} <b-icon :icon="trait.IconString()"></b-icon></span>
      , 
    </span>
  </span>
</template>