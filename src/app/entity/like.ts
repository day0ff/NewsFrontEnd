import {Person} from './person';
import {News} from './news';
/**
 * The class entity to store information about news Likes.
 */
export class Like {
  /**
   * property - of Likes id
   */
  id: number;
  /**
   * property - of Likes reference to News
   */
  news: News;
  /**
   * property - of Likes reference to Persons
   */
  person: Person;
  /**
   * Creates a new default object Likes
   * @constructor
   */
  constructor(id: number, news_id: News, person_id: Person) {
    this.id = id;
    this.news = news_id;
    this.person = person_id;
  }
}
