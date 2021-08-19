<template lang="html">

  <section class="login">
    <b-alert :show="dismissCountDown" :variant="alertColor" fade>{{loginState}}</b-alert>
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auto-form-wrapper">
                <form action="#">
                  <div class="form-group">
                    <label class="label">Username</label>
                    <div class="input-group">
                      <input type="text" id="userId" class="form-control" placeholder="ID" v-model="userId">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <i class="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="label">Password</label>
                    <div class="input-group">
                      <input type="password" id="password" class="form-control" placeholder="*********" v-model="password">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <i class="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-primary submit-btn btn-block" v-on:click="loginData">Login</button>
                  </div>
                  <!-- <div class="form-group d-flex justify-content-between">
                    <div class="form-check form-check-flat mt-0">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" checked> Keep me signed in </label>
                    </div>
                    <a href="#" class="text-small forgot-password text-black">Forgot Password</a>
                  </div> -->
                  <!-- <div class="form-group">
                    <button class="btn btn-block g-login">
                      <img class="mr-3" src="../../../assets/images/file-icons/icon-google.svg" alt="">Log in with Google</button>
                  </div> -->
                  <!-- <div class="text-block text-center my-3">
                    <span class="text-small font-weight-semibold">Not a member ?</span>
                    <a href="register.html" class="text-black text-small">Create new account</a>
                  </div> -->
                </form>
              </div>
              <ul class="auth-footer">
                <li>
                  <a href="#">Conditions</a>
                </li>
                <li>
                  <a href="#">Help</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
              </ul>
              <!-- <p class="footer-text text-center">copyright © 2019 Bootstrapdash. All rights reserved.</p> -->
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </section>

</template>

<script lang="js">
import _ from 'lodash'
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      loginState: '帳密錯誤',
      alertColor: 'danger',
      dismissCountDown: false,
      dismissSecs: 3,
      userId: '',
      password: '',
      errorMessage: ''
    }
  },
  mounted () {
    var token = Cookies.get('token')
    // this.loginState = _.isNil(token)
    this.isString = _.isNil(token)
    // if (!_.isNil(token)) {
    //   this.$router.push({ path: '/runShopList' })
    // }
  },
  methods: {
    async loginData () {
      var parameter = {}
      _.set(parameter, 'userId', this.userId)
      _.set(parameter, 'password', this.password)
      await this.$store.dispatch('login', parameter)
      if (!this.$store.state.longinState) {
        this.dismissCountDown = this.dismissSecs
      } else {
        this.loginState = '這是對的'
        this.dismissCountDown = this.dismissSecs
        // this.$router.push({
        //   path: '/runShopList'
        // })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login {

}
</style>
