import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PersonsComponent} from './persons/persons.component';
import {PersonDetailComponent} from './persons/person-detail/person-detail.component';
import {RegistrationComponent} from './registration/registration.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CanActivateRouteGuard} from './service/router-guard.service';
import {WorldComponent} from './news/world/world.component';
import {NewsDetailComponent} from './news/news-detail/news-detail.component';
import {NewsEditComponent} from './news/news-edit/news-edit.component';
import {NewsComponent} from './news/news.component';
import {CategoryComponent} from './news/category/category.component';
import {TagComponent} from './news/tag/tag.component';

export const routes: Routes = [
  {path: '', redirectTo: 'Новости', pathMatch: 'full'},
  {path: 'Новости', component: HomeComponent},
  // {path: 'news', component: NewsComponent},
  {path: 'edit', component: NewsComponent,
    canActivate: [CanActivateRouteGuard],
    data: {expectedRoles: ['ADMIN', 'EDITOR']}},
  {path: 'category/:category', component: CategoryComponent},
  {path: 'tag/:tag', component: TagComponent},
  {path: 'news/detail/:newsId', component: NewsDetailComponent},
  // {path: 'edit/detail/:editId', component: NewsEditComponent},
    {
      path: 'edit/detail/:editId',
      component: NewsEditComponent,
      canActivate: [CanActivateRouteGuard],
      data: {expectedRoles: ['ADMIN', 'EDITOR']}
    },
  // {path: 'person/detail/:newsId', component: PersonDetailComponent},
  {path: 'person/detail/:id', component: PersonDetailComponent, canActivate: [CanActivateRouteGuard], data: {expectedRoles: ['ADMIN']}},
  {path: 'persons', component: PersonsComponent, canActivate: [CanActivateRouteGuard], data: {expectedRoles: ['ADMIN'] }},
  // {path: 'persons', component: PersonsComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
