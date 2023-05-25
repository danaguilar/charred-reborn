
<script>
  export default {
    props: {
      age: Number,
      stock: String,
      StartingStats: Array
    },
    data() {
      return {
        fields: [
          {
            key:"current",
            label: ""
          },
          {
            key: 'range',
            label: 'Age'
          },
          {
            key: 'm',
            label: 'Mental Points'
          },
          {
            key: 'p',
            label: 'Physical Points'
          },

        ],
        items: this.StartingStats
      }
    },
    methods: {
      rowClass(index, range) {
        let class_str = ""
        if(this.isCurrentAge(range)){
          class_str = 'fw_bold'
        }
        else {
          class_str = 'text-muted'
        }
        class_str += index%2==0? ' bg-light' : ' bg-white'
        return class_str
      },
      isCurrentAge(range) {
        return this.age >= range[0] && this.age <= range[1] 
      }
    }
  }

</script>

<template>
  <b-card>
    <b-row>
      <b-col cols="6">
        <b-row>
          <b-col class="d-flex justify-content-between">
            <h4>Name</h4>
            <h4><em>Input Name Here</em></h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="d-flex justify-content-between">
            <h4>Stock</h4>
            <h4><em>{{ stock }}</em></h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="d-flex justify-content-between">
            <h4>Age</h4>
            <h4>{{ age }}</h4>
          </b-col>
        </b-row>
        <hr>
        <b-row>
        </b-row>
      </b-col>
      <b-col cols="6">
        <table class="table table-sm table-borderless">
          <thead>
            <tr class="text-muted">
              <th></th>
              <th>Age</th>
              <th>Mental</th>
              <th>Physical</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item,index in items">
              <td class="text-end"> 
                <b-icon icon="play-fill" v-show="isCurrentAge(item.range)"></b-icon>
              </td>

              <td :class="rowClass(index, item.range)" v-show="isCurrentAge(item.range)"><b>{{ item.range.join('-') }}</b></td>
              <td :class="rowClass(index, item.range)" v-show="isCurrentAge(item.range)"><b>{{item.m }}</b></td>
              <td :class="rowClass(index, item.range)" v-show="isCurrentAge(item.range)"><b>{{item.p }}</b></td>

              <td :class="rowClass(index, item.range)" v-show="!isCurrentAge(item.range)">{{ item.range.join('-') }}</td>
              <td :class="rowClass(index, item.range)" v-show="!isCurrentAge(item.range)">{{item.m }}</td>
              <td :class="rowClass(index, item.range)" v-show="!isCurrentAge(item.range)">{{item.p }}</td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>