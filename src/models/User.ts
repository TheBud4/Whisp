export class User{
  id: string;
  username?: string;
  email: string;
  password: string;
  avatarUrl?: string;
  createdAt: Date;

  constructor(
    id: string,
    email: string,
    password: string,
    username?: string,
    avatarUrl?: string,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatarUrl = avatarUrl;
    this.createdAt = createdAt;
  }
}
