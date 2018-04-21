import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

import {FormsModule} from '@angular/forms';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {HomeComponent} from './home/home.component';

import {AuthService} from './service/auth.service';
import {DeleteModalComponent} from './modal/delete-modal/delete-modal.component';
import {UpdateModalComponent} from './modal/update-modal/update-modal.component';
import {SaveModalComponent} from './modal/save-modal/save-modal.component';
import {PersonsComponent} from './persons/persons.component';
import {PersonService} from './service/person.service';
import {PersonDetailComponent} from './persons/person-detail/person-detail.component';
import {LoginModalComponent} from './modal/login-modal/login-modal.component';
import {RegistrationModalComponent} from './modal/registration-modal/registration-modal.component';
import {RegistrationComponent} from './registration/registration.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CanActivateRouteGuard} from './service/router-guard.service';
import {UserService} from './service/user.service';
import {RolesComponent} from './persons/roles/roles.component';
import {CommentsCountComponent} from './persons/comments-count/comments-count.component';
import {CommentsService} from './service/comments.service';
import {NewsService} from './service/news.service';
import { PersonNewsCountComponent } from './persons/person-news-count/person-news-count.component';
import { NewsComponent } from './news/news.component';
import { WorldComponent } from './news/world/world.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { NewsInfoComponent } from './news/news-info/news-info.component';
import { NewsCommentsComponent } from './news/news-info/news-comments/news-comments.component';
import { NewsCommentsCountComponent } from './news/news-info/news-comments-count/news-comments-count.component';
import { NewsLikesComponent } from './news/news-info/news-likes/news-likes.component';
import { NewsTagsComponent } from './news/news-info/news-tags/news-tags.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeleteModalComponent,
    UpdateModalComponent,
    SaveModalComponent,
    PersonsComponent,
    PersonDetailComponent,
    LoginModalComponent,
    RegistrationModalComponent,
    RegistrationComponent,
    PageNotFoundComponent,
    RolesComponent,
    CommentsCountComponent,
    PersonNewsCountComponent,
    NewsComponent,
    WorldComponent,
    NewsDetailComponent,
    NewsInfoComponent,
    NewsCommentsComponent,
    NewsCommentsCountComponent,
    NewsLikesComponent,
    NewsTagsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AuthService, UserService, CanActivateRouteGuard, PersonService, CommentsService, NewsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
