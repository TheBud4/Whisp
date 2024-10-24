export class Message {
  id: number;
  senderId: number;
  recipientId: number;
  text: string;
  sentAt: Date;
  isRead: boolean;

  constructor(
    id: number,
    senderId: number,
    recipientId: number,
    text: string,
    sentAt: Date,
    isRead: boolean = false
  ) {
    this.id = id;
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.text = text;
    this.sentAt = sentAt;
    this.isRead = isRead;
  }
}
