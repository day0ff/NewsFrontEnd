import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../entity/group';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.css']
})
/**
 * The class implements component management SelectTypeComponent.
 */
export class SelectTypeComponent implements OnInit {
  /**
   * property - input types groups from parent component
   */
  @Input() groups: Group[];
  /**
   * property - input types from parent component
   */
  @Input() types: Group[];
  /**
   * property - output event to parent
   */
  @Output() typesChange = new EventEmitter<Group[]>();
  /**
   * The method returns control and add type to the parent group types.
   */
  addType(id: number): void {
    if (this.types.find(type => type.id === id) === undefined) {
      this.types.push(this.groups.find(group => group.id === id));
      this.typesChange.emit(this.types);
    }
  }
  /**
   * The method returns control and remove type to from the parent group types.
   */
  removeType(id: number): void {
    this.types = this.types.filter(type => type.id !== id);
    this.typesChange.emit(this.types);
  }
  /**
   * Creates a new default object SelectTypeComponent
   * @constructor
   */
  constructor() {
  }

  ngOnInit() {
  }
}
