<template>
  <v-card
    class="login-card rounded-xl"
  >
    <v-card-text>
      <v-img
        src="@/assets/logo.svg"
        class="logo"
        height="35"
        width="78"
      />
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="login-form"
      >
        <div class="text-h3 white--text font-weight-medium">
          Welcome back
        </div>
        <div class="text-h5 white--text font-weight-light mt-2">
          To continue log in to Sample
        </div>
        <v-text-field
          v-model="username"
          :counter="10"
          label="Username"
          class="text-body-1 mt-7"
          dense
          dark
          height="43"
          hide-details
          prepend-inner-icon="mdi-account"
          outlined
          required
          rounded
          single-line
        />

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          class="text-body-1 mt-7"
          dense
          dark
          height="43"
          hide-details
          prepend-inner-icon="mdi-lock"
          outlined
          required
          rounded
          single-line
        />

        <v-btn
          :disabled="!valid"
          class="login-button text-h5 text-none white--text mt-5"
          x-large
          block
          rounded
          @click="login"
        >
          Log in
        </v-btn>

        <v-divider class="mt-7 mb-5"></v-divider>

        <div class="dont-text font-weight-thin grey--text text--lighten-2">
          Don't have an account? <a href="#" class="white--text font-weight-light">Sign up</a>
        </div>
        <div class="dont-text font-weight-thin grey--text text--lighten-2">
          Forgot password? <a href="#" class="white--text font-weight-light">Reset password</a>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})

export default class LoginModal extends Vue {
  name = 'LoginModal'

  valid = true

  username = ''

  usernameRules = [
    (v: string): boolean|string => !!v || 'Name is required',
    (v: string): boolean|string => (v && v.length <= 10) || 'Name must be less than 10 characters',
  ]

  logged = false

  password = ''

  passwordRules = [
    (v: string): boolean|string => !!v || 'Password is required',
    (v: string): boolean|string => (v && v.length >= 6) || 'Password must be more than 6 characters',
  ]

  login(): void {
    this.logged = true;
    console.log('logged');
  }
}
</script>

<style lang="scss" scoped>
.login-card {
  position: relative;
  background: linear-gradient(110.07deg, rgba(255, 255, 255, 0.7) -2.94%,
  rgba(132, 157, 184, 0.675391) 29.55%, rgba(8, 58, 113, 0.637) 112.6%,
  rgba(3, 23, 45, 0.602) 112.6%);
  .logo {
    position: absolute;
    top: 50px;
    left: 50px;
  }
  .login-form {
    padding-top: 85px;
    margin-left: 243px;
    width: 450px;
    .login-button {
      background: linear-gradient(90deg, rgba(118, 163, 212, 0.75) 0%,
      rgba(102, 175, 216, 0.75) 45.54%, rgba(15, 72, 69, 0.75) 98.25%);
    }
    .dont-text {
      line-height: 32px;
      font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
      a {
        text-decoration: none;
      }
    }
  }
}
</style>
