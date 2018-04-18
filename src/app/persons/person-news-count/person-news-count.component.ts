import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from '../../service/news.service';

@Component({
  selector: 'app-person-news-count',
  templateUrl: './person-news-count.component.html',
  styleUrls: ['./person-news-count.component.css']
})
export class PersonNewsCountComponent implements OnInit {
  @Input() id: number;
  count: number;

  getCount() {
    this.newsService.getNewsPersonCommentsCount(this.id).subscribe(count => {
      this.count = count;
    });
  }

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.getCount();
  }

}
