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
import { RolesComponent } from './persons/roles/roles.component';

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
    RolesComponent
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
  providers: [AuthService, UserService, CanActivateRouteGuard, PersonService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
