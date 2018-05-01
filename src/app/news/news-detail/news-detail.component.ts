import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
/**
 * The class implements component management NewsDetailComponent. Show news details.
 */
export class NewsDetailComponent implements OnInit {
  /**
   * property - of news
   */
  news: News;
  /**
   * property - of news tags array
   */
  tags: string [];
  /**
   * property - of news comments array
   */
  comments: Comment[];
  /**
   * property - of editor privilege
   */
  hasPrivilegeEditor: boolean;
  /**
   * property - of user privilege
   */
  hasPrivilegeUser: boolean;
  /**
   * property - of news comment
   */
  comment = null;
  /**
   * property - of current person
   */
  person: Person;
  /**
   * The method requests person privileges.
   */
  getPrivilege(): void {
    this.hasPrivilegeEditor = this.authService.hasRoles(['ADMIN', 'EDITOR']);
    console.log('Editor privilege = ' + this.hasPrivilegeEditor);
    this.hasPrivilegeUser = this.authService.hasRoles(['ADMIN', 'EDITOR', 'USER']);
    console.log('User privilege = ' + this.hasPrivilegeUser);
  }
  /**
   * The method requests news from route snapshot.
   */
  getNews(): void {
    const id = this.route.snapshot.paramMap.get('newsId');
    this.newsService.incrementNewsViews(+id).subscribe();
    this.newsService.getNewsById(+id)
      .subscribe(news => {
        this.news = news;
        console.log('Get news id = ' + this.news.id);
      });
  }
  /**
   * The method requests news comments.
   */
  getComments(): void {
    const id = this.route.snapshot.paramMap.get('newsId');
    this.newsService.getCommentsByNewsId(+id)
      .subscribe(comments => this.comments = comments,
        error => console.log('Comments error + ' + error));
  }
  /**
   * The method requests current person.
   */
  getPerson(): void {
    this.person = this.authService.getPerson();
  }
  /**
   * The method save current person comment.
   */
  saveComment(): void {
    this.getPerson();
    this.commentsService.saveComment(this.person.id, this.news.id, this.comment)
      .subscribe(() => document.location.reload());
  }
  /**
   * Creates a new default object NewsDetailComponent
   * @constructor
   */
  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private authService: AuthService,
              private personService: PersonService,
              private commentsService: CommentsService) {
  }
  /**
   * Initializes the NewsDetailComponent class after it is created.
   */
  ngOnInit() {
    this.getNews();
    this.getComments();
    this.getPrivilege();
    this.getPerson();
  }

}
