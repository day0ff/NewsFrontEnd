/**
 * The class entity to store information about news Categories.
 */
export class Categories {
  /**
   * property - of Category id
   */
  id: number;
  /**
   * property - of Category name
   */
  category: string;
  /**
   * Creates a new default object Categories
   * @constructor
   */
  constructor(id: number, category: string) {
    this.id = id;
    this.category = category;
  }
}
