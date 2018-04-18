import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.css']
})
export class SaveModalComponent implements OnInit {
  @Input() name: string;
  @Output() eventEmitter: EventEmitter<string> = new EventEmitter();

  eventExecute() {
    this.eventEmitter.emit();
  }
  constructor() { }

  ngOnInit() {
  }

}
