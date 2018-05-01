import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {NewsService} from '../../../service/news.service';

@Component({
  selector: 'app-news-likes',
  templateUrl: './news-likes.component.html',
  styleUrls: ['./news-likes.component.css']
})
/**
 * The class implements component management NewsLikesComponent.
 */
export class NewsLikesComponent implements OnInit {
  /**
   * property - input news id from parent component
   */
  @Input() newsId: number;
  /**
   * property - of news likes count
   */
  likes: number;
  /**
   * The method request for news likes count.
   */
  getNewsLikes(): void {
    this.newsService.getNewsLikesCount(this.newsId)
      .subscribe(likes => {
        this.likes = likes;
      });
  }
  /**
   * The method save person like.
   */
  makeLike(): void {
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
  /**
   * Creates a new default object NewsLikesComponent
   * @constructor
   */
  constructor(private authService: AuthService, private newsService: NewsService) {
  }
  /**
   * Initializes the NewsLikesComponent class after it is created.
   */
  ngOnInit() {
    this.getNewsLikes();
  }

}
