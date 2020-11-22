import { CategoryModel } from './../shared/models/category.model';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-caterory-list',
  templateUrl: './caterory-list.component.html',
  styleUrls: ['./caterory-list.component.css']
})
export class CateroryListComponent implements OnInit {

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
}
