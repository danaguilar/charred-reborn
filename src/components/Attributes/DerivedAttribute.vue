<script>
  export default {
    props: {
      name: String,
      shade: String,
      value: Number
    },
  }
</script>
<template>
  <b-col cols="3" class="m-2 p-2 border-bottom border-5 rounded-pill text-dark">
    <b-row>
      <b-col class="text-center">
        <em><b>{{ name }}</b></em>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="user-select-none text-center">
        <b>
        {{ shade }}{{ value }}
        </b>
      </b-col>
    </b-row>
  </b-col>
</template>