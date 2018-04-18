import {User} from './user';

export class Person {
  id: number;
  user: User;
  firstName: string;
  lastName: string;
  screenName: string;
  image: string;

  constructor(id: number, user_id: User, first_name: string, last_name: string, screen_name: string, image: string) {
    this.id = id;
    this.user = user_id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.screenName = screen_name;
    this.image = image;
  }
}
