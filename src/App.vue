<template>
  <v-app>
    <navbar-item />

    <v-main>
      <main-page/>
    </v-main>

    <chat-window v-if="userService.isLoggedIn" />

    <footer-item />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MainPage from './components/MainPage.vue';
import LoginModal from './components/LoginModal.vue';
import NavbarItem from './components/NavbarItem.vue';
import FooterItem from './components/FooterItem.vue';
import ChatWindow from './components/ChatWindow.vue';
import UserService from './services/user.service';

const userService = new UserService();

@Component({
  components: {
    MainPage,
    LoginModal,
    NavbarItem,
    FooterItem,
    ChatWindow,
  },
  provide: {
    $userService: userService,
  },
})

export default class App extends Vue {
  name = 'App'

  userService = userService
}
</script>

<style lang='scss'>
</style>
