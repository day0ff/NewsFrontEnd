import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Person} from '../entity/person';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Urls} from '../entity/urls';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};
/**
 * The class PersonService implements methods of the authorization business logic of entity News.
 */
@Injectable()
export class PersonService {
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
   * The method requests for the person by the user name and password.
   *
   * @return Person object
   */
  public getPersonByNameAndPassword(name: string, password: string): Observable<Person> {
    const params = new HttpParams()
      .set('name', name)
      .set('password', password);
    return this.http.post<Person>(this.userUrl + '/person' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * The method requests for all persons.
   *
   * @return Persons objects
   */
  public getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.adminUrl + '/persons' + this.ACCESS_TOKEN
      + this.authService.getAccessToken());
  }
  /**
   * The method requests for the person by id.
   *
   * @return Person object
   */
  public getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(this.adminUrl + '/person/get/' + id + this.ACCESS_TOKEN
      + this.authService.getAccessToken());
  }
  /**
   * The method save the person by the user name and password.
   *
   * @return Person object
   */
  savePersonByUserNameAndPassword(userName: string, password: string, person: Person): Observable<Person> {
    const params = new HttpParams()
      .set('userName', userName)
      .set('password', password)
      .set('firstName', person.firstName)
      .set('lastName', person.lastName)
      .set('screenName', person.screenName)
      .set('image', person.image);
    return this.http.post<Person>(this.newsUrl + 'users/save/person', params, httpOptions);
  }
  /**
   * The method update the person.
   *
   * @return Person object
   */
  updatePerson(person: Person): Observable<Person> {
    const params = new HttpParams()
      .set('personId', person.id.toString())
      .set('firstName', person.firstName)
      .set('lastName', person.lastName)
      .set('screenName', person.screenName)
      .set('image', person.image);
    return this.http.post<Person>(this.adminUrl + '/person/update' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * The method update the person by the user name and password.
   *
   * @return Person object
   */
  updatePersonByUserNameAndPassword(userName: string, password: string, person: Person): Observable<Person> {
    const params = new HttpParams()
      .set('userName', userName)
      .set('password', password)
      .set('firstName', person.firstName)
      .set('lastName', person.lastName)
      .set('screenName', person.screenName)
      .set('image', person.image);
    return this.http.post<Person>(this.userUrl + '/person/update' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * The method delete the person by the user name and password.
   *
   * @return Person object
   */
  deletePerson(userName: string, password: string, personId: number): Observable<Person> {
    const params = new HttpParams()
      .set('userName', userName)
      .set('password', password)
      .set('personId', personId.toString());
    return this.http.post<Person>(this.userUrl + '/person/delete' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * Creates a new default object PersonService
   * @constructor
   */
  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
