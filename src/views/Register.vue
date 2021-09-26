<script src="../../../../Downloads/pasteurscreens-1.1/components/user/user.controller.js"></script>
<template>
  <div class="container" style="margin-top:150px;">
<!--    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>-->
    <div class="row justify-content-center">
      <div class="card border-info mb-3 align-self-center" style="width:30rem">
        <div class="card-header">{{ $t(pages.register.title) }}</div>
        <div class="card-body">
          <p class="lead">{{ $t(pages.register.card-lead) }}</p>

          <form @submit="checkForm" action="/register" method="post" class="form-horizontal">
            <div class="form-group">
              <label for="email">{{ $t(pages.register.form_email_label) }}</label>
              <input class="form-control input-md" required
                  id="email"
                  v-model="email"
                  type="email"
                  name="email">
              <small id="emailHelp" class="form-text text-muted">{{ $t(pages.register.form_email_muted) }}</small>
            </div>
              <div class="form-group">
                <label for="password">{{ $t(pages.register.form_password_label) }}</label>
                <input class="form-control input-md" required
                       id="password"
                       v-model="password"
                       type="password"
                       name="password">
              </div>
            <input
                type="submit"
                value="Submit"
            >
            </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Register extends Vue {
  @Prop() private email : string | null = null
  @Prop() private password : string | null = null
  @Prop() public errors: Array<string> = []

  checkForm() {
    if (this.email && this.password) return true
    if (!this.email) this.errors.push('Email required.')
    if (!this.password) this.errors.push('Password required.')
  }
}
</script>