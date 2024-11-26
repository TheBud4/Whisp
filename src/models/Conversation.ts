export class Conversation {
  id: string;
  name?: string;
  isGroup: boolean;
  createdAt: Date;

  constructor(
    id: string,
    name?: string,
    isGroup: boolean = false,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.isGroup = isGroup;
    this.createdAt = createdAt;
  }
}
