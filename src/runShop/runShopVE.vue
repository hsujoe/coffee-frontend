<template lang="html">
    <section class='runShopVE'>
        <b-alert :show="dismissCountDown" :variant="alertColor" fade>{{saveState}}</b-alert>
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <dir class="row">
                        <div class="col-8">
                            <h4>檢視修改探店</h4>
                        </div>
                        <div class="col-4">
                            <div v-if="runShopView">
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
                                    <select class="form-control" id ="sid" v-model="runShop.sid" :readonly="runShopView">
                                        <option v-for="( option, index ) in storeSelectItem" :key="index"
                                            :value="option.value"
                                            :disabled="runShopView">
                                            {{ option.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">產品</label>
                                <div class="input-group">
                                    <select class="form-control" id ="sid" v-model="runShop.pid" :readonly="runShopView">
                                        <option v-for="( option, index ) in productSelectItem" :key="index"
                                            :value="option.value"
                                            :disabled="runShopView">
                                            {{ option.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">風味</label>
                                <div class="input-group">
                                    <input type="text" id= "tasting" v-model="runShop.tasting" class="form-control" :readonly="runShopView">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">狀態</label>
                                <div class="input-group">
                                    <select class="form-control" id ="state" v-model="runShop.state" :readonly="runShopView">
                                        <option v-for="( option, index ) in stateOptions" :key="index"
                                            :value="option.value"
                                            :disabled="runShopView">
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
                                    <input type="text" id= "memo" v-model="runShop.memo" class="form-control" :readonly="runShopView">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                        </div>
                        <div class="col-4">
                            <div v-if="runShopView">
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
export default {
  name: 'runShopVE',
  data () {
    return {
      saveState: '儲存成功',
      alertColor: 'success',
      dismissCountDown: false,
      dismissSecs: 3,
      runShopView: true
    }
  },
  computed: mapState({
    runShop: state => state.runShop,
    storeSelectItem: state => state.storeSelectItem,
    productSelectItem: state => state.productSelectItem,
    stateOptions: state => state.stateOptions
  }),
  mounted () {
    var id = this.$route.params.id
    this.$store.dispatch('getRunShop', id)
    this.$store.dispatch('getStoreSelectItem', 'STORE')
    this.$store.dispatch('getProductSelectItem', 'PRODUCT')
  },
  methods: {
    async toSave () {
      await this.$store.dispatch('updateRunShop', this.runShop)
      if (this.$store.state.updateState) {
        this.saveState = '更新成功'
        this.dismissCountDown = this.dismissSecs
        this.runShopView = true
        this.$store.dispatch('initUpdateState')
      } else {
        this.saveState = '更新失敗'
        this.alertColor = 'danger'
        this.dismissCountDown = this.dismissSecs
      }
    },
    toEdit: function () {
      this.runShopView = false
    },
    toview: function () {
      this.runShopView = true
    },
    toReturn: function () {
      location.href = '#/runShopList'
    }
  }
}
</script>

<style scoped lang="scss">
.tables {
}
</style>
