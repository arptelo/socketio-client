<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">
      Login
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="username"
          :counter="10"
          :rules="usernameRules"
          label="Name"
          required
        />

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="E-mail"
          required
        />

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="login"
        >
          Login
        </v-btn>
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
  ]

  login(): void {
    this.logged = true;
    console.log('logged');
  }
}
</script>
