<template>
  <v-app>
    <v-app-bar
      app
      color="rgb(18, 22, 120)"
      dark
      class="px-10"
      elevate-on-scroll
    >
      <div class="d-flex align-center">
        <v-icon x-large >
          mdi-robot
        </v-icon>
        <div class="ml-6 text-h4 font-weight-thin">
          SupPORT
        </div>
      </div>

      <v-spacer></v-spacer>

      <v-dialog
        v-if="1"
        transition="dialog-top-transition"
        max-width="600"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            text
            depressed
            v-bind="attrs"
            v-on="on"
            class="text-none font-weight-light"
          >
            Login
          </v-btn>
        </template>
        <template #default="dialog">
          <login-modal @click="dialog.value = false" />
        </template>
      </v-dialog>
      <v-btn
        v-else
        icon
      >
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <main-page/>
    </v-main>
    <v-footer
      app
      absolute
    >
      <v-col
        class="text-center text-caption py-0"
        cols="12"
      >
        2021
      </v-col>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MainPage from './components/MainPage.vue';
import LoginModal from './components/LoginModal.vue';

@Component({
  components: {
    MainPage,
    LoginModal,
  },
})

export default class App extends Vue {
  name = 'App'
}
</script>

<style lang='scss'>
</style>
