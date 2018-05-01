import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../entity/user';
import {AuthService} from './auth.service';
import {Roles} from '../entity/roles';
import {Urls} from '../entity/urls';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};
/**
 * The class UserService implements methods of the authorization business logic of entity News.
 */
@Injectable()
export class UserService {
  /**
   * property - of url with no privilege
   */
  private newsUrl = Urls.newsUrl;
  /**
   * property - of url with user privilege
   */
  private userUrl = Urls.userUrl;
  /**
   * property - of url with admin privilege
   */
  private adminUrl = Urls.adminUrl;
  /**
   * property - part of the url way
   */
  private ACCESS_TOKEN = '?access_token=';
  /**
   * The method save new user.
   *
   * @return User object
   */
  public saveUserByNameAndPassword(login: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('userName', login)
      .set('password', password);
    return this.http.post<User>(this.newsUrl + 'users/save', params, httpOptions);
  }
  /**
   * The method update the user information by id.
   *
   * @return User object
   */
  public updateUser(user: User): Observable<User> {
    const params = new HttpParams()
      .set('userId', user.id.toString())
      .set('newName', user.userName)
      .set('newPassword', user.password);
    return this.http.post<User>(this.adminUrl + '/user/update' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * The method update the user information by the user name and password.
   *
   * @return User object
   */
  public updateUserByNameAndPassword(login: string, password: string, newLogin: string, newPassword: string): Observable<User> {
    const params = new HttpParams()
      .set('userName', login)
      .set('password', password)
      .set('newName', newLogin)
      .set('newPassword', newPassword);
    return this.http.post<User>(this.userUrl + '/user/update' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * The method requests for the user roles.
   *
   * @return roles array
   */
  public getUserRoles(login: string, password: string): Observable<string []> {
    const params = new HttpParams()
      .set('name', login)
      .set('password', password);
    return this.http.post<string []>(this.userUrl + '/roles' + this.ACCESS_TOKEN + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * The method add roles to the user.
   *
   * @return Roles objects
   */
  public addUserRoles(userId: number, roles: number[]): Observable<Roles[]> {
    let params = new HttpParams();
    params = params.append('userId', userId.toString());
    roles.forEach(id => {
      params = params.append('roleId', id.toString());
    });
    return this.http.post<Roles[]>(this.adminUrl + '/user/roles/add' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * Creates a new default object UserService
   * @constructor
   */
  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
