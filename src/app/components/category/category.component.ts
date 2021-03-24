import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService) {
    this.getCategories();
  }

  ngOnInit(): void {}

  categories: Category[] = [];

  currentCategory: Category | undefined;

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }
  getListAllProduct() {
    this.currentCategory = undefined;
  }

  getListAllProductClass() {
    if (this.currentCategory == undefined) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  getCurrentCategoryClass(category: Category) {
    if (category == this.currentCategory) {
      return 'list-group-item list-group-item-action active';
    } else {
      return 'list-group-item list-group-item-action';
    }
  }
}
