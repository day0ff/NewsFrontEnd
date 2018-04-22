import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../../entity/comment';
import {AuthService} from '../../../service/auth.service';
import {CommentsService} from '../../../service/comments.service';

@Component({
  selector: 'app-news-comments',
  templateUrl: './news-comments.component.html',
  styleUrls: ['./news-comments.component.css']
})
export class NewsCommentsComponent implements OnInit {
  @Input() comment: Comment;
  hasPrivilege: boolean;

  getPrivilege() {
    this.hasPrivilege = this.authService.hasRoles(['ADMIN', 'EDITOR']);
  }

  deleteComment() {
    this.commentsService.deleteComment(this.comment.id)
      .subscribe(() => document.location.reload());
  }

  constructor(private authService: AuthService, private commentsService: CommentsService) {
  }

  ngOnInit() {
    this.getPrivilege();
  }

}
