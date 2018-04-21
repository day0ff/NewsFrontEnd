import {Person} from './person';
import {News} from './news';

export class Like {
  id: number;
  news: News;
  person: Person;


  constructor(id: number, news_id: News, person_id: Person) {
    this.id = id;
    this.news = news_id;
    this.person = person_id;
  }
}
