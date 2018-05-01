import {Component, OnInit} from '@angular/core';
import {News} from '../../entity/news';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../service/news.service';
import {AuthService} from '../../service/auth.service';
import {Comment} from '../../entity/comment';
import {Location} from '@angular/common';
import {Person} from '../../entity/person';
import {CommentsService} from '../../service/comments.service';
import {Group} from '../../entity/group';
import {Categories} from '../../entity/categories';
import {CategoriesService} from '../../service/categories.service';
import {Tags} from '../../entity/tags';
import {TagsService} from '../../service/tags.service';
import {Img} from '../../entity/img';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
/**
 * The class implements component management NewsEditComponent. Contains methods for editing news.
 */
export class NewsEditComponent implements OnInit {
  /**
   * property - of news
   */
  news: News;
  /**
   * property - of roles array
   */
  roles: string [];
  /**
   * property - of comments array
   */
  comments: Comment[] = [];
  /**
   * property - of news comment
   */
  comment = null;
  /**
   * property - of current person
   */
  person: Person;
  /**
   * property - of group images array
   */
  imgGroups: Group [] = Img.imgNews;
  /**
   * property - of categories array
   */
  categories: Categories[];
  /**
   * property - of category types array
   */
  categoryTypes: Group[] = [];
  /**
   * property - of category group array
   */
  categoryGroups: Group[] = [];
  /**
   * property - of new tag
   */
  tag = '';
  /**
   * property - of tags array
   */
  tags: Tags[];
  /**
   * property - of tags type array
   */
  tagsTypes: Group[] = [];
  /**
   * property - of tags group array
   */
  tagsGroups: Group[] = [];
  /**
   * The method requests news from route snapshot or set default.
   */
  getNews(): void {
    const id = this.route.snapshot.paramMap.get('editId');
    if (id !== 'new') {
      this.newsService.getNewsById(+id)
        .subscribe(
          news => {
            this.news = news;
            this.getPerson();
            this.getComments();
            this.getCategories();
            this.getTags();
          });
    } else {
      this.getPerson();
      const date = new Date().toISOString().slice(0, 10);
      console.log('Date = ' + date);
      this.news = new News(null, this.person, null, null, null, 'news_paper.png', date, 0, false);
      this.getCategories();
      this.getTags();
    }
  }
  /**
   * The method requests categories and set them to categoryGroups and requests news categories and set them to categoryTypes.
   */
  getCategories() {
    this.categoriesService.getCategories()
      .subscribe(categories => {
        categories.forEach(category =>
          this.categoryGroups.push({id: category.id, name: category.category})
        );
      });
    const id = this.route.snapshot.paramMap.get('editId');
    if (id !== 'new') {
      this.categoriesService.getCategoriesNews(this.news.id)
        .subscribe(categories => {
          this.categories = categories;
          this.categories.forEach(category =>
            this.categoryTypes.push({id: category.id, name: category.category})
          );
        });
    }
  }
  /**
   * The method save news categories from categoryTypes.
   */
  saveCategories() {
    const categories: number[] = [];
    this.categoryTypes.forEach(
      category => {
        categories.push(category.id);
      }
    );
    if (categories.length > 0) {
      console.log('News id = ' + this.news.id);
      this.categoriesService.addCategoriesNews(this.news.id, categories)
        .subscribe(() => console.log('Add categories'),
          error => console.log('Failed add categories'));
    } else {
      this.categoriesService.deleteAllCategoriesNews(this.news.id)
        .subscribe(() => console.log('Categories is Empty. So, delete them.'),
          error => console.log('Categories is Empty. Failed to delete them.'));
    }
  }
  /**
   * The method requests tags and set them to tagsGroups and requests news tags and set them to tagsTypes.
   */
  getTags() {
    this.tagsService.getTags()
      .subscribe(tags => {
        tags.forEach(tag =>
          this.tagsGroups.push({id: tag.id, name: tag.tag})
        );
      });
    const id = this.route.snapshot.paramMap.get('editId');
    if (id !== 'new') {
      this.tagsService.getTagsNews(this.news.id)
        .subscribe(tags => {
          this.tags = tags;
          this.tags.forEach(tag =>
            this.tagsTypes.push({id: tag.id, name: tag.tag})
          );
        });
    }
  }
  /**
   * The method save news tags from tagsTypes.
   */
  saveTags() {
    const tags: number[] = [];
    this.tagsTypes.forEach(
      tag => {
        tags.push(tag.id);
      }
    );
    if (tags.length > 0) {
      console.log('News id = ' + this.news.id);
      this.tagsService.addTagsNews(this.news.id, tags)
        .subscribe(() => console.log('Add tags'),
          error => console.log('Failed add tags'));
    } else {
      this.tagsService.deleteAllTagsNews(this.news.id)
        .subscribe(() => console.log('Tags is Empty. So, delete them.'),
          error => console.log('Tags is Empty. Failed to delete them.'));
    }
  }
  /**
   * The method save new news tag and then requests tags and set them to tagsTypes and tagsGroups.
   */
  addTag() {
    this.tagsService.saveNewTag(this.tag)
      .subscribe(tag => {
          console.log('Save tag = ' + tag);
          this.tagsGroups = [];
          this.tagsTypes = [];
          this.getTags();
        },
        error => console.log('Can not save new tag.'));
  }
  /**
   * The method requests comments news from route snapshot or set default.
   */
  getComments(): void {
    const id = this.route.snapshot.paramMap.get('editId');
    this.newsService.getCommentsByNewsId(+id)
      .subscribe(comments => this.comments = comments,
        error => console.log('Comments error + ' + error));
  }
  /**
   * The method requests current person.
   */
  getPerson(): void {
    this.person = this.authService.getPerson();
  }
  /**
   * The method save current person comment.
   */
  saveComment(): void {
    this.getPerson();
    this.commentsService.saveComment(this.person.id, this.news.id, this.comment)
      .subscribe(() => document.location.reload());
  }
  /**
   * The method save news.
   */
  saveNews(): void {
    this.newsService.saveNews(this.news, this.person.id)
      .subscribe(news => {
        this.news = news;
        this.saveCategories();
        this.saveTags();
        this.router.navigateByUrl('edit/detail/' + this.news.id);
      });
  }
  /**
   * The method delete news.
   */
  deleteNews(): void {
    this.newsService.deleteNews(this.news.id)
      .subscribe(() => this.router.navigateByUrl('/edit'));
  }
  /**
   * The method update news.
   */
  updateNews(): void {
    this.newsService.updateNews(this.news, this.person.id)
      .subscribe(news => {
        this.saveCategories();
        this.saveTags();
      });
  }
  /**
   * The method return to previous page.
   */
  goBack(): void {
    this.location.back();
  }
  /**
   * Creates a new default object NewsEditComponent
   * @constructor
   */
  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private authService: AuthService,
              private commentsService: CommentsService,
              private categoriesService: CategoriesService,
              private tagsService: TagsService,
              private router: Router,
              private location: Location) {
  }
  /**
   * Initializes the NewsEditComponent class after it is created.
   */
  ngOnInit() {
    this.getNews();
  }

}
