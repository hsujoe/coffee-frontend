<template lang="html">
    <section class='coffeeBeanAdd'>
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <dir class="row">
                        <div class="col-8">
                            <h4>檢視修改沖泡記錄</h4>
                        </div>
                        <div class="col-4">
                            <div v-if="brewView">
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
                                <label class="label">豆名</label>
                                <div class="input-group">
                                    <select class="form-control" id ="bid" v-model="brew.bid" :readonly="brewView">
                                        <option v-for="( option, index ) in coffeeBeanSelectItem" :key="index"
                                            :value="option.value"
                                            :disabled="brewView">
                                            {{ option.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">磨豆機</label>
                                <div class="input-group">
                                    <input type="text" id= "grinder" v-model="brew.grinder" class="form-control" :readonly="brewView">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">刻度</label>
                                <div class="input-group">
                                    <input type="text" id= "scale" v-model="brew.scale" class="form-control" :readonly="brewView">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">水溫</label>
                                <b-input-group  class="mb-2">
                                    <b-form-input type="text" id= "waterTemperature" v-model="brew.waterTemperature" :readonly="brewView"></b-form-input>
                                    <b-input-group-prepend is-text>
                                    <span>度</span>
                                    </b-input-group-prepend>
                                </b-input-group>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">斷水次數</label>
                                <b-input-group  class="mb-2">
                                    <b-form-input type="text" id= "waterCuts" v-model="brew.waterCuts" :readonly="brewView"></b-form-input>
                                    <b-input-group-prepend is-text>
                                    <span>次</span>
                                    </b-input-group-prepend>
                                </b-input-group>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">總水量</label>
                                <b-input-group  class="mb-2">
                                    <b-form-input type="text" id= "totalWater" v-model="brew.totalWater" :readonly="brewView"></b-form-input>
                                    <b-input-group-prepend is-text>
                                    <span>C.C.</span>
                                    </b-input-group-prepend>
                                </b-input-group>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">悶蒸</label>
                                <b-input-group  class="mb-2">
                                    <b-form-input type="text" id= "steaming" v-model="brew.steaming" :readonly="brewView"></b-form-input>
                                    <b-input-group-prepend is-text>
                                    <span>秒</span>
                                    </b-input-group-prepend>
                                </b-input-group>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="label">描述</label>
                                <div class="input-group">
                                    <input type="text" id= "description" v-model="brew.description" class="form-control" :readonly="brewView">
                                </div>
                            </div>
                        </div>
                    </div>
                    <dir class="row">
                        <div class="col-8">
                        </div>
                        <div class="col-4">
                            <div v-if="brewView">
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
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="js">
import { mapState } from 'vuex'
export default {
  name: 'brewVE',
  data () {
    return {
      saveState: '儲存成功',
      alertColor: 'success',
      dismissCountDown: false,
      dismissSecs: 3,
      brewView: true
    }
  },
  computed: mapState({
    brew: state => state.brew,
    coffeeBeanSelectItem: state => state.coffeeBeanSelectItem
  }),
  mounted () {
    var id = this.$route.params.id
    this.$store.dispatch('getBrew', id)
    this.$store.dispatch('getCoffeeBeanSelectItem', 'COFFEEBEAN')
  },
  methods: {
    async toSave () {
      await this.$store.dispatch('updateBrew', this.brew)
      if (this.$store.state.updateState) {
        this.saveState = '更新成功'
        this.dismissCountDown = this.dismissSecs
        this.brewView = true
        this.$store.dispatch('initUpdateState')
      } else {
        this.saveState = '更新失敗'
        this.alertColor = 'danger'
        this.dismissCountDown = this.dismissSecs
      }
    },
    toEdit: function () {
      this.brewView = false
    },
    toview: function () {
      this.brewView = true
    },
    toReturn: function () {
      location.href = '#/brewList'
    }
  }
}
</script>

<style scoped lang="scss">
.tables {
}
</style>
