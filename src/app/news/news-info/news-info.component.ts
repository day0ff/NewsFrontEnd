import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../entity/news';

@Component({
  selector: 'app-news-info',
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.css']
})
/**
 * The class implements component management NewsInfoComponent.
 */
export class NewsInfoComponent implements OnInit {
  /**
   * property - input news from parent component
   */
  @Input() news: News;
  /**
   * property - input url from parent component
   */
  @Input() url: string;
  /**
   * Creates a new default object NewsInfoComponent
   * @constructor
   */
  constructor() { }

  ngOnInit() {
  }

}
