<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <router-link to="home">{{ title }}</router-link>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav ml-auto">
        <li v-if="usingPurs === true" class="nav-item pull-left">
          <a class="nav-link menuActionPurs" href="#/">...</a>
        </li>

        <li class="pull-center cursor" @click="switchLocale('fr')">
          <b><a class="nav-link" v-show="`This s=is a test`">🇫🇷</a></b>
        </li>
        <li class="pull-left cursor" @click="switchLocale('en')">
          <b><a class="nav-link">🇬🇧</a></b>
        </li>
        <li class="nav-item pull-left cursor" @click="switchLocale('ru')">
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
          <router-link :to="$i18nRoute({ name: 'Home' })">
            {{ $t('partials.menu.login') }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TranslateResult } from 'vue-i18n';
import translate from '@/plugins/translate'
import type { Locale } from '@/plugins/translate'

@Component
export default class MenuNavbar extends Vue {
  @Prop() private title!: string | TranslateResult;
  @Prop() private usingPurs?: boolean;
  @Prop() private user?: object;

  switchLocale(locale: Locale) {
    if (this.$i18n.locale !== locale) {
      const to = this.$router.resolve({ params: { locale } })
      return translate.changeLocale(locale).then(() => {
        this.$router.push(to.location)
      })
    }
  }

  data() {
    return {
      hello: 'world',
    };
  }

  mounted() : void {
    /*if (document.referrer === '') {
      $('.menuActionPurs').html('Upload your screen').attr('href', 'https://pasteurscreens.tk');
    } else {
      $('.menuActionPurs').html('Go back').attr('onclick', 'return history.back();');
    }*/
  }
}
</script>