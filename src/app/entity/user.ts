/**
 * The class entity to store information about Users.
 */
export class User {
  /**
   * property - of Users id
   */
  id: number;
  /**
   * property - of Users user name
   */
  userName: string;
  /**
   * property - of Users password
   */
  password: string;
  /**
   * property - of Users enabled
   */
  enabled: boolean;
  /**
   * Creates a new default object Users
   * @constructor
   */
  constructor(id: number, user_name: string, password: string, enabled: boolean) {
    this.id = id;
    this.userName = user_name;
    this.password = password;
    this.enabled = enabled;
  }
}
