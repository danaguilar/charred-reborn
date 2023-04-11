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
  <b-col>

    <b-row>
      <b-col>
        {{ attribute.name }}
      </b-col>
    </b-row>
    <b-row>
      <b-col class="user-select-none">
        <b-icon icon="dash" v-if="attribute.ShouldShowMinus()" @click="character.ReturnToPool(attribute)"></b-icon>
        {{ attribute }}
        <b-icon icon="plus" v-if="attribute.ShouldShowPlus()" @click="character.SpendFromPool(attribute)"></b-icon>
      </b-col>
    </b-row>
  </b-col>
</template>