import { Message } from "./Message";
import { User } from "./User";

export class Notification {
  send(user: User, message: Message): void {
    console.log(`Notification sent to ${user.name}: ${message.text}`);
  }
}
