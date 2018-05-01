/**
 * The class entity to store information about persons Roles.
 */
export class Roles {
  /**
   * property - of Roles id
   */
  id: number;
  /**
   * property - of Roles role
   */
  role: string;
  /**
   * Creates a new default object Roles
   * @constructor
   */
  constructor(id: number, role: string) {
    this.id = id;
    this.role = role;
  }
}
