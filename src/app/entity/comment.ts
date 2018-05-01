import {Person} from './person';
import {News} from './news';
/**
 * The class entity to store information about news Comments.
 */
export class Comment {
  /**
   * property - of Comment id
   */
  id: number;
  /**
   * property - of Comment reference to Persons
   */
  person: Person;
  /**
   * property - of Comment reference to News
   */
  news: News;
  /**
   * property - of Comment comment
   */
  comment: string;
  /**
   * Creates a new default object Comments
   * @constructor
   */
  constructor(id: number, person: Person, news: News, comment: string) {
    this.id = id;
    this.person = person;
    this.news = news;
    this.comment = comment;
  }
}
