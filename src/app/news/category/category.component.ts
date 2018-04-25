import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from '../../service/news.service';
import {News} from '../../entity/news';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  news: News[];
  @Input() category: string;
  @Input() limit: number;

  getNewsByCategory() {
    if (this.category === undefined) {
      this.category = this.route.snapshot.paramMap.get('category');
      this.newsService.getNewsByCategory(this.category).subscribe(news => {
        // this.news = news.sort((n1, n2) => n2.views - n1.views);
        this.news = news;
      });
    } else {
      this.newsService.getNewsByCategoryLimit(this.category, this.limit).subscribe(news => {
        this.news = news;
      });
    }
  }

  constructor(private newsService: NewsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getNewsByCategory();
  }

}
