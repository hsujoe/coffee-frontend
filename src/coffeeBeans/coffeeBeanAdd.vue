<template lang="html">
    <section class='coffeeBeanAdd'>
        <b-alert :show="dismissCountDown" :variant="alertColor" fade>{{saveState}}</b-alert>
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4>新増咖啡豆</h4>
                    <div class="row">
                        <div class="col-8">
                        </div>
                        <div class="col-4">
                            <b-button id = "save" variant="outline-primary" class="mb-2" v-on:click="toSave">
                                <b-icon icon="cloud-upload"></b-icon> 儲存
                            </b-button>
                            <b-button id = "return" variant="outline-warning" class="mb-2" v-on:click="toReturn">
                                <b-icon icon="reply"></b-icon> 取消
                            </b-button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">店名</label>
                                <div class="input-group">
                                    <select class="form-control" id ="sid" v-model="coffeeBean.sid">
                                        <option v-for="( option, index ) in storeSelectItem" :key="index"
                                            :value="option.value">
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
                                    <input type="date" id= "buyDate" v-model="coffeeBean.buyDate" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">價格</label>
                                <div class="input-group">
                                    <input type="text" id= "price" v-model="coffeeBean.price" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">重量</label>
                                <b-input-group  class="mb-2">
                                    <b-form-input type="text" id= "weight" v-model="coffeeBean.weight"></b-form-input>
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
                                    <input type="text" id= "Origin" v-model="coffeeBean.origin" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">莊園</label>
                                <div class="input-group">
                                    <input type="text" id= "manor" v-model="coffeeBean.manor" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">豆名</label>
                                <div class="input-group">
                                    <input type="text" id= "name" v-model="coffeeBean.name" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">發酵法</label>
                                <div class="input-group">
                                    <input type="text" id= "fermentation" v-model="coffeeBean.fermentation" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">焙度</label>
                                <div class="input-group">
                                    <input type="text" id= "roast" v-model="coffeeBean.roast" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">酸甜度</label>
                                <div class="input-group">
                                    <input type="text" id= "acidity" v-model="coffeeBean.acidity" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">調性</label>
                                <div class="input-group">
                                    <input type="text" id= "flavor" v-model="coffeeBean.flavor" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">風味</label>
                                <div class="input-group">
                                    <input type="text" id= "tasting" v-model="coffeeBean.tasting" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">狀態</label>
                                <div class="input-group">
                                    <select class="form-control" id ="state" v-model="coffeeBean.state">
                                        <option v-for="( option, index ) in stateOptions" :key="index"
                                            :value="option.value">
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
                                    <input type="text" id= "description" v-model="coffeeBean.description" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <img  id="image" v-if="coffeeBean.image" :src="coffeeBean.image" width="200"/>
                            <input type="file" @change="uploadPhoto($event)"/>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-8">
                        </div>
                        <div class="col-4">
                            <b-button id = "save" variant="outline-primary" class="mb-2" v-on:click="toSave">
                                <b-icon icon="cloud-upload"></b-icon> 儲存
                            </b-button>
                            <b-button id = "return" variant="outline-warning" class="mb-2" v-on:click="toReturn">
                                <b-icon icon="reply"></b-icon> 取消
                            </b-button>
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
import moment from 'moment'
export default {
  name: 'coffeeBeanAdd',
  data () {
    return {
    //   images: [],
      saveState: '儲存成功',
      alertColor: 'success',
      dismissCountDown: false,
      dismissSecs: 3,
      coffeeBean: {
        sid: 0,
        sname: '',
        origin: '',
        manor: '',
        name: '',
        fermentation: '',
        roast: '',
        acidity: '',
        flavor: '',
        tasting: '',
        description: '',
        state: 0,
        image: '',
        buyDate: moment(new Date().toISOString()).format('YYYY-MM-DD'),
        weight: 0,
        price: 0
      }
    }
  },
  computed: mapState({
    storeSelectItem: state => state.storeSelectItem,
    stateOptions: state => state.stateOptions
  }),
  mounted () {
    this.$store.dispatch('getStoreSelectItem', 'STORE')
  },
  methods: {
    async toSave () {
    //   this.coffeeBean.image = this.images[0]
      await this.$store.dispatch('saveCoffeeBean', this.coffeeBean)
      if (this.$store.state.saveState) {
        this.saveState = '新增成功'
        this.dismissCountDown = this.dismissSecs
        this.$store.dispatch('initSaveState')
        location.href = '#/coffeeBeanList'
      } else {
        this.saveState = '新增失敗'
        this.alertColor = 'danger'
        this.dismissCountDown = this.dismissSecs
      }
    },
    toReturn: function () {
      location.href = '#/coffeeBeanList'
    },
    // fileSelected (event) {
    //   const file = event.target.files.item(0)
    //   const reader = new FileReader()
    //   reader.addEventListener('load', this.imageLoader)
    //   reader.readAsDataURL(file)
    // },
    // imageLoader (event) {
    //   this.images.push(event.target.result)
    // },
    // getImgSize (str) {
    //   var strL = str.replace('data:image/jpeg;base64,', '')
    //   var strLength = strL.length
    //   var fileLength = parseInt(strLength - (strLength / 8) * 2)
    //   var size = ''
    //   size = (fileLength / 1024).toFixed(2)
    //   return parseInt(size)
    // },
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
        //   this.PassportImg = result
        //   this.images.push(result)
          this.coffeeBean.image = result
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
</style>
