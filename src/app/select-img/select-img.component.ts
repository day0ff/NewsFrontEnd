import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../entity/group';

@Component({
  selector: 'app-select-img',
  templateUrl: './select-img.component.html',
  styleUrls: ['./select-img.component.css']
})
export class SelectImgComponent implements OnInit {
  @Input() groups: Group[];
  @Input() img: string;
  @Output() imgChange = new EventEmitter<string>();
  selected: number;

  onSelected() {
    this.img = this.groups.find(group => group.id === this.selected).name;
    this.imgChange.emit(this.img);
  }

  constructor() {
  }

  ngOnInit() {
    this.selected = this.groups.find(group => group.name === this.img).id;
  }

}
