import { Component } from '@angular/core';

import { BaseResourceListDirective } from 'src/app/shared/directives/base-resource-list/base-resource-list.directive';

import { CategoryModel } from './../shared/models/category.model';

import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListDirective<CategoryModel> {

  constructor(private categoryService: CategoryService) {
    super(categoryService);
  }
}
