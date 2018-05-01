import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Categories} from '../entity/categories';
import {Roles} from '../entity/roles';
import {Urls} from '../entity/urls';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};
/**
 * The class RolesService implements methods of the authorization business logic of entity News.
 */
@Injectable()
export class RolesService {
  /**
   * property - of url with no privilege
   */
  private newsUrl = Urls.newsUrl;
  /**
   * property - of url with admin privilege
   */
  private adminUrl = Urls.adminUrl;
  /**
   * property - part of the url way
   */
  private ACCESS_TOKEN = '?access_token=';
  /**
   * The method requests for all roles.
   *
   * @return Roles objects
   */
  public getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.newsUrl + 'roles');
  }
  /**
   * The method requests for the person roles.
   *
   * @return Roles objects
   */
  public getRolesPerson(id: number): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.adminUrl + '/person/roles/' + id + this.ACCESS_TOKEN
      + this.authService.getAccessToken());
  }
  /**
   * Creates a new default object RolesService
   * @constructor
   */
  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
