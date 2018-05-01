import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from '../../../service/news.service';

@Component({
  selector: 'app-news-comments-count',
  templateUrl: './news-comments-count.component.html',
  styleUrls: ['./news-comments-count.component.css']
})
/**
 * The class implements component management NewsCommentsCountComponent.
 */
export class NewsCommentsCountComponent implements OnInit {
  /**
   * property - input news id from parent component
   */
  @Input() newsId: number;
  /**
   * property - of news comments count
   */
  count: number;
  /**
   * The method request for news comments count.
   */
  getCount(): void {
    this.newsService.getNewsCommentsCount(this.newsId).subscribe(count => {
      this.count = count;
    });
  }
  /**
   * Creates a new default object NewsCommentsCountComponent
   * @constructor
   */
  constructor(private newsService: NewsService) {
  }
  /**
   * Initializes the NewsCommentsCountComponent class after it is created.
   */
  ngOnInit() {
    this.getCount();
  }

}
