<template>
  <div class="container" style="margin-top:50px;">
    <div class="row justify-content-center">
      <div class="card border-info mb-3 align-self-center" style="width:30rem">
        <div class="card-header">{{ $t('pages.register.title') }}</div>
        <div class="card-body">
          <p class="lead">{{ $t('pages.register.card-lead') }}</p>
          <div v-if="errors.length" class="col-12" id="flashContainer">
            <div v-for="error in errors" class="alert alert-danger">{{ error }}</div>
          </div>
          <form @submit="checkForm" class="form-horizontal">
            <div class="form-group">
              <label for="email">{{ $t('pages.register.form_email_label') }}</label>
              <input class="form-control input-md" required
                     id="email"
                     v-model="email"
                     type="email"
                     name="email">
              <small id="emailHelp" class="form-text text-muted">{{ $t('pages.register.form_email_muted') }}</small>
            </div>
            <div class="form-group">
              <label for="password">{{ $t('pages.register.form_password_label') }}</label>
              <input class="form-control input-md" required v-bind:class="{'is-invalid': passwordRules.global.bad, 'is-valid': passwordRules.global.good }"
                     id="password"
                     @keypress="validatePassword"
                     @keyup="validatePassword"
                     @keydown="validatePassword"
                     @click="validatePassword"
                     @mouseout="validatePassword"
                     v-on:keyup.r.delete="validatePassword"
                     v-model="password"
                     type="password"
                     name="password">
            </div>
            <div class="card bg-light border mb-2 passwordStrength" v-show="passwordStrengthTips">
              <div class="card-body">
                <p class="mb-2">
                  {{ $t('pages.register.passwordRequirements.title') }}
                </p>
                <p class="small text-muted mb-2">
                  {{ $t('pages.register.passwordRequirements.subtitle') }}
                </p>
                <ul class="small text-muted pl-4 mb-0">
                  <li id="length" v-bind:class="{
                    'bad-rule': passwordRules.chars.bad,
                    'good-rule': passwordRules.chars.good }"
                  >
                    {{ $tc('pages.register.passwordRequirements.chars', 8) }}
                  </li>
                  <li id="uppercase" v-bind:class="{
                    'bad-rule': passwordRules.upper.bad,
                    'good-rule': passwordRules.upper.good }">
                    {{ $tc('pages.register.passwordRequirements.upper', 1) }}
                  </li>
                  <li id="symbol" v-bind:class="{
                    'bad-rule': passwordRules.symbol.bad,
                    'good-rule': passwordRules.symbol.good }">
                    {{ $t('pages.register.passwordRequirements.symbol') }}
                  </li>
                  <li id="number" v-bind:class="{
                    'bad-rule': passwordRules.num.bad,
                    'good-rule': passwordRules.num.good }">
                    {{ $tc('pages.register.passwordRequirements.num', 1) }}
                  </li>
                </ul>
              </div>
            </div>
            <button type="submit" id="validateForm" class="btn btn-info btn-loader float-md-right"
                    data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i>"
                    @click="checkForm"
                    :disabled="!buttonEnabled"
            >
              {{ $t('pages.register.form_submit_btn') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import $ from 'jquery'

@Component
export default class Register extends Vue {
  private email: string = ''
  private password: string = ''

  public buttonEnabled: boolean = false
  public passwordStrengthTips: boolean = false
  public passwordRulesRegex: Array<{
    pattern: string
    target: string
  }> = [{
    pattern: '[A-Z]',
    target: 'upper',
  }, {
    pattern: '.{8,}',
    target: 'chars',
  }, {
    pattern: '[0-9]',
    target: 'num',
  }, {
    pattern: '[!@#$%^&*]',
    target: 'symbol',
  }]
  public passwordRules = {
    chars: {
      bad: true,
      good: false,
    },
    upper: {
      bad: true,
      good: false,
    },
    symbol: {
      bad: true,
      good: false,
    },
    num: {
      bad: true,
      good: false,
    },
    global: {
      bad: true,
      good: false,
    }
  }
  public errors: Array<string> = []

  checkForm() {
    this.errors = []
    if (this.email && this.password) return true
    if (!this.email) this.errors.push('Email required.')
    if (!this.password) this.errors.push('Password required.')
    this.validatePassword()
  }

  validatePassword() {
    type Rule = 'chars' | 'upper' | 'symbol' | 'num' | 'global'
    this.passwordStrengthTips = true

    this.passwordRulesRegex.forEach(rule => {
      const target = rule.target as Rule
      if (new RegExp(rule.pattern).test(this.password)) {
        this.passwordRules[target].good = true
        this.passwordRules[target].bad = false
      } else {
        this.passwordRules[target].good = false
        this.passwordRules[target].bad = true
      }
    })
    this.updateInputClass()
  }

  updateInputClass() {
    if ($('ul').find('.bad-rule').length === 0) {
      this.buttonEnabled = true
      this.passwordRules.global.good = true
      this.passwordRules.global.bad = false
    } else {
      this.buttonEnabled = false
      this.passwordRules.global.bad = true
      this.passwordRules.global.good = false
    }
  }
}
</script>