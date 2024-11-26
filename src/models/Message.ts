export class Message {
  id: string;
  conversationId: string;
  senderId: string;
  content?: string;
  fileUrl?: string;
  createdAt: Date;

  constructor(
    id: string,
    conversationId: string,
    senderId: string,
    content?: string,
    fileUrl?: string,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.conversationId = conversationId;
    this.senderId = senderId;
    this.content = content;
    this.fileUrl = fileUrl;
    this.createdAt = createdAt;
  }
}
