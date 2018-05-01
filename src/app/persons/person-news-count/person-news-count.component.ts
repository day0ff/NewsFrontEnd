import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from '../../service/news.service';

@Component({
  selector: 'app-person-news-count',
  templateUrl: './person-news-count.component.html',
  styleUrls: ['./person-news-count.component.css']
})
/**
 * The class implements component management PersonNewsCountComponent.
 */
export class PersonNewsCountComponent implements OnInit {
  /**
   * property - input person comments id on the news from parent component
   */
  @Input() id: number;
  /**
   * property - of person comments count on the news
   */
  count: number;
  /**
   * The method request for person comments count  on the news.
   */
  getCount(): void {
    this.newsService.getNewsPersonCommentsCount(this.id).subscribe(count => {
      this.count = count;
    });
  }
  /**
   * Creates a new default object PersonNewsCountComponent
   * @constructor
   */
  constructor(private newsService: NewsService) {
  }
  /**
   * Initializes the PersonNewsCountComponent class after it is created.
   */
  ngOnInit() {
    this.getCount();
  }

}
