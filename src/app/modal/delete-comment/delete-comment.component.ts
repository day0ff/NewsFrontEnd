import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.css']
})
/**
 * The class implements modal component management DeleteCommentComponent
 */
export class DeleteCommentComponent implements OnInit {
  /**
   * property - input name from parent component
   */
  @Input() name: string;
  /**
   * property - output event to parent
   */
  @Output() eventEmitterComment: EventEmitter<any> = new EventEmitter();
  /**
   * The method returns control to the parent
   */
  eventExecuteComment(): void {
    this.eventEmitterComment.emit();
  }
  /**
   * Creates a new default object DeleteCommentComponent
   * @constructor
   */
  constructor() { }

  ngOnInit() {
  }

}
