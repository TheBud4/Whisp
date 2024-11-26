export class ConversationMember {
  id: string;
  conversationId: string;
  userId: string;
  joinedAt: Date;

  constructor(
    id: string,
    conversationId: string,
    userId: string,
    joinedAt: Date = new Date()
  ) {
    this.id = id;
    this.conversationId = conversationId;
    this.userId = userId;
    this.joinedAt = joinedAt;
  }
}
