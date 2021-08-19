<template lang="html">
    <section class='runShopAdd'>
        <b-alert :show="dismissCountDown" :variant="alertColor" fade>{{saveState}}</b-alert>
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4>新增探店記錄</h4>
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
                                    <select class="form-control" id ="sid" v-model="runShop.sid">
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
                                <label class="label">產品</label>
                                <div class="input-group">
                                    <select class="form-control" id ="sid" v-model="runShop.pid">
                                        <option v-for="( option, index ) in productSelectItem" :key="index"
                                            :value="option.value">
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
                                    <input type="text" id= "tasting" v-model="runShop.tasting" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">狀態</label>
                                <div class="input-group">
                                    <select class="form-control" id ="state" v-model="runShop.state">
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
                                <label class="label">備註</label>
                                <div class="input-group">
                                    <input type="text" id= "runShop.memo" class="form-control">
                                </div>
                            </div>
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
export default {
  name: 'runShopAdd',
  data () {
    return {
      alertColor: 'success',
      dismissCountDown: false,
      dismissSecs: 3,
      runShop: {
        sid: 0,
        pid: 0,
        tasting: '',
        memo: '',
        state: 0
      }
    }
  },
  computed: mapState({
    storeSelectItem: state => state.storeSelectItem,
    productSelectItem: state => state.productSelectItem,
    stateOptions: state => state.stateOptions
  }),
  mounted () {
    this.$store.dispatch('getStoreSelectItem', 'STORE')
    this.$store.dispatch('getProductSelectItem', 'PRODUCT')
  },
  methods: {
    async toSave () {
      await this.$store.dispatch('saveRunShop', this.runShop)
      if (this.$store.state.saveState) {
        this.saveState = '新增成功'
        this.dismissCountDown = this.dismissSecs
        this.$store.dispatch('initSaveState')
        location.href = '#/runShopList'
      } else {
        this.saveState = '新增失敗'
        this.alertColor = 'danger'
        this.dismissCountDown = this.dismissSecs
      }
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
