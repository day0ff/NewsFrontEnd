import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
/**
 * The class implements modal component management AddTagComponent.
 */
export class AddTagComponent implements OnInit {
  /**
   * property - input name of Tag from parent component
   */
  @Input() name: string;
  /**
   * property - output event to parent
   */
  @Output() eventEmitterAdd: EventEmitter<string> = new EventEmitter();
  /**
   * The method returns control to the parent
   */
  eventExecuteAdd(): void {
    this.eventEmitterAdd.emit();
  }
  /**
   * Creates a new default object AddTagComponent
   * @constructor
   */
  constructor() { }

  ngOnInit() {
  }

}
