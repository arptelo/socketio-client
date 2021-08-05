<template>
  <div class="chat-window-container">
    <v-overlay
      :value="overlay"
      absolute
    >
      Your conversation ended.
    </v-overlay>
    <div
      class="message-box d-flex flex-column"
      :style="{'max-height': boxVisibility}"
    >
      <div
        class="message-box-header"
        :style="{'max-height': headerHeight}"
      />
      <div class="d-flex flex-column message-box-content flex-grow-1">
        <div
          v-for="(message, index) in messages"
          :key="'message' + index"
          class="d-flex flex-column"
        >
          <div v-if="message.command">
            <div class="text-center ma-2 mr-7 pa-1 pl-3 white rounded-lg">
              This is where you can find it:
            </div>
            <v-img
              :src="`https://www.mapquestapi.com/staticmap/v5/map?locations=${message.command.data.lat},${message.command.data.lng}&size=200,200&key=${apiKey}`"
              height="200"
              class="ma-2"
              contain
            />
          </div>
          <div
            v-else
            class="talk-bubble tri-right ma-2"
            :class="message.author === userService.username
              ? 'left-top white ml-6'
              : 'right-top color_chat_bubble mr-8 align-self-end'"
          >
            <div class="talktext pa-3 text-body-2">
              <p>
                <span class="font-weight-bold">
                  {{ message.author }}:
                </span>
                <br />
                <span class="font-weight-light">
                  {{message.message }}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div
          v-for="(command, index) in commands"
          :key="'command' + index"
        >
          <template v-if="!command.isComplete">
            <div v-if="command.command.type === 'date'">
              <div class="text-center ma-2 mr-7 pa-1 pl-3 white rounded-lg">
                Please choose a date:
              </div>
              <v-btn
                v-for="(i, j) in Array(5)"
                :key="'date' + j"
                class="ma-2 text-none text-caption"
                width="70px"
                @click="fullfillCommandAndSendMessage(index,
                  days[(new Date(command.command.data).getDay() + j) % 7])"
              >
                {{ days[(new Date(command.command.data).getDay() + j) % 7] }}
              </v-btn>
            </div>
            <div v-else-if="command.command.type === 'rate'">
              <div class="text-center ma-2 mr-7 pa-1 pl-3 white rounded-lg">
                Please rate your experience:
              </div>
              <v-btn
                v-for="(i, j) in Array(command.command.data[1] - command.command.data[0] + 1)"
                :key="'rate' + j"
                class="ma-2 text-none text-caption"
                width="70px"
                @click="fullfillCommandAndSendMessage(index, command.command.data[0] + j)"
              >
                {{ command.command.data[0] + j }}
              </v-btn>
            </div>
            <div v-else-if="command.command.type === 'complete'">
              <div class="text-center ma-2 mr-7 pa-1 pl-3 white rounded-lg">
                Do you want to close this conversation?:
              </div>
              <v-btn
                v-for="(i, j) in Array(2)"
                :key="'complete' + j"
                class="ma-2 text-none text-caption"
                width="70px"
                @click="fullfillCommandAndSendMessage(index, ['Yes', 'No'][j])"
              >
                {{ ['Yes', 'No'][j] }}
              </v-btn>
            </div>
          </template>
        </div>
      </div>
      <div
        class="message-box-editor"
        :style="{'visibility': editorVisibility}"
      >
        <v-textarea
          v-model="currentMessage"
          class="text-body-2 pr-16 pb-10"
          solo
          flat
          :height="72"
          hide-details
          no-resize
          placeholder="Type your message here..."
        />
        <v-btn
          class="send-icon"
          icon
          large
          fab
          :disabled="!this.currentMessage"
          title="Send message"
          @click="sendMessage('message')"
        >
          <v-icon
            large
            color="rgb(118, 163, 212)"
          >
            mdi-send
          </v-icon>
        </v-btn>
        <div class="action-buttons-container px-1">
          <v-btn
            icon
            fab
            small
            title="Send command"
            @click="sendMessage('command')"
          >
            <v-icon>mdi-apple-keyboard-command</v-icon>
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
import UserService from '@/services/user.service';
import { Vue, Component, Inject } from 'vue-property-decorator';
import MessageService from '../services/message.service';

@Component({})

export default class ChatWindow extends Vue {
  name = 'ChatWindow'

  overlay = false

  boxVisibility = '0';

  iconOffset = '20px';

  headerHeight = '0';

  editorVisibility = 'hidden'

  currentMessage = ''

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  apiKey = process.env.VUE_APP_STATIC_MAP_API_KEY

  @Inject('$userService')
  userService!: UserService

  messageService = MessageService.getInstance()

  get messages(): Array<{ author: string; message: string;}> {
    return this.messageService.messages;
  }

  get commands(): Array<{ isComplete:boolean, author: string; command:
    { type: 'date'; data: string }|{ type: 'map'; data: { lat: number; lng: number; } }|
    { type: 'rate'; data: Array<number> }|{ type: 'complete'; data: Array<string> };}> {
    return this.messageService.commands;
  }

  // mounted(): void {
  //   this.messageService.getMessage()
  //     .subscribe((message: { message: string; author: string; }) => {
  //     console.log('message', message);
  //   });
  // }

  toggleDisplay(): void {
    this.boxVisibility = this.boxVisibility === '0' ? '600px' : '0';
    this.iconOffset = this.iconOffset === '20px' ? '505px' : '20px';
    this.headerHeight = this.headerHeight === '0' ? '60px' : '0';
    this.editorVisibility = this.editorVisibility === 'hidden' ? 'visible' : 'hidden';
    if (this.boxVisibility === '600px' && this.overlay) setTimeout(this.toggleDisplay, 2000);
  }

  sendMessage(type = 'message', body = ''): void {
    if (type === 'command' || body || this.currentMessage) {
      this.messageService.sendMessage(
        { author: this.userService.username, message: body || this.currentMessage },
        type,
      );
      this.currentMessage = '';
    }
  }

  fullfillCommandAndSendMessage(commandIndex: number, widgetMessage: string): void {
    this.messageService.commands[commandIndex].isComplete = true;
    const commandType = this.messageService.commands[commandIndex].command.type;
    if (commandType !== 'complete') this.messageService.respondedCommands.push(commandType);
    this.sendMessage('message', widgetMessage);
    if (widgetMessage === 'Yes') {
      this.overlay = true;
      setTimeout(this.toggleDisplay, 2000);
    }
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
      overflow: auto;
      .align-self-end {
        align-self: flex-end;
      }
      .talktext {
        text-align: left;
        line-height: 1.5em;
      }
      .talk-bubble {
        display: inline-block;
        position: relative;
        max-width: 350px;
        height: auto;
      }
      .tri-right.left-top:after{
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        left: -20px;
        right: auto;
        top: 0px;
        bottom: auto;
        border: 22px solid;
        border-color: white transparent transparent transparent;
      }
      .tri-right.right-top:after{
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        left: auto;
        right: -20px;
        top: 0px;
        bottom: auto;
        border: 20px solid;
        border-color: #c8d8ea transparent transparent transparent;
      }
      .talktext p {
        -webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
        span {
          word-wrap: break-word;
        }
      }
    }
    .message-box-editor {
      position: relative;
      height: 110px;
      background-color: #FFF;
      .send-icon {
        position: absolute;
        right: 30px;
        bottom: 30px;
        transform: rotate(-45deg);
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
