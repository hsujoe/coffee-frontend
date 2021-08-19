<template lang="html">
  <section class="tables">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
            <h4>沖泡記錄</h4>
            <dir class="row">
              <div class="col-8">
                <b-input-group size="sm" class="mb-2">
                    <b-input-group-prepend is-text>
                      <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="search" placeholder="搜尋" id= "search" v-model="search"></b-form-input>
                  </b-input-group>
              </div>
              <div class="col-4">
                <b-button id = "search" variant="outline-success" class="mb-2" v-on:click="getBrews">
                    <b-icon icon="search"></b-icon> 搜尋
                  </b-button>
                  <b-button id = "add" variant="outline-info" class="mb-2" v-on:click="toAdd">
                    <b-icon icon="plus"></b-icon> 新增
                  </b-button>
              </div>
          </dir>
          <b-table id="brewList" responsive
                  :items="dataList"
                  :fields="fields"
                  :per-page="perPage"
                  :current-page="currentPage"
                  small
                  class="table table-hover">
            <template v-slot:cell(id)="data">
              <a :href="`#${'/brewVE/'+ data.value}`" >{{ data.value }}</a>
            </template>
          </b-table>
        </div>
        <div class="card-footer">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRow"
            :per-page="perPage"
            aria-controls="brewList"
            align="right"
          ></b-pagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
import _ from 'lodash'
export default {
  name: 'brewList',
  data () {
    return {
      search: '',
      dataList: [],
      perPage: 10,
      currentPage: 10,
      totalRow: 10,
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'bname',
          label: '豆名',
          sortable: true
        },
        {
          key: 'grinder',
          label: '磨豆機',
          sortable: true
        },
        {
          key: 'scale',
          label: '刻度',
          sortable: true
        },
        {
          key: 'waterTemperature',
          label: '水溫',
          sortable: true
        },
        {
          key: 'steaming',
          label: '悶蒸',
          sortable: true
        },
        {
          key: 'waterCuts',
          label: '斷水次數',
          sortable: true
        },
        {
          key: 'totalWater',
          label: '總水量',
          sortable: true
        },
        {
          key: 'description',
          label: '描述',
          sortable: true
        }
      ]
    }
  },
  computed: {
    brews () {
      return this.$store.state.brews
    }
  },
  watch: {
    brews (val) {
      this.dataList = _.get(val, 'result')
      this.totalRow = this.dataList.length
    }
  },
  mounted () {
    var parameter = {}
    this.$store.dispatch('getBrews', parameter)
  },
  methods: {
    toAdd: function () {
      location.href = '#/brewAdd'
    },
    getBrews: function () {
      var parameter = {}
      if (_.size(this.search) > 0) {
        _.set(parameter, 'name', this.search)
      }
      this.$store.dispatch('getBrews', parameter)
    }
  }
}
</script>

<style scoped lang="scss">
.tables {
}
</style>
