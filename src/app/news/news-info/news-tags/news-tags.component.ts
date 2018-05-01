import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from '../../../service/news.service';
import {Tags} from '../../../entity/tags';

@Component({
  selector: 'app-news-tags',
  templateUrl: './news-tags.component.html',
  styleUrls: ['./news-tags.component.css']
})
/**
 * The class implements component management NewsTagsComponent.
 */
export class NewsTagsComponent implements OnInit {
  /**
   * property - input news id from parent component
   */
  @Input() newsId: number;
  /**
   * property - of news tags array
   */
  tags: Tags[];
  /**
   * The method request for news tags.
   */
  getNewsTags() {
    this.newsService.getTagsByNewsId(this.newsId)
      .subscribe(tags => this.tags = tags);
  }
  /**
   * Creates a new default object NewsTagsComponent
   * @constructor
   */
  constructor(private newsService: NewsService) {
  }
  /**
   * Initializes the NewsTagsComponent class after it is created.
   */
  ngOnInit() {
    this.getNewsTags();
  }

}
