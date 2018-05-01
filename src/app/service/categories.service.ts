import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Categories} from '../entity/categories';
import {Urls} from '../entity/urls';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};
/**
 * The class CategoriesService implements methods of the authorization business logic of entity Categories.
 */
@Injectable()
export class CategoriesService {
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
   * The method requests for categories.
   *
   * @return Categories objects
   */
  public getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.newsUrl + 'categories');
  }
  /**
   * The method requests for categories news.
   *
   * @return Categories objects
   */
  public getCategoriesNews(id: number): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.newsUrl + 'category/news/' + id.toString());
  }
  /**
   * The method add categories to the news.
   *
   * @return Categories objects
   */
  public addCategoriesNews(newsId: number, categories: number[]): Observable<Categories> {
    let params = new HttpParams();
    params = params.append('newsId', newsId.toString());
    categories.forEach(id => {
      params = params.append('categoryId', id.toString());
    });
    return this.http.post<Categories>(this.editorUrl + '/news/categories/add' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * The method delete all categories from the news.
   *
   * @return Categories objects
   */
  public deleteAllCategoriesNews(newsId: number): Observable<Categories> {
    const params = new HttpParams()
      .set('newsId', newsId.toString());
    return this.http.post<Categories>(this.editorUrl + '/news/categories/deleteAll' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * Creates a new default object CategoriesService
   * @constructor
   */
  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
