import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Comment} from '../entity/comment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};

@Injectable()
export class CommentsService {
  private commentsUrl = 'http://localhost:8080/';
  private userUrl = 'http://localhost:8080/user';
  private editorUrl = 'http://localhost:8080/editor';
  private ACCESS_TOKEN = '?access_token=';

  public getCommentsPerson(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsUrl + 'comments/person/' + id.toString());
  }

  public getCommentsPersonCount(id: number): Observable<number> {
    return this.http.get<number>(this.commentsUrl + 'comments/person/count/' + id.toString());
  }

  public saveComment(personId: number, newsId: number, comment: string): Observable<Comment> {
    const params = new HttpParams()
        .set('person_id', personId.toString())
        .set('news_id', newsId.toString())
        .set('comment', comment);
    return this.http.post<Comment>(this.userUrl + '/comment/save' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public deleteComment(commentId: number): Observable<Comment> {
    console.log('Comment to delete id = ' + commentId);
    const params = new HttpParams()
      .set('id', commentId.toString());
    return this.http.post<Comment>(this.editorUrl + '/comment/delete' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
