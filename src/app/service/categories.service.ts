import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Like} from '../entity/like';
import {Comment} from '../entity/comment';
import {Categories} from '../entity/categories';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};

@Injectable()
export class CategoriesService {
  private newsUrl = 'http://localhost:8080/';
  private userUrl = 'http://localhost:8080/user';
  private editorUrl = 'http://localhost:8080/editor';
  private ACCESS_TOKEN = '?access_token=';

  public getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.newsUrl + 'categories');
  }

  public getCategoriesNews(id: number): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.newsUrl + 'category/news/' + id.toString());
  }

  public saveCategoriesNews(newsId: number, categoryId: number): Observable<Categories> {
    const params = new HttpParams()
      .set('newsId', newsId.toString())
      .set('categoryId', categoryId.toString());
    return this.http.post<Categories>(this.editorUrl + '/news/categories/save' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public addCategoriesNews(newsId: number, categories: number[]): Observable<Categories> {
    let params = new HttpParams();
    params = params.append('newsId', newsId.toString());
    categories.forEach(id => {
      params = params.append('categoryId', id.toString());
    });
    return this.http.post<Categories>(this.editorUrl + '/news/categories/add' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public deleteCategoriesNews(newsId: number, categoryId: number): Observable<Categories> {
    const params = new HttpParams()
      .set('newsId', newsId.toString())
      .set('categoryId', categoryId.toString());
    return this.http.post<Categories>(this.editorUrl + '/news/categories/delete' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public deleteAllCategoriesNews(newsId: number): Observable<Categories> {
    const params = new HttpParams()
      .set('newsId', newsId.toString());
    return this.http.post<Categories>(this.editorUrl + '/news/categories/deleteAll' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  /*  public saveComment(personId: number, newsId: number, comment: string): Observable<Comment> {
      const params = new HttpParams()
        .set('person_id', personId.toString())
        .set('news_id', newsId.toString())
        .set('comment', comment);
      return this.http.post<Comment>(this.userUrl + '/comment/save' + this.ACCESS_TOKEN
        + this.authService.getAccessToken(), params, httpOptions);
    }*/

  /*  public deleteComment(commentId: number): Observable<Comment> {
      console.log('Comment to delete id = ' + commentId);
      const params = new HttpParams()
        .set('id', commentId.toString());
      return this.http.post<Comment>(this.editorUrl + '/comment/delete' + this.ACCESS_TOKEN
        + this.authService.getAccessToken(), params, httpOptions);
    }*/

  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
