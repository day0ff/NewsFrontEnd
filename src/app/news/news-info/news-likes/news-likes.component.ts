import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {NewsService} from '../../../service/news.service';

@Component({
  selector: 'app-news-likes',
  templateUrl: './news-likes.component.html',
  styleUrls: ['./news-likes.component.css']
})
export class NewsLikesComponent implements OnInit {
  @Input() newsId: number;
  likes: number;

  getNewsLikes() {
    this.newsService.getNewsLikesCount(this.newsId)
      .subscribe(likes => {
        this.likes = likes;
      });
  }

  makeLike() {
    const userId = this.authService.getPerson().user.id;
    console.log(this.newsId + ' / ' + userId);
    this.newsService.isNewsLikePerson(this.newsId, userId)
      .subscribe(isLike => {
        console.log('isLike = ' + isLike);
        if (isLike === 0) {
          console.log('Add ' + this.newsId + ' / ' + userId);
          this.newsService.saveLike(this.newsId, userId)
            .subscribe(() => this.likes++);
        } else {
          console.log('Del ' + this.newsId + ' / ' + userId);
          this.newsService.deleteLike(this.newsId, userId)
            .subscribe(() => this.likes--);
        }
      });
  }

  constructor(private authService: AuthService, private newsService: NewsService) {
  }

  ngOnInit() {
    this.getNewsLikes();
  }

}
