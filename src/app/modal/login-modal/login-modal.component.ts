import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {PersonService} from '../../service/person.service';
import {Person} from '../../entity/person';
import {User} from '../../entity/user';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter();
  person: Person = {
    id: null,
    user: {
      id: null,
      userName: 'elvis',
      password: '1234',
      enabled: null
    },
    firstName: null,
    lastName: null,
    screenName: null,
    image: null
  };
  hasPrivilegeEditor: boolean;
  hasPrivilegeAdmin: boolean;
  roles: string [] = [];

  eventExecute() {
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

  loginError() {
    document.getElementById('loginError').style.display = 'block';
    setTimeout(() => {
      document.getElementById('loginError').style.display = 'none';
    }, 5000);
  }

  personInfo() {
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

  logOut() {
    this.authService.logout();
    this.showLogin();
  }

  showLogin() {
    document.getElementById('loginButton').style.display = 'block';
    document.getElementById('logOutButton').style.display = 'none';
  }

  showLogout() {
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('logOutButton').style.display = 'block';
    setTimeout(() => {
      this.logOut();
    }, this.authService.getExpireIn());
  }

  hasPrivilege(): void {
    console.log(this.roles.toString());
    this.hasPrivilegeEditor = ['EDITOR'].some(userRole => this.roles.indexOf(userRole) >= 0);
    console.log('Login privilege Editor = ' + this.hasPrivilegeEditor);
    this.hasPrivilegeAdmin = ['ADMIN'].some(userRole => this.roles.indexOf(userRole) >= 0);
    console.log('Login privilege Admin = ' + this.hasPrivilegeAdmin);
  }

  constructor(private authService: AuthService, private personService: PersonService, private userService: UserService) {
  }

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
