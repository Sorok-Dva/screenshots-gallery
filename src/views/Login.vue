<template>
  <div class="container" style="margin-top:150px;">
    <div class="row justify-content-center">
      <div class="card border-success mb-3 align-self-center" style="width:30rem">
        <div class="card-header">{{ $t('pages.login.title_card_header') }}</div>
        <div class="card-body">
          <div v-if="errors.length" class="col-12" id="flashContainer">
            <div v-for="error in errors" class="alert alert-danger">{{ error }}</div>
          </div>
          <form @submit="checkForm" class="form-horizontal">
            <div class="form-group">
              <label for="email">{{ $t('pages.login.form_email_label') }}</label>
              <input class="form-control input-md" required
                  id="email"
                  v-model="email"
                  type="email"
                  name="email">
            </div>
              <div class="form-group">
                <label for="password">{{ $t('pages.login.form_password_label') }}</label>
                <input class="form-control input-md" required
                       id="password"
                       v-model="password"
                       type="password"
                       name="password">
              </div>
            <button @click="checkForm" class="btn btn-success btn-loader float-md-right" type="submit"
                    data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i>">
              {{ $t('pages.login.form_submit_btn') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  private email : string | null = null
  private password : string | null = null
  public errors: Array<string> = []

  checkForm() {
    this.errors = []
    if (this.email && this.password) return true
    if (!this.email) this.errors.push('Email required.')
    if (!this.password) this.errors.push('Password required.')

    this.clickButton()
  }

  clickButton() {
   $('button[type="submit"]').html(`data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i>"`)
  }
}
</script>