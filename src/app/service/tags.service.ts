import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Like} from '../entity/like';
import {Comment} from '../entity/comment';
import {Categories} from '../entity/categories';
import {Tags} from '../entity/tags';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};

@Injectable()
export class TagsService {
  private newsUrl = 'http://localhost:8080/';
  private userUrl = 'http://localhost:8080/user';
  private editorUrl = 'http://localhost:8080/editor';
  private ACCESS_TOKEN = '?access_token=';

  public getTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(this.newsUrl + 'tags');
  }

  public saveNewTag(newTag: string): Observable<Tags> {
    const params = new HttpParams()
      .set('newTag', newTag);
    return this.http.post<Tags>(this.editorUrl + '/tag/new' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public getTagsNews(id: number): Observable<Tags[]> {
    return this.http.get<Tags[]>(this.newsUrl + 'tags/news/' + id.toString());
  }

  public addTagsNews(newsId: number, tags: number[]): Observable<Categories> {
    let params = new HttpParams();
    params = params.append('newsId', newsId.toString());
    tags.forEach(id => {
      params = params.append('tagId', id.toString());
    });
    return this.http.post<Categories>(this.editorUrl + '/news/tags/add' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public deleteAllTagsNews(newsId: number): Observable<Categories> {
    const params = new HttpParams()
      .set('newsId', newsId.toString());
    return this.http.post<Categories>(this.editorUrl + '/news/tags/deleteAll' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
