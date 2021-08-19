<template lang="html">
    <section class='coffeeBeanAdd'>
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-8">
                            <h4>新増沖泡記錄</h4>
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
                                <label class="label">豆名</label>
                                <div class="input-group">
                                    <select class="form-control" id ="bid" v-model="brew.bid">
                                        <option v-for="( option, index ) in coffeeBeanSelectItem" :key="index"
                                            :value="option.value">
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
                                    <input type="text" id= "grinder" v-model="brew.grinder" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">刻度</label>
                                <div class="input-group">
                                    <input type="text" id= "scale" v-model="brew.scale" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="label">水溫</label>
                                <b-input-group  class="mb-2">
                                    <b-form-input type="text" id= "waterTemperature" v-model="brew.waterTemperature"></b-form-input>
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
                                    <b-form-input type="text" id= "waterCuts" v-model="brew.waterCuts"></b-form-input>
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
                                    <b-form-input type="text" id= "totalWater" v-model="brew.totalWater"></b-form-input>
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
                                    <b-form-input type="text" id= "steaming" v-model="brew.steaming"></b-form-input>
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
                                    <input type="text" id= "description" v-model="brew.description" class="form-control">
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
  name: 'brewAdd',
  data () {
    return {
      saveState: '儲存成功',
      alertColor: 'success',
      dismissCountDown: false,
      dismissSecs: 3,
      brew: {
        bid: 0,
        grinder: '',
        scale: '',
        steaming: '',
        waterCuts: '',
        totalWater: '',
        description: ''
      }
    }
  },
  computed: mapState({
    coffeeBeanSelectItem: state => state.coffeeBeanSelectItem,
    stateOptions: state => state.stateOptions
  }),
  mounted () {
    this.$store.dispatch('getCoffeeBeanSelectItem', 'COFFEEBEAN')
  },
  methods: {
    async toSave () {
      await this.$store.dispatch('saveBrew', this.brew)
      if (this.$store.state.saveState) {
        this.saveState = '新增成功'
        this.dismissCountDown = this.dismissSecs
        this.$store.dispatch('initSaveState')
        location.href = '#/brewList'
      } else {
        this.saveState = '新增失敗'
        this.alertColor = 'danger'
        this.dismissCountDown = this.dismissSecs
      }
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
