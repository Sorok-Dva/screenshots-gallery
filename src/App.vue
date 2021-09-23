<template>
  <main id='app'>
    <Header title='Paste Your Screens' :t="$t"/>

    <img alt='Vue logo' src='./assets/logo.png'/>

    <HelloWorld :msg='$t("layouts.landing.header_h1_text")'/>
    <select
        v-model='$i18n.locale'
        @change='updateLanguage($event.target.value)'>
      <option
          v-for='(o, i) in LOCALES'
          :key='i' :value='o.value'
          :selected='o.value === defaultLocale'>{{ o.caption }}</option>
      </select>
    <HelloWorld :msg='$t("titles.main")'/>

    <router-view/>

    <Footer version='2.0.0'/>
  </main>
</template>

<script>
import Vue from 'vue'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {LOCALES} from '@/i18n/locales'
import {defaultLocale} from '@/i18n'

export default Vue.extend({
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data: () => ({LOCALES, defaultLocale}),
  methods: {
    updateLanguage(lang) {
      this.$store.commit('SET_LANGUAGE', lang)
    }
  }
})
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
