import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
};

@Injectable()
export class CommentsService {
  private commentsUrl = 'http://localhost:8080/';
  private ACCESS_TOKEN = '?access_token=';

  public getUserComments(id: number): Observable<number> {
    return this.http.get<number>(this.commentsUrl + 'comments/person/count/' + id);
  }

  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
