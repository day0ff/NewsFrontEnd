import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../entity/user';
import {Person} from '../../entity/person';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
export class RegistrationModalComponent implements OnInit {
  @Input() user: User;
  @Input() person: Person;
  @Output() eventEmitter: EventEmitter<string> = new EventEmitter();


  eventExecute() {
    this.eventEmitter.emit();
  }

  checkFields() {
    let notVerify = false;
    console.log('checkFields');
    if (this.user.userName === null || this.user.userName === '') {
      notVerify = true;
      console.log('userName');
    }
    if (this.user.password === null || this.user.userName === '') {
      notVerify = true;
      console.log('password');
    }
    if (this.person.firstName === null || this.user.userName === '') {
      notVerify = true;
      console.log('firstName');
    }
    if (this.person.lastName === null || this.user.userName === '') {
      notVerify = true;
      console.log('lastName');
    }
    if (this.person.screenName === null || this.user.userName === '') {
      notVerify = true;
      console.log('screenName');
    }
    if (notVerify) {
      this.showError();
    } else {
      this.showRegister();
    }
  }

  showError() {
    document.getElementById('messageError').style.display = 'block';
    document.getElementById('messageUser').style.display = 'none';
    document.getElementById('submit').style.display = 'none';
  }

  showRegister() {
    document.getElementById('messageError').style.display = 'none';
    document.getElementById('messageUser').style.display = 'block';
    document.getElementById('submit').style.display = 'block';
  }

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.checkFields();
  }
}
