import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {News} from '../entity/news';
import {Like} from '../entity/like';
import {Comment} from '../entity/comment';
import {Tags} from '../entity/tags';
import {Urls} from '../entity/urls';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
};
/**
 * The class NewsService implements methods of the authorization business logic of entity News.
 */
@Injectable()
export class NewsService {
  /**
   * property - of url with no privilege
   */
  private newsUrl = Urls.newsUrl;
  /**
   * property - of url with user privilege
   */
  private userUrl = Urls.userUrl;
  /**
   * property - of url with editor privilege
   */
  private editorUrl = Urls.editorUrl;
  /**
   * property - part of the url way
   */
  private ACCESS_TOKEN = '?access_token=';
  /**
   * The method requests for all news.
   *
   * @return News objects
   */
  public getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news');
  }
  /**
   * The method requests for person comments on the news count.
   *
   * @return Comments count
   */
  public getNewsPersonCommentsCount(id: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/person/count/' + id);
  }
  /**
   * The method requests for the news comments count.
   *
   * @return Comments count
   */
  public getNewsCommentsCount(id: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/comments/count/' + id);
  }
  /**
   * The method requests for the news likes count.
   *
   * @return Likes count
   */
  public getNewsLikesCount(id: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/likes/count/' + id);
  }
  /**
   * The method requests for person news.
   *
   * @return News objects
   */
  public getNewsByPrson(id: number): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news/person/' + id);
  }
  /**
   * The method requests for news by the news id.
   *
   * @return News objects
   */
  public getNewsById(id: number): Observable<News> {
    return this.http.get<News>(this.newsUrl + 'news/' + id);
  }
  /**
   * The method requests for news comments by the news id.
   *
   * @return Comments objects
   */
  public getCommentsByNewsId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.newsUrl + 'comments/news/' + id);
  }
  /**
   * The method requests for news tags by the news id.
   *
   * @return Tags objects
   */
  public getTagsByNewsId(id: number): Observable<Tags[]> {
    return this.http.get<Tags[]>(this.newsUrl + 'tags/news/' + id);
  }
  /**
   * The method requests for news by the news category.
   *
   * @return News objects
   */
  public getNewsByCategory(category: string): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news/category/' + category);
  }
  /**
   * The method requests for limit news by the news category.
   *
   * @return News objects
   */
  public getNewsByCategoryLimit(category: string, limit: number): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news/category/' + category + '/' + limit.toString());
  }
  /**
   * The method requests for news by the news tag title.
   *
   * @return News objects
   */
  public getNewsByTagTitle(title: string): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + 'news/tag/title/' + title);
  }
  /**
   * The method requests for the person likes on the News
   *
   * @return count of likes
   */
  public isNewsLikePerson(newsId: number, personId: number): Observable<number> {
    console.log('Service ' + newsId + ' : ' + personId);
    return this.http.get<number>(this.newsUrl + 'likes/' + newsId + '/' + personId);
  }
  /**
   * The method save news like.
   *
   * @return Like object
   */
  public saveLike(newsId: number, personId: number): Observable<Like> {
    const params = new HttpParams()
      .set('news_id', newsId.toString())
      .set('person_id', personId.toString());
    return this.http.post<Like>(this.userUrl + '/like/save' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * The method delete news like.
   *
   * @return Like object
   */
  public deleteLike(newsId: number, personId: number): Observable<Like> {
    const params = new HttpParams()
      .set('news_id', newsId.toString())
      .set('person_id', personId.toString());
    return this.http.post<Like>(this.userUrl + '/like/delete' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * The method save news by person id.
   *
   * @return News object
   */
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
  /**
   * The method delete news by the news id.
   *
   * @return News object
   */
  public deleteNews(newsId: number): Observable<News> {
    const params = new HttpParams()
      .set('news_id', newsId.toString());
    return this.http.post<News>(this.editorUrl + '/news/delete' + this.ACCESS_TOKEN
      + this.authService.getAccessToken(), params, httpOptions);
  }
  /**
   * The method update news by the news person id.
   *
   * @return News object
   */
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
  /**
   * The method increment News views by one
   *
   * @return number
   */
  public incrementNewsViews(newsId: number): Observable<number> {
    return this.http.get<number>(this.newsUrl + 'news/views/' + newsId);
  }
  /**
   * Creates a new default object NewsService
   * @constructor
   */
  constructor(private http: HttpClient, private authService: AuthService) {
  }

}
