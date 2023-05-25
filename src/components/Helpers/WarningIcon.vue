<script>
  export default {
    props: {
      hoveroverText: String
    }
  }
</script>

<template>
  <b-icon icon="exclamation-circle-fill" variant="danger" v-b-tooltip.hover :title="hoveroverText"></b-icon>
</template>