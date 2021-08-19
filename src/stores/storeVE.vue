<template lang="html">
    <section class='stordVE'>
        <b-alert :show="dismissCountDown" :variant="alertColor" fade>{{saveState}}</b-alert>
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-8">
                            <h4>檢視修改店家</h4>
                        </div>
                        <div class="col-4">
                            <div v-if="storeView">
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
                                <label class="label">店名</label>
                                <div class="input-group">
                                    <input type="text" id= "name" v-model="store.name" class="form-control" :readonly="storeView">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">電話</label>
                                <div class="input-group">
                                    <input type="text" id= "tel" v-model="store.tel" class="form-control" :readonly="storeView">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">狀態</label>
                                <div class="input-group">
                                    <select class="form-control" id ="state" v-model="store.state" :readonly="storeView">
                                        <option v-for="( option, index ) in stateOptions" :key="index"
                                            :value="option.value"
                                            :disabled="storeView">
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
                                    <input type="text" id= "address" v-model="store.address" class="form-control" :readonly="storeView">
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
                                    <b-form-input type="text" id= "page" v-model="store.page" :readonly="storeView"></b-form-input>
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
                                    <b-form-input type="text" id= "fb" v-model="store.fb" :readonly="storeView"></b-form-input>
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
                                    <b-form-input type="text" id= "ig" v-model="store.ig" :readonly="storeView"></b-form-input>
                                </b-input-group>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="label">備註</label>
                                <div class="input-group">
                                    <input type="text" id= "memo" v-model="store.memo" class="form-control" :readonly="storeView">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <viewer :images=[]>
                                <img v-if="store.image" v-bind:src="'data:image/jpeg;base64,'+store.image" width="200">
                            </viewer>
                            <div v-if="storeView"></div>
                            <div v-else>
                                <input type="file" @change="uploadPhoto($event)"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                        </div>
                        <div class="col-4">
                            <div v-if="storeView">
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
  name: 'storeVE',
  data () {
    return {
      id: 0,
      saveState: '儲存成功',
      alertColor: 'success',
      dismissCountDown: false,
      dismissSecs: 3,
      storeView: true
    }
  },
  computed: mapState({
    store: state => state.store,
    stateOptions: state => state.stateOptions
  }),
  mounted () {
    var id = this.$route.params.id
    this.$store.dispatch('getStore', id)
  },
  methods: {
    async toSave () {
      await this.$store.dispatch('updateStore', this.store)
      if (this.$store.state.updateState) {
        this.saveState = '更新成功'
        this.dismissCountDown = this.dismissSecs
        this.storeView = true
        this.$store.dispatch('initUpdateState')
      } else {
        this.saveState = '更新失敗'
        this.alertColor = 'danger'
        this.dismissCountDown = this.dismissSecs
      }
    },
    toEdit: function () {
      this.storeView = false
    },
    toview: function () {
      this.storeView = true
    },
    toReturn: function () {
      location.href = '#/storeList'
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
          this.store.image = strL
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
