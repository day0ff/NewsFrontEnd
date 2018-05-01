import {Component, OnInit} from '@angular/core';
import {Person} from '../../entity/person';
import {Img} from '../../entity/img';
import {Group} from '../../entity/group';
import {AuthService} from '../../service/auth.service';
import {UserService} from '../../service/user.service';
import {PersonService} from '../../service/person.service';
import {User} from '../../entity/user';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
/**
 * The class implements component management PersonInfoComponent.
 * Contains methods that create, update, delete current person information.
 */
export class PersonInfoComponent implements OnInit {
  /**
   * property - of person
   */
  person: Person;
  /**
   * property - of persons news
   */
  user: User;
  /**
   * property - of user images group array
   */
  imgGroups: Group [] = Img.imgUser;
  /**
   * The method requests current person and user.
   */
  getPerson(): void {
    this.person = this.authService.getPerson();
    this.user = this.authService.getPerson().user;
  }
  /**
   * The method update current user.
   */
  updateUser(): void {
    this.userService.updateUserByNameAndPassword(this.user.userName, this.user.password,
      this.person.user.userName, this.person.user.password)
      .subscribe(user => {
          this.person.user = user;
          this.user = user;
          this.authService.savePerson(this.person);
        },
        error => console.log('Error to update User'));
  }
  /**
   * The method update current person.
   */
  updatePerson(): void {
    this.personService.updatePersonByUserNameAndPassword(this.person.user.userName, this.person.user.password, this.person)
      .subscribe(person => {
          this.person = person;
          this.authService.savePerson(this.person);
        },
        error => console.log('Error to update Person'));
  }
  /**
   * The method delete current person.
   */
  deletePerson(): void {
    this.personService.deletePerson(this.person.user.userName, this.person.user.password, this.person.id)
      .subscribe(() => {
        console.log('Delete Person');
        document.getElementById('logOut').click();
        this.router.navigateByUrl('/Новости');
      }, () => console.log('Can not delete Person'));
  }
  /**
   * The method return to previous page.
   */
  goBack(): void {
    this.location.back();
  }
  /**
   * Creates a new default object PersonInfoComponent
   * @constructor
   */
  constructor(private authService: AuthService,
              private userService: UserService,
              private personService: PersonService,
              private router: Router,
              private location: Location) {
  }
  /**
   * Initializes the PersonInfoComponent class after it is created.
   */
  ngOnInit() {
    this.getPerson();
  }

}
