import {Component, Input, OnInit} from '@angular/core';
import {CommentsService} from '../../service/comments.service';

@Component({
  selector: 'app-comments-count',
  templateUrl: './comments-count.component.html',
  styleUrls: ['./comments-count.component.css']
})
export class CommentsCountComponent implements OnInit {
  @Input() id: number;
  count: number;

  getCount() {
    this.commentsService.getCommentsPersonCount(this.id).subscribe(count => {
      this.count = count;
    });
  }

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.getCount();
  }

}
