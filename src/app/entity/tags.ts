/**
 * The class entity to store information about news Tags.
 */
export class Tags {
  /**
   * property - of Tags id
   */
  id: number;
  /**
   * property - of Tags tag
   */
  tag: string;
  /**
   * Creates a new default object Tags
   * @constructor
   */
  constructor(id: number, tag: string) {
    this.id = id;
    this.tag = tag;
  }
}
