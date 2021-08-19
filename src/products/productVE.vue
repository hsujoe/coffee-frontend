<template lang="html">
    <section class='prdocutVE'>
        <b-alert :show="dismissCountDown" :variant="alertColor" fade>{{saveState}}</b-alert>
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-8">
                            <h4>檢視修改產品</h4>
                        </div>
                        <div class="col-4">
                            <div v-if="productView">
                                <b-button id = "edit" variant="outline-primary" class="mb-2" v-on:click="toEdit">
                                    <b-icon icon="pencil"></b-icon> 編輯
                                </b-button>
                                <b-button id = "return" variant="outline-warning" class="mb-2" v-on:click="toReturn">
                                    <b-icon icon="reply"></b-icon> 取消
                                </b-button>
                            </div>
                            <div v-else>
                                <b-button id = "save" variant="outline-primary" class="mb-2" v-on:click="toSave">
                                    <b-icon icon="cloud-upload"></b-icon> 儲存
                                </b-button>
                                <b-button id = "view" variant="outline-warning" class="mb-2" v-on:click="toview">
                                    <b-icon icon="backspace"></b-icon> 取消編輯
                                </b-button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">品名</label>
                                <div class="input-group">
                                    <input type="text" id= "name" class="form-control font-weight-semibold text-gray mb-0" v-model="product.name" :readonly="productView">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">單位</label>
                                <div class="input-group">
                                    <input type="text" id= "unit" class="form-control" v-model="product.unit" :readonly="productView">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">單價</label>
                                <div class="input-group">
                                    <input type="number" id= "price" class="form-control" v-model="product.price" :readonly="productView">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">狀態</label>
                                <div class="input-group">
                                    <select class="form-control" id ="state" v-model="product.state" :readonly="productView">
                                        <option v-for="( option, index ) in stateOptions" :key="index"
                                            :value="option.value"
                                            :disabled="productView">
                                            {{ option.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="label">備註</label>
                                <div class="input-group">
                                    <input type="text" id= "memo" class="form-control" v-model="product.memo" :readonly="productView">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <viewer :images=[]>
                                <img v-if="product.image" v-bind:src="'data:image/jpeg;base64,'+product.image" width="200">
                            </viewer>
                            <div v-if="productView"></div>
                            <div v-else>
                                <input type="file" @change="uploadPhoto($event)"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                        </div>
                        <div class="col-4">
                            <div v-if="productView">
                                <b-button id = "edit" variant="outline-primary" class="mb-2" v-on:click="toEdit">
                                    <b-icon icon="pencil"></b-icon> 編輯
                                </b-button>
                                <b-button id = "return" variant="outline-warning" class="mb-2" v-on:click="toReturn">
                                    <b-icon icon="reply"></b-icon> 取消
                                </b-button>
                            </div>
                            <div v-else>
                                <b-button id = "save" variant="outline-primary" class="mb-2" v-on:click="toSave">
                                    <b-icon icon="cloud-upload"></b-icon> 儲存
                                </b-button>
                                <b-button id = "view" variant="outline-warning" class="mb-2" v-on:click="toview">
                                    <b-icon icon="backspace"></b-icon> 取消編輯
                                </b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="js">
import { mapState } from 'vuex'
import {EXIF} from 'exif-js'
export default {
  name: 'prdocutVE',
  data () {
    return {
      id: 0,
      saveState: '儲存成功',
      alertColor: 'success',
      dismissCountDown: false,
      dismissSecs: 3,
      productView: true
    }
  },
  computed: mapState({
    product: state => state.product,
    stateOptions: state => state.stateOptions
  }),
  mounted () {
    var id = this.$route.params.id
    this.$store.dispatch('getProduct', id)
  },
  methods: {
    async toSave () {
      await this.$store.dispatch('updateProduct', this.product)
      if (this.$store.state.updateState) {
        this.saveState = '更新成功'
        this.dismissCountDown = this.dismissSecs
        this.productView = true
        this.$store.dispatch('initUpdateState')
      } else {
        this.saveState = '更新失敗'
        this.alertColor = 'danger'
        this.dismissCountDown = this.dismissSecs
      }
    },
    toEdit: function () {
      this.productView = false
    },
    toview: function () {
      this.productView = true
    },
    toReturn: function () {
      location.href = '#/productList'
    },
    // 拍照
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
          var strL = result.replace('data:image/jpeg;base64,', '')
          this.product.image = strL
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
