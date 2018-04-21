import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../service/news.service';
import {News} from '../../entity/news';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {
  news: News[];

  getNewsByTag() {
    this.newsService.getNewsByTag(4).subscribe(news => {
      this.news = news.sort((n1, n2) => n1.id - n2.id);
    });
  }

  getNewsByTagTitle() {
    this.newsService.getNewsByTagTitle('world').subscribe(news => {
      this.news = news.sort((n1, n2) => n2.views - n1.views);
    });
  }

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.getNewsByTagTitle();
  }

}
