import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {PersonService} from '../../service/person.service';
import {Person} from '../../entity/person';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
/**
 * The class implements modal component management LoginModalComponent.
 * Contains sig in control methods.
 */
export class LoginModalComponent implements OnInit {
  /**
   * property - output event to parent
   */
  @Output() eventEmitter = new EventEmitter();
  /**
   * property - of Person object
   */
  person: Person = {
    id: null,
    user: {
      id: null,
      userName: null,
      password: null,
      enabled: null
    },
    firstName: null,
    lastName: null,
    screenName: null,
    image: null
  };
  /**
   * property - of editor privilege
   */
  hasPrivilegeEditor: boolean;
  /**
   * property - of admin privilege
   */
  hasPrivilegeAdmin: boolean;
  /**
   * property - of person roles
   */
  roles: string [] = [];
  /**
   * The method returns control to the parent after receiving access token.
   */
  eventExecute(): void {
    console.log(this.person.user.userName + ' / ' + this.person.user.password);
    this.authService.obtainAccessToken(this.person.user.userName, this.person.user.password)
      .subscribe(
        data => {
          this.authService.saveToken(data);
          this.personInfo();
          this.eventEmitter.emit();
        },
        error => this.loginError());
  }
  /**
   * The method show login error for short time.
   */
  loginError(): void {
    document.getElementById('loginError').style.display = 'block';
    setTimeout(() => {
      document.getElementById('loginError').style.display = 'none';
    }, 5000);
  }
  /**
   * The method requests person and user  information.
   */
  personInfo(): void {
    this.personService.getPersonByNameAndPassword(this.person.user.userName, this.person.user.password).subscribe(
      person => {
        this.person = person;
        this.authService.savePerson(this.person);
        this.showLogout();
      });
    this.userService.getUserRoles(this.person.user.userName, this.person.user.password).subscribe(
      roles => {
        this.roles = roles;
        console.log('Roles: ' + JSON.stringify(this.roles));
        this.authService.saveRoles(this.roles);
      });
  }
  /**
   * The method log out user from site.
   */
  logOut(): void {
    this.authService.logout();
    this.showLogin();
  }
  /**
   * The method show login elements.
   */
  showLogin(): void {
    document.getElementById('loginButton').style.display = 'block';
    document.getElementById('logOutButton').style.display = 'none';
  }
  /**
   * The method show log out elements and log out user from site after the expiration of token.
   */
  showLogout(): void {
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('logOutButton').style.display = 'block';
    setTimeout(() => {
      this.logOut();
    }, this.authService.getExpireIn());
  }
  /**
   * The method validates user privileges.
   */
  hasPrivilege(): void {
    console.log('Roles ' + this.roles.toString());
    this.hasPrivilegeEditor = ['EDITOR'].some(userRole => this.roles.indexOf(userRole) >= 0);
    console.log('Login privilege Editor = ' + this.hasPrivilegeEditor);
    this.hasPrivilegeAdmin = ['ADMIN'].some(userRole => this.roles.indexOf(userRole) >= 0);
    console.log('Login privilege Admin = ' + this.hasPrivilegeAdmin);
  }
  /**
   * Creates a new default object LoginModalComponent
   * @constructor
   */
  constructor(private authService: AuthService, private personService: PersonService, private userService: UserService) {
  }
  /**
   * Initializes the LoginModalComponent class after it is created.
   */
  ngOnInit() {
    if (localStorage.getItem('person') === undefined) {
      this.logOut();
    } else {
      this.person = this.authService.getPerson();
      this.roles = this.authService.getRoles();
      this.hasPrivilege();
      if (this.authService.isExpired()) {
        this.showLogin();
      } else {
        if (this.person.id !== null) {
          this.showLogout();
          console.log('showLogout');
        } else {
          this.showLogin();
          console.log('showLogin');
        }
      }
    }
  }

}
