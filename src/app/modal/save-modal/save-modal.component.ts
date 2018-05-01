import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.css']
})
/**
 * The class implements modal component management SaveModalComponent.
 */
export class SaveModalComponent implements OnInit {
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
   * Creates a new default object SaveModalComponent
   * @constructor
   */
  constructor() { }

  ngOnInit() {
  }

}
