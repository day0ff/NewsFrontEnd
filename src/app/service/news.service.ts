import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {News} from '../entity/news';
import {Person} from '../entity/person';
import {Like} from '../entity/like';
import {Comment} from '../entity/comment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
};

@Injectable()
export class NewsService {
  private newsUrl = 'http://localhost:8080/';
  private userUrl = 'http://localhost:8080/user';
  private ACCESS_TOKEN = '?access_token=';

  public getNewsPersonCommentsCount(id: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/person/count/' + id);
  }

  public getNewsCommentsCount(id: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/comments/count/' + id);
  }

  public getNewsLikesCount(id: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/likes/count/' + id);
  }

  public getNewsByTag(id: number): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news/tag/' + id);
  }

  public getNewsById(id: number): Observable<News> {
    return this.http.get<News>(this.newsUrl + 'news/' + id);
  }

  public getCommentsByNewsId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.newsUrl + 'comments/news/' + id);
  }

  public getTagsByNewsId(id: number): Observable<string []> {
    return this.http.get<string []>(this.newsUrl + 'tags/news/' + id);
  }

  public getNewsByTagTitle(title: string): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news/tag/title/' + title);
  }

  public isNewsLikePerson(newsId: number, personId: number): Observable<number> {
    console.log('Service ' + newsId + ' : ' + personId);
    return this.http.get<number>(this.newsUrl + 'likes/' + newsId + '/' + personId);
  }

  public saveLike(newsId: number, personId: number): Observable<Like> {
    const params = new HttpParams()
      .set('news_id', newsId.toString())
      .set('person_id', personId.toString());
    return this.http.post<Like>(this.userUrl + '/like/save' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
    // return this.http.post<Like>(this.newsUrl + 'like/save', params, httpOptions);
  }

  public deleteLike(newsId: number, personId: number): Observable<Like> {
    const params = new HttpParams()
      .set('news_id', newsId.toString())
      .set('person_id', personId.toString());
    return this.http.post<Like>(this.userUrl + '/like/delete' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
    // return this.http.post<Like>(this.newsUrl + 'like/delete', params, httpOptions);
  }

  public incrementNewsViews(newsId: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/views/' + newsId);
  }

  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
