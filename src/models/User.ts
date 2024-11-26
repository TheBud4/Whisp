export class User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  createdAt: Date;

  constructor(
    id: string,
    username: string,
    email: string,
    passwordHash: string,
    avatarUrl?: string,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.avatarUrl = avatarUrl;
    this.createdAt = createdAt;
  }
}
