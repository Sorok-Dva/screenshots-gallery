<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="$t('layouts.landing.header_h1_text')" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue"


export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
