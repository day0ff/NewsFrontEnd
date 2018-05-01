import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Categories} from '../entity/categories';
import {Tags} from '../entity/tags';
import {Urls} from '../entity/urls';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};
/**
 * The class TagsService implements methods of the authorization business logic of entity News.
 */
@Injectable()
export class TagsService {
  /**
   * property - of url with no privilege
   */
  private newsUrl = Urls.newsUrl;
  /**
   * property - of url with editor privilege
   */
  private editorUrl = Urls.editorUrl;
  /**
   * property - part of the url way
   */
  private ACCESS_TOKEN = '?access_token=';
  /**
   * The method requests for all tags.
   *
   * @return Tags objects
   */
  public getTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(this.newsUrl + 'tags');
  }
  /**
   * The method save the news tags.
   *
   * @return Tags objects
   */
  public saveNewTag(newTag: string): Observable<Tags> {
    const params = new HttpParams()
      .set('newTag', newTag);
    return this.http.post<Tags>(this.editorUrl + '/tag/new' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * The method requests for the news tags.
   *
   * @return Tags objects
   */
  public getTagsNews(id: number): Observable<Tags[]> {
    return this.http.get<Tags[]>(this.newsUrl + 'tags/news/' + id.toString());
  }
  /**
   * The method add new tags to the database.
   *
   * @return Tags objects
   */
  public addTagsNews(newsId: number, tags: number[]): Observable<Tags> {
    let params = new HttpParams();
    params = params.append('newsId', newsId.toString());
    tags.forEach(id => {
      params = params.append('tagId', id.toString());
    });
    return this.http.post<Tags>(this.editorUrl + '/news/tags/add' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * The method delete tags to from the news.
   *
   * @return Tags objects
   */
  public deleteAllTagsNews(newsId: number): Observable<Tags> {
    const params = new HttpParams()
      .set('newsId', newsId.toString());
    return this.http.post<Tags>(this.editorUrl + '/news/tags/deleteAll' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * Creates a new default object TagsService
   * @constructor
   */
  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
