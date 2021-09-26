<template>
  <footer class="py-5 bg-dark">
    <div class="container">
      <p class="m-0 text-center text-white">
        Copyright &copy; Pasteurscreens.tk 2018 - 2021
        // v{{ version }}
        // {{ $tc('partials.footer.visitors', 42) }}
      </p>
    </div>
  </footer>
</template>

<style>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: red;
  color: white;
  text-align: center;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import pckg from '../../../package.json'

@Component
export default class Footer extends Vue {
  @Prop() private version: string = pckg.version
}
</script>