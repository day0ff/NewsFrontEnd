import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Comment} from '../entity/comment';
import {Urls} from '../entity/urls';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};
/**
 * The class CommentsService implements methods of the authorization business logic of entity Comments.
 */
@Injectable()
export class CommentsService {
  /**
   * property - of url with no privilege
   */
  private commentsUrl = Urls.newsUrl;
  /**
   * property - of url with user privilege
   */
  private userUrl = Urls.userUrl;
  /**
   * property - of url with editor privilege
   */
  private editorUrl = Urls.editorUrl;
  /**
   * property - part of the url way
   */
  private ACCESS_TOKEN = '?access_token=';
  /**
   * The method requests for person comments.
   *
   * @return Comments objects
   */
  public getCommentsPerson(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsUrl + 'comments/person/' + id.toString());
  }
  /**
   * The method requests for person comments count.
   *
   * @return Comments count
   */
  public getCommentsPersonCount(id: number): Observable<number> {
    return this.http.get<number>(this.commentsUrl + 'comments/person/count/' + id.toString());
  }
  /**
   * The method save new comment by news id and person id.
   *
   * @return Comment object
   */
  public saveComment(personId: number, newsId: number, comment: string): Observable<Comment> {
    const params = new HttpParams()
        .set('person_id', personId.toString())
        .set('news_id', newsId.toString())
        .set('comment', comment);
    return this.http.post<Comment>(this.userUrl + '/comment/save' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * The method delete comment by comment id.
   *
   * @return Comments objects
   */
  public deleteComment(commentId: number): Observable<Comment> {
    console.log('Comment to delete id = ' + commentId);
    const params = new HttpParams()
      .set('id', commentId.toString());
    return this.http.post<Comment>(this.editorUrl + '/comment/delete' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * Creates a new default object CommentsService
   * @constructor
   */
  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
