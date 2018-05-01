import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../entity/group';

@Component({
  selector: 'app-select-img',
  templateUrl: './select-img.component.html',
  styleUrls: ['./select-img.component.css']
})
/**
 * The class implements component management SelectImgComponent.
 */
export class SelectImgComponent implements OnInit {
  /**
   * property - input image groups from parent component
   */
  @Input() groups: Group[];
  /**
   * property - input image from parent component
   */
  @Input() img: string;
  /**
   * property - output event to parent
   */
  @Output() imgChange = new EventEmitter<string>();
  /**
   * property - of selected image
   */
  selected: number;
  /**
   * The method returns control and image to the parent.
   */
  onSelected(): void {
    this.img = this.groups.find(group => group.id === this.selected).name;
    this.imgChange.emit(this.img);
  }
  /**
   * Creates a new default object SelectImgComponent
   * @constructor
   */
  constructor() {
  }
  /**
   * Initializes the SelectImgComponent class after it is created.
   */
  ngOnInit() {
    this.selected = this.groups.find(group => group.name === this.img).id;
  }

}
