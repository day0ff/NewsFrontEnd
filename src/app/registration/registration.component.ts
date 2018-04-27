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
export class RegistrationComponent implements OnInit {
  user: User = {
    id: null,
    userName: null,
    password: null,
    enabled: null,
  };

  person: Person = {
    id: null,
    user: this.user,
    firstName: null,
    lastName: null,
    screenName: null,
    image: Img.imgUser[2].name
  };

  imgGroups: Group [] = Img.imgUser;

  hasPrivilege: boolean;

  getPrivilege() {
    this.hasPrivilege = this.authService.hasRoles(['ADMIN']);
  }

  registerUser() {
    this.userService.saveUserByNameAndPassword(this.user.userName, this.user.password)
      .subscribe(() => {
          this.personService.savePersonByUserNameAndPassword(this.user.userName, this.user.password, this.person)
            .subscribe(person => this.showWelcome(),
              error => console.log('Error to save Person'));
        },
        error => this.showError());
  }

  showError() {
    document.getElementById('userError').style.display = 'block';
    setTimeout(() => {
      document.getElementById('userError').style.display = 'none';
    }, 5000);
  }

  showWelcome() {
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

  constructor(private userService: UserService,
              private personService: PersonService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.getPrivilege();
  }

}
