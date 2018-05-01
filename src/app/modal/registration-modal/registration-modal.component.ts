import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../entity/user';
import {Person} from '../../entity/person';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
/**
 * The class implements modal component management RegistrationModalComponent.
 * Contains registration methods.
 */
export class RegistrationModalComponent implements OnInit {
  /**
   * property - input User from parent component
   */
  @Input() user: User;
  /**
   * property - input Person from parent component
   */
  @Input() person: Person;
  /**
   * property - output event to parent
   */
  @Output() eventEmitter: EventEmitter<string> = new EventEmitter();
  /**
   * The method returns control to the parent
   */
  eventExecute(): void {
    this.eventEmitter.emit();
  }
  /**
   * The method validates user fields for null and empty.
   */
  checkFields(): void {
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
  /**
   * The method error elements.
   */
  showError(): void {
    document.getElementById('messageError').style.display = 'block';
    document.getElementById('messageUser').style.display = 'none';
    document.getElementById('submit').style.display = 'none';
  }
  /**
   * The method registration elements.
   */
  showRegister(): void {
    document.getElementById('messageError').style.display = 'none';
    document.getElementById('messageUser').style.display = 'block';
    document.getElementById('submit').style.display = 'block';
  }
  /**
   * Creates a new default object RegistrationModalComponent
   * @constructor
   */
  constructor(private userService: UserService) {
  }
  /**
   * Initializes the RegistrationModalComponent class after it is created.
   */
  ngOnInit() {
    this.checkFields();
  }
}
