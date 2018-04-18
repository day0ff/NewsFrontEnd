import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
export class RegistrationModalComponent implements OnInit {
  @Input() kind: string;
  @Input() name: string;
  @Output()
  eventEmitter: EventEmitter<string> = new EventEmitter();

  eventExecute() {
    this.eventEmitter.emit();
  }

  constructor() {
  }

  ngOnInit() {
  }
}
