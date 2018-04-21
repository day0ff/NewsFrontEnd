import {Person} from './person';

export class News {
  id: number;
  person: Person;
  title: string;
  article: string;
  post: string;
  image: string;
  publicationDate: any;
  views: number;
  published: boolean;

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
