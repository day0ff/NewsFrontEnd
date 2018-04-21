import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../entity/news';

@Component({
  selector: 'app-news-info',
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.css']
})
export class NewsInfoComponent implements OnInit {
  @Input() news: News;
  @Input() url: string;

  constructor() { }

  ngOnInit() {
  }

}
