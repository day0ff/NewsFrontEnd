import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Token} from '../entity/token';
import {User} from '../entity/user';
import {Person} from '../entity/person';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};

@Injectable()
export class AuthService {
  private defaultToken: Token = {
    access_token: null,
    token_type: null,
    // refresh_token: null,
    expires_in: 0,
    scope: null
  };
  private defaultPerson: Person = {
    id: null,
    user: {
      id: null,
      userName: null,
      password: null,
      enabled: null
    },
    firstName: null,
    lastName: null,
    screenName: null,
    image: null,
  };

  private defaultRoles: string [] = [];

  private authUrl = 'http://localhost:8080/oauth/token';

  public obtainAccessToken(login: string, password: string): Observable<Token> {
    const params = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', 'my-trusted-client')
      .set('client_secret', 'secret')
      .set('username', login)
      .set('password', password);
    return this.http.post<Token>(this.authUrl, params, httpOptions);
  }

  saveToken(token: Token) {
    const expires_at = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('expires_at', JSON.stringify(expires_at));
  }

  getToken(): Token {
    return JSON.parse(localStorage.getItem('token'));
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  savePerson(person: Person) {
    localStorage.setItem('person', JSON.stringify(person));
  }

  getPerson(): Person {
    return JSON.parse(localStorage.getItem('person'));
  }

  getRoles(): string [] {
    return JSON.parse(localStorage.getItem('roles'));
  }

  saveRoles(roles: string []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  getAccessToken(): string {
    return JSON.parse(localStorage.getItem('token')).access_token;
  }

  getExpireIn() {
    const expiration = localStorage.getItem('expires_at');
    return JSON.parse(expiration) - new Date().getTime();
  }

  isExpired() {
    return (this.getExpireIn() <= 0);
  }

  isAuthorized() {
    return (this.getExpireIn() > 0);
  }

  isToken() {
    return localStorage.getItem('token') != null;
  }

  hasRoles(roles: string []): boolean {
    return this.getRoles().some(userRole => roles.indexOf(userRole) >= 0);
  }

  logout() {
    this.saveToken(this.defaultToken);
    this.savePerson(this.defaultPerson);
    this.saveRoles(this.defaultRoles);
  }

  constructor(private http: HttpClient) {
  }
}
