import {Person} from './person';
import {News} from './news';

export class Comment {
  id: number;
  person: Person;
  news: News;
  comment: string;

  constructor(id: number, person: Person, news: News, comment: string) {
    this.id = id;
    this.person = person;
    this.news = news;
    this.comment = comment;
  }
}
