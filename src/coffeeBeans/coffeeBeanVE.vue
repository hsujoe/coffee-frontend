<template lang="html">
    <section class='coffeeBeanVE'>
        <b-alert :show="dismissCountDown" :variant="alertColor" fade>{{saveState}}</b-alert>
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <dir class="row">
                        <div class="col-8">
                            <h4>檢視修改咖啡豆</h4>
                        </div>
                        <div class="col-4">
                            <div v-if="coffeeBeanView">
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
                    </dir>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">店名</label>
                                <div class="input-group">
                                    <select class="form-control" id ="sid" v-model="coffeeBean.sid" :readonly="coffeeBeanView">
                                        <option v-for="( option, index ) in storeSelectItem" :key="index"
                                            :value="option.value"
                                            :disabled="coffeeBeanView">
                                            {{ option.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">購買日期</label>
                                <div class="input-group">
                                    <input type="date" id= "buyDate" v-model="coffeeBean.buyDate" class="form-control" :readonly="coffeeBeanView">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">價格</label>
                                <div class="input-group">
                                    <input type="text" id= "price" v-model="coffeeBean.price" class="form-control" :readonly="coffeeBeanView">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">重量</label>
                                <b-input-group  class="mb-2">
                                    <b-form-input type="text" id= "weight" v-model="coffeeBean.weight" :readonly="coffeeBeanView"></b-form-input>
                                    <b-input-group-prepend is-text>
                                    <span>克</span>
                                    </b-input-group-prepend>
                                </b-input-group>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">產地</label>
                                <div class="input-group">
                                    <input type="text" id= "Origin" v-model="coffeeBean.origin" class="form-control" :readonly="coffeeBeanView">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">莊園</label>
                                <div class="input-group">
                                    <input type="text" id= "manor" v-model="coffeeBean.manor" class="form-control" :readonly="coffeeBeanView">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">豆名</label>
                                <div class="input-group">
                                    <input type="text" id= "name" v-model="coffeeBean.name" class="form-control" :readonly="coffeeBeanView">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">發酵法</label>
                                <div class="input-group">
                                    <input type="text" id= "fermentation" v-model="coffeeBean.fermentation" class="form-control" :readonly="coffeeBeanView">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">焙度</label>
                                <div class="input-group">
                                    <input type="text" id= "roast" v-model="coffeeBean.roast" class="form-control" :readonly="coffeeBeanView">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">酸甜度</label>
                                <div class="input-group">
                                    <input type="text" id= "acidity" v-model="coffeeBean.acidity" class="form-control" :readonly="coffeeBeanView">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">調性</label>
                                <div class="input-group">
                                    <input type="text" id= "flavor" v-model="coffeeBean.flavor" class="form-control" :readonly="coffeeBeanView">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">風味</label>
                                <div class="input-group">
                                    <input type="text" id= "tasting" v-model="coffeeBean.tasting" class="form-control" :readonly="coffeeBeanView">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">狀態</label>
                                <div class="input-group">
                                    <select class="form-control" id ="state" v-model="coffeeBean.state" :readonly="coffeeBeanView">
                                        <option v-for="( option, index ) in stateOptions" :key="index"
                                            :value="option.value"
                                            :disabled="coffeeBeanView">
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
                                <label class="label">描述</label>
                                <div class="input-group">
                                    <input type="text" id= "description" v-model="coffeeBean.description" class="form-control" :readonly="coffeeBeanView">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <viewer :images=[]>
                                <img v-if="coffeeBean.image" v-bind:src="'data:image/jpeg;base64,'+coffeeBean.image" width="200">
                            </viewer>
                            <div v-if="coffeeBeanView"></div>
                            <div v-else>
                                <input type="file" @change="uploadPhoto($event)"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                        </div>
                        <div class="col-4">
                            <div v-if="coffeeBeanView">
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
// import _ from 'lodash'
export default {
  name: 'coffeeBeanVE',
  data () {
    return {
      id: 0,
      saveState: '儲存成功',
      alertColor: 'success',
      dismissCountDown: false,
      dismissSecs: 3,
      coffeeBeanView: true
    }
  },
  computed: mapState({
    coffeeBean: state => state.coffeeBean,
    storeSelectItem: state => state.storeSelectItem,
    stateOptions: state => state.stateOptions
  }),
  mounted () {
    this.id = this.$route.params.id
    this.$store.dispatch('getCoffeeBean', this.id)
    this.$store.dispatch('getStoreSelectItem', 'STORE')
  },
  methods: {
    async toSave () {
      await this.$store.dispatch('updateCoffeeBean', this.coffeeBean)
      if (this.$store.state.updateState) {
        this.saveState = '更新成功'
        this.dismissCountDown = this.dismissSecs
        this.coffeeBeanView = true
        this.$store.dispatch('getCoffeeBean', this.id)
        this.$store.dispatch('initUpdateState')
      } else {
        this.saveState = '更新失敗'
        this.alertColor = 'danger'
        this.dismissCountDown = this.dismissSecs
      }
    },
    toEdit: function () {
      this.coffeeBeanView = false
    },
    toview: function () {
      this.coffeeBeanView = true
    },
    toReturn: function () {
      location.href = '#/coffeeBeanList'
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
          this.coffeeBean.image = strL
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
<style scoped src="viewerjs/dist/viewer.css"></style>
<style scoped lang="scss">
.tables {
}
//  @import 'viewerjs/dist/viewer.css'
</style>
