<template>
  <v-footer
    color="white"
    class="d-flex flex-column"
  >
    <v-divider class="divider mx-8 my-8"></v-divider>

    <v-card
      flat
      tile
      class="black--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 black--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="black--text">
        {{ new Date().getFullYear() }} — <strong>Sample</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})

export default class FooterItem extends Vue {
  name = 'FooterItem'

  icons = [
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
  ]
}
</script>

<style lang='scss' scoped>
.divider {
  width: calc(100% - 64px);
}
</style>
