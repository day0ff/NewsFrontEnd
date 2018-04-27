import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.css']
})
export class DeleteCommentComponent implements OnInit {
  @Input() name: string;
  @Output() eventEmitterComment: EventEmitter<string> = new EventEmitter();

  eventExecuteComment() {
    this.eventEmitterComment.emit();
  }
  constructor() { }

  ngOnInit() {
  }

}
