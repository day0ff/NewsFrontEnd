import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../entity/user';
import {AuthService} from './auth.service';
import {Roles} from '../entity/roles';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};

@Injectable()
export class UserService {
  private newsUrl = 'http://localhost:8080/';
  private userUrl = 'http://localhost:8080/user';
  private adminUrl = 'http://localhost:8080/admin';
  private ACCESS_TOKEN = '?access_token=';

  public saveUserByNameAndPassword(login: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('userName', login)
      .set('password', password);
    return this.http.post<User>(this.newsUrl + 'users/save', params, httpOptions);
  }

  public updateUser(user: User): Observable<User> {
    const params = new HttpParams()
      .set('userId', user.id.toString())
      .set('newName', user.userName)
      .set('newPassword', user.password);
    return this.http.post<User>(this.adminUrl + '/user/update' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public updateUserByNameAndPassword(login: string, password: string, newLogin: string, newPassword: string): Observable<User> {
    const params = new HttpParams()
      .set('userName', login)
      .set('password', password)
      .set('newName', newLogin)
      .set('newPassword', newPassword);
    return this.http.post<User>(this.userUrl + '/user/update' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public getUserRoles(login: string, password: string): Observable<string []> {
    const params = new HttpParams()
      .set('name', login)
      .set('password', password);
    return this.http.post<string []>(this.userUrl + '/roles' + this.ACCESS_TOKEN + this.authService.getAccessToken(), params, httpOptions);
  }

  public addUserRoles(userId: number, roles: number[]): Observable<Roles> {
    let params = new HttpParams();
    params = params.append('userId', userId.toString());
    roles.forEach(id => {
      params = params.append('roleId', id.toString());
    });
    return this.http.post<Roles>(this.adminUrl + '/user/roles/add' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
