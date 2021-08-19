<template lang="html">
    <section class='stordAdd'>
        <b-alert :show="dismissCountDown" :variant="alertColor" fade>{{saveState}}</b-alert>
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-8">
                            <h4>新増店家</h4>
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
                                    <input type="text" id= "name" v-model="store.name" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">電話</label>
                                <div class="input-group">
                                    <input type="text" id= "tel" v-model="store.tel" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">狀態</label>
                                <div class="input-group">
                                    <select class="form-control" id ="state" v-model="store.state">
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
                                <label class="label">地址</label>
                                <div class="input-group">
                                    <input type="text" id= "address" v-model="store.address" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="label">官網</label>
                                <b-input-group  class="mb-2">
                                    <b-input-group-prepend is-text>
                                    <i class="mdi mdi-home"></i>
                                    </b-input-group-prepend>
                                    <b-form-input type="text" id= "page" v-model="store.page"></b-form-input>
                                </b-input-group>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="label">FB</label>
                                <b-input-group  class="mb-2">
                                    <b-input-group-prepend is-text>
                                    <i class="mdi mdi-facebook-box"></i>
                                    </b-input-group-prepend>
                                    <b-form-input type="text" id= "fb" v-model="store.fb"></b-form-input>
                                </b-input-group>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="label">IG</label>
                                <b-input-group  class="mb-2">
                                    <b-input-group-prepend is-text>
                                    <i class="mdi mdi-instagram"></i>
                                    </b-input-group-prepend>
                                    <b-form-input type="text" id= "ig" v-model="store.ig"></b-form-input>
                                </b-input-group>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="label">備註</label>
                                <div class="input-group">
                                    <input type="text" id= "memo" v-model="store.memo" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <img  id="image" v-if="store.image" :src="product.image" width="200"/>
                            <input type="file" @change="uploadPhoto($event)"/>
                        </div>
                    </div>
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
export default {
  name: 'storeAdd',
  data () {
    return {
      saveState: '儲存成功',
      alertColor: 'success',
      dismissCountDown: false,
      dismissSecs: 3,
      store: {
        name: '',
        tel: '',
        state: 0,
        address: '',
        page: '',
        fb: '',
        ig: '',
        memo: '',
        image: ''
      }
    }
  },
  computed: mapState({
    stateOptions: state => state.stateOptions
  }),
  methods: {
    async toSave () {
      await this.$store.dispatch('saveStore', this.store)
      if (this.$store.state.saveState) {
        this.saveState = '新增成功'
        this.dismissCountDown = this.dismissSecs
        this.$store.dispatch('initSaveState')
        location.href = '#/storeList'
      } else {
        this.saveState = '新增失敗'
        this.alertColor = 'danger'
        this.dismissCountDown = this.dismissSecs
      }
    },
    toReturn: function () {
      location.href = '#/storeList'
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
        //   this.PassportImg = result
        //   this.images.push(result)
          this.store.image = result
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
