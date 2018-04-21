import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from '../../../service/news.service';

@Component({
  selector: 'app-news-tags',
  templateUrl: './news-tags.component.html',
  styleUrls: ['./news-tags.component.css']
})
export class NewsTagsComponent implements OnInit {
  @Input() newsId: number;
  tags: string [];

  getNewsTags() {
    this.newsService.getTagsByNewsId(this.newsId)
      .subscribe(tags => this.tags = tags);
  }

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.getNewsTags();
  }

}
