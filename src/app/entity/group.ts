/**
 * The class entity to store information about Group.
 */
export class Group {
  /**
   * property - of Group id
   */
  id: number;
  /**
   * property - of Group name
   */
  name: string;
  /**
   * Creates a new default object Group
   * @constructor
   */
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
