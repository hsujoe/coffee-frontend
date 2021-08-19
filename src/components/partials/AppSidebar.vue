<template lang="html">
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <router-link class="nav-link nav-item nav-category" to="/homePage">HomePage</router-link>
        <!-- <li class="nav-item nav-category">探店記錄</li> -->
        <li class="nav-item">
          <a class="nav-link" v-b-toggle="'mySelfs'">
            <i class="menu-icon typcn typcn-document-text"></i>
            <span class="menu-title">探訪</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="mySelfs">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/runShopList">跑店</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/brewList">沖泡</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-b-toggle="'coffeeBeans'">
            <i class="menu-icon typcn typcn-document-text"></i>
            <span class="menu-title">咖啡豆記錄</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="coffeeBeans">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/coffeeBeanList">咖啡豆清單</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-b-toggle="'basicSet'">
            <i class="menu-icon typcn typcn-document-text"></i>
            <span class="menu-title">基本設定</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="basicSet">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/storeList">店面清單</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/productList">產品清單</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script lang="js">
import JQuery from 'jquery'
// eslint-disable-next-line
let $ = JQuery
export default {
  name: 'app-sidebar',
  mounted () {
    const body = document.querySelector('body')
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open')
        }
      })
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open')
        }
      })
    })
  }
}
</script>

<style scoped lang="scss">
.app-sidebar {
}
</style>
