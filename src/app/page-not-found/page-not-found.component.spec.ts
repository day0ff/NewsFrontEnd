import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {PageNotFoundComponent} from './page-not-found.component';

import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateCustomLoader} from '../../test/TranslateCustomLoader';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateCustomLoader
          }
        })
      ]
    })
      .compileComponents();
  }));

  beforeEach(inject([TranslateService], (service) => {
    translateService = service;
    translateService.use('ru');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
