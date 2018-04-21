import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  @Input() name: string;
  @Output() eventEmitter: EventEmitter<string> = new EventEmitter();

  eventExecute() {
    this.eventEmitter.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
