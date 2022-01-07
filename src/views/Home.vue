<template>
  <div @paste="onPaste">
    <header class="bg-primary-pus text-white">
      <div class="container text-center">
        <h1 class="text-white">{{ $t('main.welcome', { title: 'PASTE YOUR SCREENS' }) }}</h1>
        <p class="lead">{{ $t('main.welcome_subtext') }}</p>
      </div>
    </header>

    <div class="home">
      <section id="services" class="bg-light">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 mx-auto">
              <p class="text-center">
                Focus this page and press <kbd>CTRL</kbd> + <kbd>V</kbd>. The image in your clipboard will be uploaded !
              </p>
              <p class="text-center" v-show="!user">
                <i>Register to set your screen privacy to private and get your own gallery.</i>
              </p>
              <div style="border:1px solid grey;"></div>
              <div id="postSetting" class="row" v-show="clipboardImage">
                <div class="col-md-4 form-group">
                  <input class="form-control input-md" placeholder="Title" required
                         id="screenTitle"
                         v-model="title"
                         type="text"
                         name="title">
                </div>
                <div class="col-md-2 form-group">
                  <select id="screenPrivacy" class="input-md form-control">
                    <option value="false">Public</option>
                    <option v-if="user" value="true">Private</option>
                  </select>
                </div>
                <div class="form-group">
                  <button class="btn btn-md btn-success" @click="postUpload">Upload</button>
                </div>
              </div>
              <div id="imgPreview" class="text-center" :class="image.classList"></div>
            </div>
          </div>
        </div>
      </section>
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
import translate from '@/plugins/translate'

interface Event {
  clipboardData : any;
}

@Component
export default class Home extends Vue {
  private user = null
  private url = process.env.VUE_APP_SERVER_URL

  public title = ''
  public privacy: 'public' | 'private' = 'public'
  public clipboardImage = false
  public imagePreview: string[] = []
  public image: {
    base64: string
    size: number
    classList: string
  } = { base64: '', size: 0, classList: '' }

  onPaste(event: Event): void {
    const { clipboardData } = event
    let items = clipboardData.items

    if(items[0].type.indexOf('image') == -1) {
      this.$notify({
        title: '⚠️ Wrong Content :',
        text: 'Your actual clipboard isn\'t a screenshot.',
        type: 'error',
      })
    } else {
      this.clipboardImage = true
      let blob = items[0].getAsFile()
      const fr = new FileReader()
      $('#imgPreview > img').remove()
      fr.readAsDataURL(blob)
      fr.onloadend = () => {
        const img = new Image()
        img.onload = () => $('#imgPreview').append(img)
        img.src = fr.result as string
        this.image.base64 = String(fr.result)
        this.image.size = blob.size
        this.image.classList = 'img-fluid center-block'
      }
    }
  }

  async postUpload(): Promise<void> {
    if(this.image.base64.length < 30) return
    const { title, privacy, image } = this
    const { base64, size } = image
    await axios.post(`${ this.url }/screens/save`, {
      base64, size, title, privacy,
    }).then((response) => {
      const screen = response.data
      if(screen.redirect) this.$router.push('home')
      if(screen.path) {
        const url = screen.private === true ? 'http://localhost:8080/fr' : 'http://localhost:8080/en'
        if(screen.private === true) window.location.href = `${url}/s${screen.shareKey}`
        else this.$router.push({
          path: `/${ translate.getCurrentLocale }/s${screen.shareKey}`,
          params: { title: screen.title, views: screen.views, path: screen.path },
        })
      }
    }).catch(reason => {
      this.$notify({
        title: '⚠️ Unable to upload your screenshot :',
        text: reason,
        type: 'error',
      })
    })
  }
}
</script>