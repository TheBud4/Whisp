

export class User {
  id: number;
  name: string;
  foto: string;
  email: string;
  online: boolean;
  contacts: User[];

  constructor(
    id: number,
    name: string,
    foto: string,
    email: string,
    online: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.foto = foto;
    this.email = email;
    this.online = online;
    this.contacts = [];
  }

  editar(name: string, foto: string, email: string) {
    this.name = name;
    this.foto = foto;
    this.email = email;
  }
}
