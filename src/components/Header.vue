<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a class="navbar-brand" href="/">{{ title }}</a>


    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav ml-auto">
        <li v-if="usingPurs === true" class="nav-item pull-left">
          <a class="nav-link menuActionPurs" href="#/">...</a>
        </li>
        <li class="nav-item pull-left">
          <small><a class="nav-link" href="/?clang=fr">🇫🇷</a></small>
        </li>
        <li class="nav-item pull-left">
          <small><a class="nav-link" href="/?clang=en">🇬🇧</a></small>
        </li>
        <!--      {{#if user}}-->
        <li v-if="user" class="nav-item">
          <a class="nav-link" href="/account">Mon compte</a>
        </li>
        <li v-if="user" class="nav-item">
          <a class="nav-link" href="/gallery">Gallery</a>
        </li>
        <li v-if="user" class="nav-item">
          <a class="nav-link" href="/logout">Logout</a>
        </li>
        <li v-if="!user" class="nav-item">
          <a class="nav-link" href="/register">Register</a>
        </li>
        <li v-if="!user" class="nav-item">
          <a class="nav-link" href="/login">{{ t('layouts.landing.header_h1_text') }} - {{ headline }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { TranslateResult } from 'vue-i18n';

@Component
export default class Header extends Vue {
  @Prop() private t!: Function
  @Prop() private title!: string
  @Prop() private usingPurs?: boolean
  @Prop() private user?: object

  data() {
    return { headline: this.$t('layouts.landing.header_h1_text') as TranslateResult };
  }

  mounted(): void {
    $(() => {
      if (document.referrer === '') {
        $('.menuActionPurs').html('Upload your screen').attr('href', 'https://pasteurscreens.tk')
      } else {
        $('.menuActionPurs').html('Go back').attr('onclick', 'return history.back();')
      }
    })
  }
}
</script>