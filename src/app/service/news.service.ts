import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {News} from '../entity/news';
import {Person} from '../entity/person';
import {Like} from '../entity/like';
import {Comment} from '../entity/comment';
import {Tags} from '../entity/tags';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};

@Injectable()
export class NewsService {
  private newsUrl = 'http://localhost:8080/';
  private userUrl = 'http://localhost:8080/user';
  private editorUrl = 'http://localhost:8080/editor';
  private ACCESS_TOKEN = '?access_token=';

  public getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news');
  }

  public getNewsPersonCommentsCount(id: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/person/count/' + id);
  }

  public getNewsCommentsCount(id: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/comments/count/' + id);
  }

  public getNewsLikesCount(id: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/likes/count/' + id);
  }

  public getNewsByPrson(id: number): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news/person/' + id);
  }

  public getNewsByTag(id: number): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news/tag/' + id);
  }

  public getNewsById(id: number): Observable<News> {
    return this.http.get<News>(this.newsUrl + 'news/' + id);
  }

  public getCommentsByNewsId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.newsUrl + 'comments/news/' + id);
  }

  public getTagsByNewsId(id: number): Observable<Tags[]> {
    return this.http.get<Tags[]>(this.newsUrl + 'tags/news/' + id);
  }

  public getNewsByCategory(category: string): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news/category/' + category);
  }

  public getNewsByCategoryLimit(category: string, limit: number): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news/category/' + category + '/' + limit.toString());
  }

  public getNewsByTagTitle(title: string): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news/tag/title/' + title);
  }

  public isNewsLikePerson(newsId: number, personId: number): Observable<number> {
    console.log('Service ' + newsId + ' : ' + personId);
    return this.http.get<number>(this.newsUrl + 'likes/' + newsId + '/' + personId);
  }

  public saveLike(newsId: number, personId: number): Observable<Like> {
    const params = new HttpParams()
      .set('news_id', newsId.toString())
      .set('person_id', personId.toString());
    return this.http.post<Like>(this.userUrl + '/like/save' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public deleteLike(newsId: number, personId: number): Observable<Like> {
    const params = new HttpParams()
      .set('news_id', newsId.toString())
      .set('person_id', personId.toString());
    return this.http.post<Like>(this.userUrl + '/like/delete' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public saveNews(news: News, personId: number): Observable<News> {
    const params = new HttpParams()
      .set('author', personId.toString())
      .set('title', news.title)
      .set('article', news.article)
      .set('post', news.post)
      .set('image', news.image)
      .set('publication_date', news.publicationDate.toString())
      .set('published', news.published.toString());
    return this.http.post<News>(this.editorUrl + '/news/save' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public deleteNews(newsId: number): Observable<News> {
    const params = new HttpParams()
      .set('news_id', newsId.toString());
    return this.http.post<News>(this.editorUrl + '/news/delete' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public updateNews(news: News, personId: number): Observable<News> {
    const params = new HttpParams()
      .set('id', news.id.toString())
      .set('author', personId.toString())
      .set('title', news.title)
      .set('article', news.article)
      .set('post', news.post)
      .set('image', news.image)
      .set('publication_date', news.publicationDate.toString())
      .set('published', news.published.toString());
    return this.http.post<News>(this.editorUrl + '/news/update' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }

  public incrementNewsViews(newsId: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/views/' + newsId);
  }

  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
