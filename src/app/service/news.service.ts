import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {News} from '../entity/news';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
};

@Injectable()
export class NewsService {
  private newsUrl = 'http://localhost:8080/';
  private ACCESS_TOKEN = '?access_token=';

  public getNewsPersonCommentsCount(id: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/person/count/' + id);
  }

  public getNewsCommentsCount(id: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/comments/count/' + id);
  }

  public getNewsByTag(id: number): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news/tag/' + id);
  }

  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
