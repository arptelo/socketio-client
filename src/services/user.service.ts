import MessageService from './message.service';

const messageService = MessageService.getInstance();

export default class UserService {
  private isUserLoggedIn = false;

  username!: string;

  get isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  login(username: string): void {
    this.username = username;
    this.isUserLoggedIn = true;
    messageService.connect();
  }

  logout(): void {
    this.username = '';
    this.isUserLoggedIn = false;
  }
}
