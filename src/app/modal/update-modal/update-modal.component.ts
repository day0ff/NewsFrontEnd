import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {
  @Input() kind: string;
  @Input() name: string;
  @Output()
  eventEmitter: EventEmitter<string> = new EventEmitter();

  eventExecute() {
    this.eventEmitter.emit();
  }
  constructor() { }

  ngOnInit() {
  }

}
