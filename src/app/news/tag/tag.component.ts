import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../service/news.service';
import {News} from '../../entity/news';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
/**
 * The class implements component management TagComponent.
 */
export class TagComponent implements OnInit {
  /**
   * property - of news
   */
  news: News[];
  /**
   * property - of tag
   */
  tag: string;
  /**
   * The method request news by tag from route snapshot.
   */
  getNewsByTag(): void {
    this.tag = this.route.snapshot.paramMap.get('tag');
    this.newsService.getNewsByTagTitle(this.tag).subscribe(news => {
      this.news = news.sort((n1, n2) => n1.id - n2.id);
    });
  }
  /**
   * Creates a new default object TagComponent
   * @constructor
   */
  constructor(private newsService: NewsService,
              private route: ActivatedRoute) {
  }
  /**
   * Initializes the TagComponent class after it is created.
   */
  ngOnInit() {
    this.getNewsByTag();
  }

}
