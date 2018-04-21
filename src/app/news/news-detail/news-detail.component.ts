import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {NewsService} from '../../service/news.service';
import {News} from '../../entity/news';
import {Comment} from '../../entity/comment';
import {AuthService} from '../../service/auth.service';
import {PersonService} from '../../service/person.service';
import {Person} from '../../entity/person';
import {CommentsService} from '../../service/comments.service';


@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
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

  getComments(): void {
    const id = this.route.snapshot.paramMap.get('newsId');
    this.newsService.getCommentsByNewsId(+id)
      .subscribe(comments => this.comments = comments,
        error => console.log('Comments error + ' + error));
  }

  getPerson(): void {
    try {
      const user = this.authService.getUser();
      if (user.id > 0) {
        this.personService.getPersonByNameAndPassword(user.userName, user.password)
          .subscribe(person => this.person = person,
            error => console.log('No Person + ' + error));
      }
    } catch (error) {
      console.log('Get Person error + ' + error);
    }
  }

  saveComment() {
    this.getPerson();
    this.commentsService.saveComment(this.person.id, this.news.id, this.comment)
      .subscribe(comment => console.log('Add comment.'));
  }

  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private authService: AuthService,
              private personService: PersonService,
              private commentsService: CommentsService) {
  }

  ngOnInit() {
    this.getNews();
    this.getComments();
    this.getPrivilege();
    this.getPerson();
  }

}
