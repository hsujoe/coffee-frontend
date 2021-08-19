<template lang="html">
  <section class="tables">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
            <h4>產品清單</h4>
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
                <b-button id = "search" variant="outline-success" class="mb-2" v-on:click="getProducts">
                  <b-icon icon="search"></b-icon> 搜尋
                </b-button>
                <b-button id = "search" variant="outline-info" class="mb-2" v-on:click="toAdd">
                  <b-icon icon="plus"></b-icon> 新增
                </b-button>
              </div>
            </dir>
          <b-table id="productList" responsive
                  :items="dataList"
                  :fields="fields"
                  :per-page="perPage"
                  :current-page="currentPage"
                  small
                  class="table table-hover">
            <template v-slot:cell(id)="data">
              <a :href="`#${'/productVE/'+ data.value}`" >{{ data.value }}</a>
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
            aria-controls="productList"
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
  name: 'productList',
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
          key: 'name',
          label: '品名',
          sortable: true
        },
        {
          key: 'unit',
          label: '單位',
          sortable: true
        },
        {
          key: 'price',
          label: '單價',
          sortable: true
        },
        {
          key: 'memo',
          label: '備註',
          sortable: true
        },
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
    products () {
      return this.$store.state.products
    }
  },
  watch: {
    products (val) {
      this.dataList = _.get(val, 'result')
      this.totalRow = this.dataList.length
    }
  },
  mounted () {
    var parameter = {}
    this.$store.dispatch('getProducts', parameter)
  },
  methods: {
    toAdd: function () {
      location.href = '#/productAdd'
    },
    getProducts: function () {
      var parameter = {}
      if (_.size(this.search) > 0) {
        _.set(parameter, 'name', this.search)
      }
      this.$store.dispatch('getProducts', parameter)
    }
  }
}
</script>

<style scoped lang="scss">
.tables {
}
</style>
