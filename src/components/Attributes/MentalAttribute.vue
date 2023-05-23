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
  <b-col cols="5" class="m-2 p-2 border-bottom border-top border-5 rounded-pill text-dark border-dark">
    <b-row>
      <b-col class="user-select-none text-center">
        <div class="my-0 d-flex justify-content-between align-items-center">
          <b-icon class="pointer" icon="chevron-double-left" v-if="attribute.ShouldShowMinus()" @click="character.ReturnToPool(attribute)"></b-icon>
          <em class="h4">{{ attribute.name }}</em>
          <strong class="h4">{{ attribute }}</strong>
          <b-icon class="pointer" icon="chevron-double-right" v-if="attribute.ShouldShowPlus()" @click="character.SpendFromPool(attribute)"></b-icon>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="user-select-none text-center">
      </b-col>
    </b-row>
  </b-col>
</template>