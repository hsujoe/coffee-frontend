<template lang="html">
  <section class="homePage">
    <div class='row'>
      <div class='col-md-6 grid-margin'>
        <div class="card">
            <div class="card-body">
            <div class='row'>
              <div class="col-8">
                <h4>推薦店面</h4>
              </div>
              <div class="col-4">
                <b-button id = "add" variant="outline-info" class="mb-2" @click="showModel(0)">
                  <b-icon icon="plus"></b-icon> 新增
                </b-button>
              </div>
            </div>
            <b-table id="storeList" responsive
                    :items="storeDataList"
                    :fields="storeFields"
                    :per-page="storePerPage"
                    :current-page="storeCurrentPage"
                    small
                    class="table table-hover">
                <template v-slot:cell(id)="data">
                <a :href="`#${'/storeVE/'+ data.value}`" >{{ data.value }}</a>
                </template>
                <template v-slot:cell(image)="data">
                <viewer :images="storeImages">
                    <img v-if="data.value" v-bind:src="'data:image/jpeg;base64,'+data.value" width="100">
                </viewer>
                </template>
            </b-table>
            </div>
            <div class="card-footer">
            <b-pagination
                v-model="storeCurrentPage"
                :total-rows="storeTotalRow"
                :per-page="storePerPage"
                aria-controls="storeList"
                align="right"
            ></b-pagination>
            </div>
        </div>
      </div>
      <div class='col-md-6 grid-margin'>
        <div class="card">
            <div class="card-body">
              <div class='row'>
              <div class="col-8">
                <h4>推薦咖啡豆</h4>
              </div>
              <div class="col-4">
                <b-button id = "add" variant="outline-info" class="mb-2" @click="showModel(1)">
                  <b-icon icon="plus"></b-icon> 新增
                </b-button>
              </div>
            </div>
            <b-table id="productList" responsive
                    :items="productDataList"
                    :fields="productFields"
                    :per-page="productPerPage"
                    :current-page="productCurrentPage"
                    small
                    class="table table-hover">
                <template v-slot:cell(id)="data">
                <a :href="`#${'/productVE/'+ data.value}`" >{{ data.value }}</a>
                </template>
                <template v-slot:cell(image)="data">
                <viewer :images="productImages">
                    <img v-if="data.value" v-bind:src="'data:image/jpeg;base64,'+data.value" width="100">
                </viewer>
                </template>
            </b-table>
            </div>
            <div class="card-footer">
            <b-pagination
                v-model="productCurrentPage"
                :total-rows="productTotalRow"
                :per-page="productPerPage"
                aria-controls="produtList"
                align="right"
            ></b-pagination>
            </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <b-modal ref ="myModal" :title="titelValue" @show="resetModal" @hidden="resetModal" @ok="handleOk">
        <div class="form-group">
          <label class="label">名稱</label>
          <div class="input-group">
              <input type="text" id= "name" v-model="modelName" class="form-control">
          </div>
        </div>
        <img  id="image" v-if="modelImage" :src="modelImage" width="200"/>
            <input type="file" @change="uploadPhoto($event)"/>
    </b-modal>
  </section>
</template>

<script lang="js">
import _ from 'lodash'
import {EXIF} from 'exif-js'
export default {
  name: 'HomePage',
  data () {
    return {
      modelName: '',
      modelImage: '',
      titelValue: '',
      modelStyle: 0,
      storeImages: [],
      productImages: [],
      storeDataList: [],
      storePerPage: 10,
      storeCurrentPage: 10,
      storeTotalRow: 10,
      storeFields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name',
          label: '店名',
          sortable: true
        },
        {
          key: 'image',
          label: '照片',
          sortable: true
        }
      ],
      store: {
        name: '',
        tel: '',
        address: '',
        page: '',
        fb: '',
        ig: '',
        state: 2,
        memo: ''
      },
      productDataList: [],
      productPerPage: 10,
      productCurrentPage: 10,
      productTotalRow: 10,
      productFields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name',
          label: '豆名',
          sortable: true
        },
        {
          key: 'image',
          label: '照片',
          sortable: true
        }
      ],
      product: {
        name: '',
        unit: '',
        price: '',
        state: 2,
        memo: ''
      }
    }
  },
  computed: {
    stores () {
      return this.$store.state.stores
    },
    products () {
      return this.$store.state.products
    }
  },
  watch: {
    stores (val) {
      this.storeDataList = _.get(val, 'result')
      if (_.size(this.storeDataList) > 0) {
        this.storeTotalRow = this.storeDataList.length
      } else {
        this.storeTotalRow = 0
      }
    },
    products (val) {
      this.productDataList = _.get(val, 'result')
      if (_.size(this.productDataList) > 0) {
        this.productTotalRow = this.productDataList.length
      } else {
        this.productTotalRow = 0
      }
    }
  },
  mounted () {
    var parameter = {}
    this.$store.dispatch('getRecommendStores', parameter)
    this.$store.dispatch('getRecommendProducts', parameter)
  },
  methods: {
    showModel: function (val) {
      if (val === 0) {
        this.titelValue = '推薦店面'
        this.modelStyle = 0
      } else {
        this.titelValue = '推薦咖啡豆'
        this.modelStyle = 1
      }
      this.$refs['myModal'].show()
    },
    resetModal () {
      this.name = ''
      this.image = ''
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      if (this.modelStyle === 0) {
        this.store.name = this.modelName
        this.store.image = this.modelImage
        this.$store.dispatch('saveStore', this.store)
      } else {
        this.product.name = this.modelName
        this.product.image = this.modelImage
        this.$store.dispatch('saveProduct', this.product)
      }
      location.href = '#/homePage'
      // this.$nextTick(() => {
      //   this.$bvModal.hide('myModal')
      // })
    },
    uploadPhoto (e) {
      const global = this
      var file = e.target.files[0]
      EXIF.getData(file, function () {
        EXIF.getAllTags(this)
        global.Orientation = EXIF.getTag(this, 'Orientation')
      })
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        global.dealImage(e.target.result, 800, (result) => {
          this.modelImage = result
        }, this)
      }
    },
    dealImage (base64, w, callback, img) {
      const global = this
      var newImage = new Image()
      var quality = 0.8
      newImage.src = base64
      newImage.setAttribute('crossOrigin', 'Anonymous')
      var imgWidth, imgHeight
      newImage.onload = function () {
        imgWidth = this.width
        imgHeight = this.height
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        canvas.width = imgWidth
        canvas.height = imgHeight
        if (global.Orientation && global.Orientation !== 1) {
          switch (global.Orientation) {
            case 6:
              canvas.width = imgHeight
              canvas.height = imgWidth
              ctx.rotate(Math.PI / 2)
              ctx.drawImage(this, 0, -imgHeight, imgWidth, imgHeight)
              break
            case 8:
              canvas.width = imgHeight
              canvas.height = imgWidth
              ctx.rotate(3 * Math.PI / 2)
              ctx.drawImage(this, -imgWidth, 0, imgWidth, imgHeight)
              break
            case 3:
              ctx.rotate(Math.PI)
              ctx.drawImage(this, -imgWidth, -imgHeight, imgWidth, imgHeight)
              break
            default:
              break
          }
        } else {
          ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
        }
        var ba = canvas.toDataURL('image/jpeg', quality)
        callback(ba)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.tables {
}
</style>
