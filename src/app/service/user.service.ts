import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../entity/user';
import {AuthService} from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};

@Injectable()
export class UserService {
  private userUrl = 'http://localhost:8080/user';
  private ACCESS_TOKEN = '?access_token=';

  public getUser(login: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('name', login)
      .set('password', password);
    return this.http.post<User>(this.userUrl + this.ACCESS_TOKEN + this.authService.getAccessToken(), params, httpOptions);
  }

  public getUserRoles(login: string, password: string): Observable<string []> {
    const params = new HttpParams()
      .set('name', login)
      .set('password', password);
    return this.http.post<string []>(this.userUrl + '/roles' + this.ACCESS_TOKEN + this.authService.getAccessToken(), params, httpOptions);
  }

  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
