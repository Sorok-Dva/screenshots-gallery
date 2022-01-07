<template>
  <div id="app">
    <MenuNavbar title='Paste Your Screens'/>
    <router-view />
    <Footer version='2.0.0'/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import $ from 'jquery'

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
  mounted() {
    // $("[data-toggle=popover]").popover()

    let activeBtnLoader

    $(document).on('click', '.btn-loader', (e) => {
      let $this = $(e.target)
      activeBtnLoader = $this
      let loadingText = $this.attr('data-loading-text')
      if ($this.html() !== loadingText) {
        $this.data('original-text', $this.html())
        $this.html(String(loadingText))
      }
      setTimeout(() => {
        $this.html($this.data('original-text'))
      }, 10000)
    })

    if (!localStorage.lang) localStorage.setItem('lang', this.$i18n.locale)
    this.$i18n.locale = localStorage.lang

    const noIE = (): void => {
      if (confirm("Internet explorer n'est plus à jour, merci de télécharger et d'installer Microsoft Edge.")) {
        $(location).attr('href', 'https://www.microsoft.com/fr-fr/windows/microsoft-edge');
      } else {
        $(location).attr('href', 'https://www.microsoft.com/fr-fr/windows/microsoft-edge');
      }
    }

    $(document).on('ready', function () {
      if ((navigator.userAgent.indexOf('Trident') !== -1)) noIE()
    })

    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js')
    document.head.appendChild(recaptchaScript)
  }
})
</script>

<style>
@import './assets/css/bootstrap.css';
@import './assets/css/main.css';
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
