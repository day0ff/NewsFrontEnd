import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../../entity/comment';
import {AuthService} from '../../../service/auth.service';
import {CommentsService} from '../../../service/comments.service';

@Component({
  selector: 'app-news-comments',
  templateUrl: './news-comments.component.html',
  styleUrls: ['./news-comments.component.css']
})
/**
 * The class implements component management NewsCommentsComponent.
 */
export class NewsCommentsComponent implements OnInit {
  /**
   * property - input comment from parent component
   */
  @Input() comment: Comment;
  /**
   * property - of user privilege
   */
  hasPrivilege: boolean;
  /**
   * The method requests person privileges.
   */
  getPrivilege(): void {
    this.hasPrivilege = this.authService.hasRoles(['ADMIN', 'EDITOR']);
  }
  /**
   * The method delete comment.
   */
  deleteComment(): void {
    this.commentsService.deleteComment(this.comment.id)
      .subscribe(() => document.location.reload());
  }
  /**
   * Creates a new default object NewsCommentsComponent
   * @constructor
   */
  constructor(private authService: AuthService, private commentsService: CommentsService) {
  }
  /**
   * Initializes the NewsCommentsComponent class after it is created.
   */
  ngOnInit() {
    this.getPrivilege();
  }

}
