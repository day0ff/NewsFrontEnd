import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Token} from '../entity/token';
import {Person} from '../entity/person';
import {Urls} from '../entity/urls';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};
/**
 * The class AuthService implements methods of the authorization business logic.
 */
@Injectable()
export class AuthService {
  /**
   * property - of default token entity
   */
  private defaultToken: Token = {
    access_token: '',
    token_type: '',
    expires_in: 0,
    scope: []
  };
  /**
   * property - of default person entity
   */
  private defaultPerson: Person = {
    id: 0,
    user: {
      id: 0,
      userName: '',
      password: '',
      enabled: false
    },
    firstName: '',
    lastName: '',
    screenName: '',
    image: ''
  };
  /**
   * property - of default roles array
   */
  private defaultRoles: string [] = [''];
  /**
   * property - of authorization url
   */
  private authUrl = Urls.authUrl;
  /**
   * The method requests for authorization token.
   *
   * @return access token object
   */
  public obtainAccessToken(login: string, password: string): Observable<Token> {
    const params = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', 'my-trusted-client')
      .set('client_secret', 'secret')
      .set('username', login)
      .set('password', password);
    return this.http.post<Token>(this.authUrl, params, httpOptions);
  }
  /**
   * The method save authorization token and expiration time to local storage.
   */
  saveToken(token: Token): void {
    const expires_at = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('expires_at', JSON.stringify(expires_at));
  }
  /**
   * The method save person to local storage.
   */
  savePerson(person: Person): void {
    localStorage.setItem('person', JSON.stringify(person));
  }
  /**
   * The method get person from local storage or set default.
   *
   * @return person object
   */
  getPerson(): Person {
    const person = JSON.parse(localStorage.getItem('person'));
    if (person) {
      return person;
    } else {
      this.savePerson(this.defaultPerson);
      return this.defaultPerson;
    }
  }
  /**
   * The method get person roles from local storage or set default.
   *
   * @return roles string array
   */
  getRoles(): string [] {
    const roles = JSON.parse(localStorage.getItem('roles'));
    if (roles) {
      return roles;
    } else {
      this.saveRoles(this.defaultRoles);
      return this.defaultRoles;
    }
  }
  /**
   * The method save person roles to local storage.
   */
  saveRoles(roles: string []): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }
  /**
   * The method get access token from local storage.
   *
   * @return access token
   */
  getAccessToken(): string {
    return JSON.parse(localStorage.getItem('token')).access_token;
  }
  /**
   * The method return expiration time of the access token from local storage.
   *
   * @return expiration time
   */
  getExpireIn(): number {
    const expiration = localStorage.getItem('expires_at');
    return JSON.parse(expiration) - new Date().getTime();
  }
  /**
   * The method return is time of the access token expired.
   *
   * @return is expired
   */
  isExpired(): boolean {
    return (this.getExpireIn() <= 0);
  }
  /**
   * The method return is user has privilege.
   *
   * @return is has privilege
   */
  hasRoles(roles: string []): boolean {
    return this.getRoles().some(userRole => roles.indexOf(userRole) >= 0);
  }
  /**
   * The method save default token, person and person roles.
   */
  logout(): void {
    this.saveToken(this.defaultToken);
    this.savePerson(this.defaultPerson);
    this.saveRoles(this.defaultRoles);
  }
  /**
   * Creates a new default object AuthService
   * @constructor
   */
  constructor(private http: HttpClient) {
  }
}
