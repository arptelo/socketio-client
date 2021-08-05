<template>
  <v-app-bar
    app
    color="white"
    class="px-10"
    height="100"
    elevate-on-scroll
  >
    <div class="d-flex align-center">
      <v-img
        src="@/assets/logo.svg"
        contain
        height="100px"
      />
    </div>

    <v-spacer></v-spacer>

    <div
      v-for="menuItem in navigationMenu"
      :key="menuItem"
      v-text="menuItem"
      class="navigation-menu-item mr-16"
    />

    <v-dialog
      v-if="!userService.isLoggedIn"
      transition="dialog-top-transition"
      width="922"
      overlay-opacity="0.8"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          outlined
          color="rgb(118, 163, 212)"
          class="text-none text-body-1"
        >
          Log in
        </v-btn>
      </template>
      <template #default="dialog">
        <login-modal @click="dialog.value = false" />
      </template>
    </v-dialog>
    <v-btn
      v-else
      icon
      @click="userService.logout()"
    >
      <v-icon>
        mdi-export
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import UserService from '@/services/user.service';
import { Vue, Component, Inject } from 'vue-property-decorator';
import LoginModal from './LoginModal.vue';

@Component({
  components: {
    LoginModal,
  },
})

export default class App extends Vue {
  name = 'NavbatItem'

  @Inject('$userService')
  userService!: UserService

  navigationMenu = ['Home', 'About Us', 'Info', 'Contact']
}
</script>

<style lang='scss' scoped>
</style>
