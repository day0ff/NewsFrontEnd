import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from '../../service/news.service';
import {News} from '../../entity/news';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
/**
 * The class implements component management CategoryComponent. Show news by categories.
 */
export class CategoryComponent implements OnInit {
  /**
   * property - of News Array
   */
  news: News[];
  /**
   * property - input category from parent component
   */
  @Input() category: string;
  /**
   * property - input limit from parent component
   */
  @Input() limit: number;
  /**
   * The method requests news by category from route snapshot.
   */
  getNewsByCategory(): void {
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
  /**
   * Creates a new default object CategoryComponent
   * @constructor
   */
  constructor(private newsService: NewsService,
              private route: ActivatedRoute) {
  }
  /**
   * Initializes the CategoryComponent class after it is created.
   */
  ngOnInit() {
    this.getNewsByCategory();
  }

}
