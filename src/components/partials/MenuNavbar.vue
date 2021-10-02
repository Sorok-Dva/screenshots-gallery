<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <router-link to="home">{{ title }}</router-link>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav ml-auto">
        <li v-if="usingPurs === true" class="nav-item pull-left">
          <a class="nav-link menuActionPurs" href="#/">...</a>
        </li>

        <li class="pull-left cursor" v-show="locale !== 'en'"
            @click="switchLocale('en')"
            v-bind:title="translateToEN">
          <b><a class="nav-link">🇬🇧</a></b>
        </li>
        <li class="pull-center cursor"
            @click="switchLocale('fr')"
            v-bind:title="translateToFR"
            v-show="locale !== 'fr'">
          <span><a class="nav-link" v-show="`This s=is a test`">🇫🇷</a></span>
        </li>
        <li class="nav-item pull-left cursor"
            @click="switchLocale('ru')"
            v-bind:title="translateToRU"
            v-show="locale !== 'ru'">
          <b><a class="nav-link">🇷🇺</a></b>
        </li>
        <li v-if="user" class="nav-item">
          <router-link :to="$i18nRoute({ name: 'Home' })">
            {{ $t('partials.menu.account') }}
          </router-link>
        </li>
        <li v-if="user" class="nav-item">
          <router-link :to="$i18nRoute({ name: 'Home' })">
            {{ $t('partials.menu.my_gallery') }}
          </router-link>
        </li>
        <li v-if="user" class="nav-item">
          <router-link :to="$i18nRoute({ name: 'Home' })">
            {{ $t('partials.menu.logout') }}
          </router-link>
        </li>
        <li v-if="!user" class="nav-item" style="margin-top: 10px">
          <router-link :to="$i18nRoute({ name: 'Register' })">
            {{ $t('partials.menu.register') }}
          </router-link>
        </li>
        <li v-if="!user" class="nav-item" style="margin-top: 10px">
          <router-link :to="$i18nRoute({ name: 'Login' })">
            {{ $t('partials.menu.login') }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import VueI18n, { TranslateResult } from 'vue-i18n';
import translate from '@/plugins/translate'
import type { Locale } from '@/plugins/translate'
import $ from 'jquery'
import { i18n } from '@/i18n'

@Component
export default class MenuNavbar extends Vue {
  @Prop() private title!: string | TranslateResult
  @Prop() private usingPurs?: boolean
  private locale?: string

  data() {
    console.log(localStorage)
    return {
      user: null,
      translateToEN: this.$i18n.t('partials.menu.translateToEN'),
      translateToFR: this.$i18n.t('partials.menu.translateToFR'),
      translateToRU: this.$i18n.t('partials.menu.translateToRU'),
      locale: localStorage.lang
    }
  }

  switchLocale(locale: Locale) {
    if (this.$i18n.locale !== locale) {
      this.locale = locale
      if (!localStorage.lang) localStorage.setItem('lang', locale)
      console.log(localStorage.lang, this.locale, locale)
      const to = this.$router.resolve({ params: { locale } })
      return translate.changeLocale(locale).then(() => {
        this.$router.push(to.location)
      })
    }
  }

  mounted() : void {
    if (document.referrer === '') {
      $('.menuActionPurs').html('Upload your screen').attr('href', 'https://pasteurscreens.tk');
    } else {
      $('.menuActionPurs').html('Go back').attr('onclick', 'return history.back();');
    }
  }
}
</script>