import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Like} from '../entity/like';
import {Comment} from '../entity/comment';
import {Categories} from '../entity/categories';
import {Tags} from '../entity/tags';
import {Roles} from '../entity/roles';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};

@Injectable()
export class RolesService {
  private newsUrl = 'http://localhost:8080/';
  private userUrl = 'http://localhost:8080/user';
  private editorUrl = 'http://localhost:8080/editor';
  private adminUrl = 'http://localhost:8080/admin';

  private ACCESS_TOKEN = '?access_token=';

  public getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.newsUrl + 'roles');
  }

  public getRolesPerson(id: number): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.adminUrl + '/person/roles/' + id + this.ACCESS_TOKEN
      + this.authService.getAccessToken());
  }

  public addRolesPerson(newsId: number, tags: number[]): Observable<Categories> {
    let params = new HttpParams();
    params = params.append('newsId', newsId.toString());
    tags.forEach(id => {
      params = params.append('tagId', id.toString());
    });
    return this.http.post<Categories>(this.editorUrl + '/news/tags/add' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public deleteAllRolesPerson(newsId: number): Observable<Categories> {
    const params = new HttpParams()
      .set('newsId', newsId.toString());
    return this.http.post<Categories>(this.editorUrl + '/news/tags/deleteAll' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
