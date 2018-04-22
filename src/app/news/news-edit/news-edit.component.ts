import { Component, OnInit } from '@angular/core';
import {Comment} from '../../entity/comment';
import {Person} from '../../entity/person';
import {News} from '../../entity/news';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../service/news.service';
import {PersonService} from '../../service/person.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  news: News;
  tags: string [];
  comments: Comment[];
  hasPrivilege: boolean;
  comment = null;
  person: Person;

  getPrivilege() {
    this.hasPrivilege = this.authService.hasRoles(['ADMIN', 'EDITOR', 'USER']);
  }

  getNews() {
    const id = this.route.snapshot.paramMap.get('newsId');
    this.newsService.incrementNewsViews(+id).subscribe();
    this.newsService.getNewsById(+id)
      .subscribe(news => {
        this.news = news;
        console.log('Get news id = ' + this.news.id);
      });
  }

  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private authService: AuthService,
              private personService: PersonService) { }

  ngOnInit() {
    this.getNews();
    this.getPrivilege();
  }

}
