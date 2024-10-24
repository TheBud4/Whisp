import { Message } from "./Message";
import { User } from "./User";
import { Notification } from "./Notification";

export class Chat {
  id: number;
  messages: Message[];
  participants: User[];

  constructor(id: number, participants: User[], messages: Message[] = []) {
    this.id = id;
    this.participants = participants;
    this.messages = messages;
  }

  sendMessage(message: Message): void {
    this.messages.push(message);
    console.log(`Message sent: ${message.text}`);
  }

  sendNotification(message: Message): void {
    this.participants.forEach((user) => {
      const notification = new Notification();
      notification.send(user, message);
    });
  }
}
