import {Component, Input, OnInit} from '@angular/core';
import {CommentsService} from '../../service/comments.service';

@Component({
  selector: 'app-comments-count',
  templateUrl: './comments-count.component.html',
  styleUrls: ['./comments-count.component.css']
})
/**
 * The class implements component management CommentsCountComponent.
 */
export class CommentsCountComponent implements OnInit {
  /**
   * property - input comment id from parent component
   */
  @Input() id: number;
  /**
   * property - of person comments count
   */
  count: number;
  /**
   * The method request for person comments count.
   */
  getCount(): void {
    this.commentsService.getCommentsPersonCount(this.id).subscribe(count => {
      this.count = count;
    });
  }
  /**
   * Creates a new default object CommentsCountComponent
   * @constructor
   */
  constructor(private commentsService: CommentsService) { }
  /**
   * Initializes the CommentsCountComponent class after it is created.
   */
  ngOnInit() {
    this.getCount();
  }

}
