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
export class PersonInfoComponent implements OnInit {
  person: Person;
  user: User;
  imgGroups: Group [] = Img.imgUser;

  getPerson(): void {
    this.person = this.authService.getPerson();
    this.user = this.authService.getPerson().user;
  }

  updateUser() {
    this.userService.updateUserByNameAndPassword(this.user.userName, this.user.password,
      this.person.user.userName, this.person.user.password)
      .subscribe(user => {
          this.person.user = user;
          this.user = user;
          this.authService.savePerson(this.person);
        },
        error => console.log('Error to update User'));
  }

  updatePerson() {
    this.personService.updatePersonByUserNameAndPassword(this.person.user.userName, this.person.user.password, this.person)
      .subscribe(person => {
          this.person = person;
          this.authService.savePerson(this.person);
        },
        error => console.log('Error to update Person'));
  }

  deletePerson() {
    this.personService.deletePerson(this.person.user.userName, this.person.user.password, this.person.id)
      .subscribe(() => {
        console.log('Delete Person');
        document.getElementById('logOut').click();
        this.router.navigateByUrl('/Новости');
      }, () => console.log('Can not delete Person'));
  }

  goBack(): void {
    this.location.back();
  }

  constructor(private authService: AuthService,
              private userService: UserService,
              private personService: PersonService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.getPerson();
  }

}
