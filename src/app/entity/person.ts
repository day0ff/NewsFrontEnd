import {User} from './user';
/**
 * The class entity to store information about Persons.
 */
export class Person {
  /**
   * property - of Persons id
   */
  id: number;
  /**
   * property - of Persons reference to Users
   */
  user: User;
  /**
   * property - of Persons First Name
   */
  firstName: string;
  /**
   * property - of Persons Last Name
   */
  lastName: string;
  /**
   * property - of Persons Screen Name
   */
  screenName: string;
  /**
   * property - of Persons Image
   */
  image: string;
  /**
   * Creates a new default object Persons
   * @constructor
   */
  constructor(id: number, user_id: User, first_name: string, last_name: string, screen_name: string, image: string) {
    this.id = id;
    this.user = user_id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.screenName = screen_name;
    this.image = image;
  }
}
