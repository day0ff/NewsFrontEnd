import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Categories} from '../entity/categories';
import {CategoriesService} from '../service/categories.service';
import {Group} from '../entity/group';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Categories[];

  getCategories() {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }

  constructor(private authService: AuthService, private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.getCategories();
  }

}
