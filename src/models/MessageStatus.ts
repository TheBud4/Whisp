export type MessageStatusType = "sent" | "delivered" | "read";

export class MessageStatus {
  id: string;
  messageId: string;
  userId: string;
  status: MessageStatusType;
  updatedAt: Date;

  constructor(
    id: string,
    messageId: string,
    userId: string,
    status: MessageStatusType,
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.messageId = messageId;
    this.userId = userId;
    this.status = status;
    this.updatedAt = updatedAt;
  }
}
