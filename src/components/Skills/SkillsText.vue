<script>
  export default {
    props: {
      lifepathData: Object
    }
  }
</script>

<template>
  <span>
    {{ lifepathData.skillPts }} pts:
    <span v-for="skill in lifepathData.skills"> 
      <span :key="skill.required">
        <strong v-if="skill.required==true">{{ skill.name }}</strong>
        <s v-else-if="skill.active==false"><em>{{ skill.name }}</em></s>
        <span v-else>{{ skill.name }}</span>
        , 
    </span>
    </span>
  </span>
</template>