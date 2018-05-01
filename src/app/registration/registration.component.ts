import {Component, OnInit} from '@angular/core';
import {Person} from '../entity/person';
import {User} from '../entity/user';
import {Group} from '../entity/group';
import {Img} from '../entity/img';
import {UserService} from '../service/user.service';
import {PersonService} from '../service/person.service';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
/**
 * The class implements component management RegistrationComponent.
 */
export class RegistrationComponent implements OnInit {
  /**
   * property - of user entity
   */
  user: User = {
    id: null,
    userName: null,
    password: null,
    enabled: null,
  };
  /**
   * property - of person entity
   */
  person: Person = {
    id: null,
    user: this.user,
    firstName: null,
    lastName: null,
    screenName: null,
    image: Img.imgUser[2].name
  };
  /**
   * property - of user images group array
   */
  imgGroups: Group [] = Img.imgUser;
  /**
   * property - of current person privilege
   */
  hasPrivilege: boolean;
  /**
   * The method requests current person privileges.
   */
  getPrivilege() {
    this.hasPrivilege = this.authService.hasRoles(['ADMIN']);
  }
  /**
   * The method register new user.
   */
  registerUser(): void {
    this.userService.saveUserByNameAndPassword(this.user.userName, this.user.password)
      .subscribe(() => {
          this.personService.savePersonByUserNameAndPassword(this.user.userName, this.user.password, this.person)
            .subscribe(person => this.showWelcome(),
              error => console.log('Error to save Person'));
        },
        error => this.showError());
  }
  /**
   * The method show error message.
   */
  showError(): void {
    document.getElementById('userError').style.display = 'block';
    setTimeout(() => {
      document.getElementById('userError').style.display = 'none';
    }, 5000);
  }
  /**
   * The method show welcome message for new user.
   */
  showWelcome(): void {
    document.getElementById('welcome').style.display = 'block';
    if (this.hasPrivilege) {
      setTimeout(() => {
        this.router.navigateByUrl('/persons');
      }, 2500);
    } else {
      setTimeout(() => {
        this.router.navigateByUrl('/Новости');
        document.getElementById('loginButton').click();
      }, 2500);
    }
  }
  /**
   * Creates a new default object RegistrationComponent
   * @constructor
   */
  constructor(private userService: UserService,
              private personService: PersonService,
              private authService: AuthService,
              private router: Router) {
  }
  /**
   * Initializes the RegistrationComponent class after it is created.
   */
  ngOnInit() {
    this.getPrivilege();
  }

}
