import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
/**
 * The class implements modal component management DeleteModalComponent
 */
export class DeleteModalComponent implements OnInit {
  /**
   * property - input name from parent component
   */
  @Input() name: string;
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
   * Creates a new default object DeleteModalComponent
   * @constructor
   */
  constructor() { }

  ngOnInit() {
  }

}
