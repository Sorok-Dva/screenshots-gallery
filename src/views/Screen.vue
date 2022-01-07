<template>
  <div>
<!--
    <meta property="og:title"
          content="{{ screen.title }} | PasteUrScreens.tk - Paste and share your screenshot in one click !"/>
    <meta property="og:type" content="website"/>
    <meta property="og:image" content="https://pasteurscreens.tk/{{ screen.path }}"/>
-->

    <div class="container-fluid" style="margin-top:40px; padding: 30px;">
      <h3 class="text-center">{{ title }} - {{ views }} views.</h3>
      <div class="text-center" style="padding:15px;">
        <img v-bind:src="path" v-bind:style="style" alt="Screenshot hosted on pasteurscreens.tk" style="box-shadow: 7px 4px 20px 10px #aaa">
      </div>
    </div>
    <notifications
        position="bottom left"
        class="notify"
        width="350px"
        animation-type="css"
        :closeOnClick="true"
        :duration="5000"
        :max="1"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
import $ from 'jquery'

@Component
export default class Screen extends Vue {
  private key = this.$route.params.id
  public title = '404 Not Found'
  public views = 0
  public style = ''
  public path = ''

  public notify: { type: string, } = { type: 'danger' }

  mounted () {
    console.log(this.$route.params)
    if (!this.$route.params?.title) {
      const apiUrl = process.env.VUE_APP_SERVER_URL
      axios
        .get(`${apiUrl}/screens/${this.key}`)
        .then(response => {
          const { data } = response
          if (data.screen) {
            const { screen } = data
            const { title, views, path } = screen
            this.title = title
            this.views = views
            this.path = path
          } else this.screenError()
        }).catch(reason => this.screenError(reason))
    } else {
      this.title = String(this.$route.params.title)
      this.views = Number(this.$route.params.views)
      this.path = String(this.$route.params.path)
    }
  }

  screenError (reason?: string) {
    this.$notify({
      title: '⚠️ Unable to retrieve this screenshot :',
      text: reason || 'Screenshot doesn\'t exists',
      type: 'error',
    })
    this.path = '/assets/images/404.jpeg'
    this.style = 'width:750px'
  }
}
</script>