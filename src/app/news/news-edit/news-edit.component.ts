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
export class NewsEditComponent implements OnInit {
  news: News;
  roles: string [];
  comments: Comment[] = [];
  comment = null;
  person: Person;
  imgGroups: Group [] = Img.imgNews;

  categories: Categories[];
  categoryTypes: Group[] = [];
  categoryGroups: Group[] = [];

  tag = '';
  tags: Tags[];
  tagsTypes: Group[] = [];
  tagsGroups: Group[] = [];

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

  getComments(): void {
    const id = this.route.snapshot.paramMap.get('editId');
    this.newsService.getCommentsByNewsId(+id)
      .subscribe(comments => this.comments = comments,
        error => console.log('Comments error + ' + error));
  }

  getPerson(): void {
    this.person = this.authService.getPerson();
  }

  saveComment(): void {
    this.getPerson();
    this.commentsService.saveComment(this.person.id, this.news.id, this.comment)
      .subscribe(() => document.location.reload());
  }

  saveNews(): void {
    this.newsService.saveNews(this.news, this.person.id)
      .subscribe(news => {
        this.news = news;
        this.saveCategories();
        this.saveTags();
        this.router.navigateByUrl('edit/detail/' + this.news.id);
      });
  }

  deleteNews(): void {
    this.newsService.deleteNews(this.news.id)
      .subscribe(() => this.router.navigateByUrl('/edit'));
  }

  updateNews(): void {
    this.newsService.updateNews(this.news, this.person.id)
      .subscribe(news => {
        this.saveCategories();
        this.saveTags();
      });
  }

  goBack(): void {
    this.location.back();
  }

  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private authService: AuthService,
              private commentsService: CommentsService,
              private categoriesService: CategoriesService,
              private tagsService: TagsService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.getNews();
  }

}
