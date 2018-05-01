import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
/**
 * The class implements modal component management UpdateModalComponent.
 */
export class UpdateModalComponent implements OnInit {
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
   * Creates a new default object UpdateModalComponent
   * @constructor
   */
  constructor() { }

  ngOnInit() {
  }

}
