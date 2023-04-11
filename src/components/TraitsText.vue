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
      <strong v-if="trait.required==true">{{ trait.name }}</strong>
      <s v-else-if="trait.active==false">{{ trait.name }}</s>
      <span v-else>{{ trait.name }}</span>
      , 
    </span>
  </span>
</template>