<template lang="html">
  <section class="tables">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
            <h4>咖啡豆記錄</h4>
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
                <b-button id = "search" variant="outline-success" class="mb-2" v-on:click="getCoffeeBeans">
                  <b-icon icon="search"></b-icon> 搜尋
                </b-button>
                <b-button id = "add" variant="outline-info" class="mb-2" v-on:click="toAdd">
                  <b-icon icon="plus"></b-icon> 新增
                </b-button>
              </div>
            </dir>
          <b-table id="coffeeBeanList" responsive
                  :items="dataList"
                  :fields="fields"
                  :per-page="perPage"
                  :current-page="currentPage"
                  small
                  class="table table-hover">
            <template v-slot:cell(id)="data">
              <a :href="`#${'/coffeeBeanVE/'+data.value}`" >{{ data.value }}</a>
            </template>
            <template v-slot:cell(state)="data">
              <div v-if="data.value === 0">
                <span>啟用</span>
              </div>
              <div v-else>
                <span>未啟用</span>
              </div>
            </template>
            <template v-slot:cell(image)="data">
              <viewer :images="images">
                  <img v-if="data.value" v-bind:src="'data:image/jpeg;base64,'+data.value" width="100">
              </viewer>
            </template>
          </b-table>
        </div>
        <div class="card-footer">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRow"
            :per-page="perPage"
            aria-controls="coffeeBeanList"
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
  name: 'coffeeBeanList',
  data () {
    return {
      search: '',
      dataList: [],
      images: [],
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
          key: 'sname',
          label: '店名',
          sortable: true
        },
        {
          key: 'origin',
          label: '產地',
          sortable: true
        },
        {
          key: 'manor',
          label: '莊園',
          sortable: true
        },
        {
          key: 'name',
          label: '豆名',
          sortable: true
        },
        {
          key: 'fermentation',
          label: '發酵法',
          sortable: true
        },
        {
          key: 'roast',
          label: '焙度',
          sortable: true
        },
        // {
        //   key: 'acidity',
        //   label: '酸甜度',
        //   sortable: true
        // },
        // {
        //   key: 'flavor',
        //   label: '調性',
        //   sortable: true
        // },
        // {
        //   key: 'tasting',
        //   label: '風味',
        //   sortable: true
        // },
        // {
        //   key: 'description',
        //   label: '描述',
        //   sortable: true
        // },
        {
          key: 'state',
          label: '狀態',
          sortable: true
        },
        {
          key: 'image',
          label: '照片',
          sortable: true
        }
      ]
    }
  },
  computed: {
    coffeeBeans () {
      return this.$store.state.coffeeBeans
    }
  },
  watch: {
    coffeeBeans (val) {
      this.dataList = _.get(val, 'result')
      this.totalRow = this.dataList.length
    }
  },
  mounted () {
    var parameter = {}
    this.$store.dispatch('getCoffeeBeans', parameter)
  },
  methods: {
    toAdd: function () {
      location.href = '#/coffeeBeanAdd'
    },
    getCoffeeBeans: function () {
      var parameter = {}
      if (_.size(this.search) > 0) {
        _.set(parameter, 'name', this.search)
      }
      this.$store.dispatch('getCoffeeBeans', parameter)
    }
  }
}
</script>
<style scoped src="viewerjs/dist/viewer.css"></style>
<style scoped lang="scss">
.tables {
}
</style>
