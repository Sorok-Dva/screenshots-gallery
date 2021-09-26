<template>
  <div id="app">
    <MenuNavbar title='Paste Your Screens'/>
    <router-view />
    <Footer version='2.0.0'/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Header from '@/components/home/Header.vue'
import Footer from '@/components/partials/Footer.vue'
import MenuNavbar from '@/components/partials/MenuNavbar.vue';

export default Vue.extend({
  name: 'App',
  components: {
    MenuNavbar,
    Header,
    Footer,
  },
})
</script>

<style>
@import './assets/css/bootstrap.css';
@import './assets/css/main.min.css';
@import './assets/css/lux.min.css';
@import './assets/css/animate.css';
@import './assets/css/pasteurscreens.css';
@import './assets/css/jquery-ui/jquery-ui.min.css';
@import './assets/css/jquery-ui/jquery-ui.structure.min.css';
@import './assets/css/jquery-ui/jquery-ui.theme.min.css';
@import './assets/css/scrolling-nav.css';
</style>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
