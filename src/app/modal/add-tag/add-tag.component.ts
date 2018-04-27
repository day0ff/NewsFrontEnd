import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {
  @Input() name: string;
  @Output() eventEmitterAdd: EventEmitter<string> = new EventEmitter();

  eventExecuteAdd() {
    this.eventEmitterAdd.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
