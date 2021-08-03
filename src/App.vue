<template>
  <v-app>
    <navbar-item />

    <v-main>
      <main-page/>
    </v-main>

    <chat-window />

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

@Component({
  components: {
    MainPage,
    LoginModal,
    NavbarItem,
    FooterItem,
    ChatWindow,
  },
})

export default class App extends Vue {
  name = 'App'
}
</script>

<style lang='scss'>
</style>
