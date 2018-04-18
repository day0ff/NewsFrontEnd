export class User {
  id: number;
  userName: string;
  password: string;
  enabled: boolean;

  constructor(id: number, user_name: string, password: string, enabled: boolean) {
    this.id = id;
    this.userName = user_name;
    this.password = password;
    this.enabled = enabled;
  }
}
