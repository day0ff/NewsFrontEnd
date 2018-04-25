import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Person} from '../entity/person';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Roles} from '../entity/roles';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};

@Injectable()
export class PersonService {
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

  savePerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.userUrl + 'save',
      JSON.stringify(person),
      httpOptions);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */



  deletePerson(person: Person): Observable<any> {
    return this.http.post<Person>(this.userUrl + 'delete',
      JSON.stringify(person),
      httpOptions);
  }

  updatePerson(person: Person): Observable<string> {
    return this.http.get<string>(this.userUrl + 'update/'
      + person.firstName + '/' + person.lastName + '/' + person.id);
  }

  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
