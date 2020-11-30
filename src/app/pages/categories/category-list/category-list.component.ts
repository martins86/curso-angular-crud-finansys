import { CategoryModel } from './../shared/models/category.model';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: CategoryModel[] = [];

  constructor(private serviceCategory: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): any {
    this.serviceCategory.getAll().subscribe(
      result => this.categories = result,
      error => alert('Erro ao carregar as Categorias, tente novamente.')
    );
  }

  deleteCategory(category: CategoryModel): any {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.serviceCategory
        .delete(category.id)
        .subscribe(
          () => this.categories = this.categories.filter(element => element !== category),
          () => alert('Erro ao tentar excluir.')
        );
    }
  }
}
