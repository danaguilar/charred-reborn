<script>
  export default {
    props: {
      attribute: Object,
      character: Object
    },
    methods: {
      Increment(event) {
        attribute.Increment()
      }
    }
  }
</script>
<template>
  <b-col cols="3" class="m-2 p-2 border-bottom border-5 rounded-pill text-dark border-success">
    <b-row>
      <b-col class="text-center">
        <em><b>{{ attribute.name }}</b></em>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="user-select-none text-center">
        <b>
        <b-icon icon="dash" v-if="attribute.ShouldShowMinus()" @click="character.ReturnToPool(attribute)"></b-icon>
        {{ attribute }}
        <b-icon icon="plus" v-if="attribute.ShouldShowPlus()" @click="character.SpendFromPool(attribute)"></b-icon>
        </b>
      </b-col>
    </b-row>
  </b-col>
</template>