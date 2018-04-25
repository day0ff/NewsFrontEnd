import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../entity/group';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.css']
})
export class SelectTypeComponent implements OnInit {
  @Input() groups: Group[];
  @Input() types: Group[];
  @Output() typesChange = new EventEmitter<Group[]>();

  addType(id: number) {
    if (this.types.find(type => type.id === id) === undefined) {
      this.types.push(this.groups.find(group => group.id === id));
      this.typesChange.emit(this.types);
    }
  }

  removeType(id: number) {
    this.types = this.types.filter(type => type.id !== id);
    this.typesChange.emit(this.types);
  }

  constructor() {
  }

  ngOnInit() {
  }
}
