
<script>
  export default {
    props: {
      GearList: Array
    }
  }

</script>

<template>
  <div>
    <b-row>
      <b-col cols="4" class="pb-3" v-for="gear in GearList">
        <b-card
          body-class="d-none"
        >
          <template #header>
            <div class="d-flex justify-content-between">
              <div></div>
              <b>{{ gear.name }}</b>
              <div>{{ gear.rp }} <b-icon icon="currency-exchange"></b-icon></div>
            </div>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>