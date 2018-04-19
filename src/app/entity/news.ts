import {User} from './user';
import {Person} from './person';

export class News {
  id: number;
  author: Person;
  title: string;
  article: string;
  post: string;
  image: string;
  publicationDate: any;
  views: number;
  likes: number;
  published: boolean;


  constructor(id: number, author: Person, title: string,
              article: string, post: string, image: string,
              publication_date: any, views: number,
              likes: number, published: boolean) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.article = article;
    this.post = post;
    this.image = image;
    this.publicationDate = publication_date;
    this.views = views;
    this.likes = likes;
    this.published = published;
  }
}
