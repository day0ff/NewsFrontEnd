import { Component, OnInit } from '@angular/core';
import {News} from '../entity/news';
import {NewsService} from '../service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
/**
 * The class implements component management NewsComponent.
 */
export class NewsComponent implements OnInit {
  /**
   * property - of news
   */
  news: News[];
  /**
   * The method request news.
   */
  getNews(): void {
    this.newsService.getNews()
      .subscribe(news => {
        this.news = news.sort((n1, n2) => n1.id - n2.id);
      });
  }
  /**
   * Creates a new default object NewsComponent
   * @constructor
   */
  constructor(private newsService: NewsService) {
  }
  /**
   * Initializes the NewsComponent class after it is created.
   */
  ngOnInit() {
    this.getNews();
  }

}
