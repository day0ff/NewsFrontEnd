import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Person} from '../entity/person';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};

@Injectable()
export class PersonService {
  private newsUrl = 'http://localhost:8080/';
  private userUrl = 'http://localhost:8080/user';
  private adminUrl = 'http://localhost:8080/admin';
  private ACCESS_TOKEN = '?access_token=';

  public getPersonByNameAndPassword(name: string, password: string): Observable<Person> {
    const params = new HttpParams()
      .set('name', name)
      .set('password', password);
    return this.http.post<Person>(this.userUrl + '/person' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.adminUrl + '/persons' + this.ACCESS_TOKEN
      + this.authService.getAccessToken());
  }

  public getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(this.adminUrl + '/person/get/' + id + this.ACCESS_TOKEN
      + this.authService.getAccessToken());
  }

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

  deletePerson(userName: string, password: string, personId: number): Observable<Person> {
    const params = new HttpParams()
      .set('userName', userName)
      .set('password', password)
      .set('personId', personId.toString());
    return this.http.post<Person>(this.userUrl + '/person/delete' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
