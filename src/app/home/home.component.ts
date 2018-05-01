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
/**
 * The class implements component management HomeComponent
 */
export class HomeComponent implements OnInit {
  /**
   * property - of Categories Array
   */
  categories: Categories[];
  /**
   * The method requests Categories array from the database
   *
   */
  getCategories(): void {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }
  /**
   * Creates a new default object HomeComponent
   * @constructor
   */
  constructor(private authService: AuthService, private categoriesService: CategoriesService) {
  }
  /**
   * Initializes the HomeComponent class after it is created.
   */
  ngOnInit() {
    this.getCategories();
  }

}
