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
  <b-col cols="5" class="m-2 p-2 border-bottom border-top border-5 rounded-pill text-dark border-success">
    <b-row>
      <b-col class="user-select-none text-center">
        <b-icon class="pointer" icon="chevron-up" v-if="attribute.ShouldShowPlus()" @click="character.SpendFromPool(attribute)"></b-icon>
        <div class="h4 my-0">
          <em>{{ attribute.name }}</em>  
          {{ attribute }}
        </div>
        <b-icon class="pointer" icon="chevron-down" v-if="attribute.ShouldShowMinus()" @click="character.ReturnToPool(attribute)"></b-icon>
      </b-col>
    </b-row>
  </b-col>
</template>