<template>
  <div class="chat-window-container">
    <div
      class="message-box d-flex flex-column"
      :style="{'max-height': boxVisibility}"
    >
      <div
        class="message-box-header"
        :style="{'max-height': headerHeight}"
      />
      <div
        class="message-box-content flex-grow-1"
      />
      <div
        class="message-box-editor"
        :style="{'visibility': editorVisibility}"
      >
        <v-textarea
          class="text-body-2 pr-16 pb-10"
          solo
          flat
          :height="72"
          hide-details
          no-resize
          placeholder="Type your message here..."
        />
        <v-img
          src="@/assets/send.svg"
          class="send-icon"
        />
        <div class="action-buttons-container px-1">
          <v-btn
            v-for="icon in icons"
            :key="icon"
            icon
            fab
            small
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <div
      class="icon-container d-flex align-center"
      :style="{bottom: iconOffset}"
      @click="toggleDisplay"
    >
      <v-img
        src="@/assets/chat.svg"
        contain
        height="34"
        class="chat-icon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})

export default class ChatWindow extends Vue {
  name = 'ChatWindow'

  boxVisibility = '0';

  iconOffset = '20px';

  headerHeight = '0';

  editorVisibility = 'hidden'

  icons = ['mdi-calendar-blank', 'mdi-map', 'mdi-star', 'mdi-close-circle']

  toggleDisplay(): void {
    this.boxVisibility = this.boxVisibility === '0' ? '600px' : '0';
    this.iconOffset = this.iconOffset === '20px' ? '505px' : '20px';
    this.headerHeight = this.headerHeight === '0' ? '60px' : '0';
    this.editorVisibility = this.editorVisibility === 'hidden' ? 'visible' : 'hidden';
  }
}
</script>

<style lang='scss' scoped>
.chat-window-container {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1;
  .message-box {
    position: relative;
    width: 450px;
    height: 600px;
    background-color: #FAFAFA;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
    transition: max-height 0.25s ease-in;
    .message-box-header {
      height: 60px;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.75) 0.02%,
      rgba(241, 245, 251, 0.75) 0.03%, rgba(175, 195, 225, 0.75) 51.17%,
      rgba(118, 163, 212, 0.75) 98.22%);
      backdrop-filter: blur(40px);
      transition: max-height 0.25s ease-in;
    }
    .message-box-content {
      background-color: #F0F0F0;
    }
    .message-box-editor {
      position: relative;
      height: 110px;
      background-color: #FFF;
      .send-icon {
        position: absolute;
        right: 30px;
        bottom: 38px;
      }
    }
    .action-buttons-container {
      position: absolute;
      bottom: 2px;
    }
  }
  .icon-container {
    background: linear-gradient(180deg, #4E7FB4 0%, rgba(118, 163, 212, 0.26) 100%);
    height: 75px;
    width: 75px;
    border-radius: 50%;
    position: absolute;
    right: 20px;
    bottom: 20px;
    cursor: pointer;
    transition: bottom 0.25s ease-in;
  }
}
</style>
