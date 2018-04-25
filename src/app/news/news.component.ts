import { Component, OnInit } from '@angular/core';
import {News} from '../entity/news';
import {NewsService} from '../service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news: News[];

  getNews(): void {
    this.newsService.getNews()
      .subscribe(news => {
        this.news = news.sort((n1, n2) => n1.id - n2.id);
      });
  }

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.getNews();
  }

}
