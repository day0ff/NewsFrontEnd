import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from '../../service/news.service';

@Component({
  selector: 'app-news-comments-count',
  templateUrl: './news-comments-count.component.html',
  styleUrls: ['./news-comments-count.component.css']
})
export class NewsCommentsCountComponent implements OnInit {
  @Input() id: number;
  count: number;

  getCount() {
    this.newsService.getNewsCommentsCount(this.id).subscribe(count => {
      this.count = count;
    });
  }

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.getCount();
  }

}
