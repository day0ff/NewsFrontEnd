import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../service/news.service';
import {News} from '../../entity/news';
import {Tag} from '@angular/compiler/src/i18n/serializers/xml_helper';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  news: News[];
  tag: string;

  getNewsByTag() {
    this.tag = this.route.snapshot.paramMap.get('tag');
    this.newsService.getNewsByTagTitle(this.tag).subscribe(news => {
      this.news = news.sort((n1, n2) => n1.id - n2.id);
    });
  }

  constructor(private newsService: NewsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getNewsByTag();
  }

}
