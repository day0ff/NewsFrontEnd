import {Person} from './person';
/**
 * The class entity to store information about News.
 */
export class News {
  /**
   * property - of News id
   */
  id: number;
  /**
   * property - of News reference to Persons
   */
  person: Person;
  /**
   * property - of News title
   */
  title: string;
  /**
   * property - of News article
   */
  article: string;
  /**
   * property - of News post
   */
  post: string;
  /**
   * property - of News image
   */
  image: string;
  /**
   * property - of News publication date
   */
  publicationDate: any;
  /**
   * property - of News views
   */
  views: number;
  /**
   * property - of News publication
   */
  published: boolean;
  /**
   * Creates a new default object News
   * @constructor
   */
  constructor(id: number, person: Person, title: string, article: string, post: string,
              image: string, publication_date: any, views: number, published: boolean) {
    this.id = id;
    this.person = person;
    this.title = title;
    this.article = article;
    this.post = post;
    this.image = image;
    this.publicationDate = publication_date;
    this.views = views;
    this.published = published;
  }
}
