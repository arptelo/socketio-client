/* eslint-disable no-useless-constructor */
/* eslint-disable @typescript-eslint/no-empty-function */

import { io } from 'socket.io-client';
// import { Subject, Observable } from 'rxjs';

const URL = 'https://demo-chat-server.on.ag/';

export default class MessageService {
  private static instance: MessageService

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  }

  private constructor() {}

  // subject: Subject<{ message: string; author: string; }> = new Subject()

  socket = io(URL, { autoConnect: false })
    .on('connect_error', (err) => {
      console.log(err.message);
    })
    .on('message', (response) => {
      this.messages.push(response);
      // this.subject.next(response);
    })
    .on('command', (response) => {
      console.log(response);
      this.commands.push({ isComplete: false, ...response });
    });

  messages: Array<{ author: string; message: string;}> = []

  commands: Array<{ isComplete:boolean, author: string; command:
    { type: 'date'; data: string }|{ type: 'map'; data: { lat: number; lng: number; } }|
    { type: 'rate'; data: Array<number> }|{ type: 'complete'; data: Array<string> };}> = []

  connect(): void {
    this.socket.connect();
  }

  sendMessage(content: { author: string, message: string }, type = 'message'): void {
    this.socket.emit(type, content);
    if (type === 'message') this.messages.push(content);
  }

  // getMessage(): Observable<{ message: string; author: string; }> {
  //   return this.subject.asObservable();
  // }
}
