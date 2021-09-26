<template>
  <header class="bg-primary-pus text-white">
    <div class="container text-center">
      <h1 class="text-white">{{ $t('main.welcome', { title: 'PASTE YOUR SCREENS' }) }}</h1>
      <p class="lead">{{ $t('main.screenshots_uploaded') }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Prop() private user? : object;
}
</script>