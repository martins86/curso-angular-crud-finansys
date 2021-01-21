import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormDirective } from '../../../shared/directives/base-resource-form/base-resource-form.directive';

import { CategoryModel } from './../shared/models/category.model';
import { CategoryService } from './../shared/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormDirective<CategoryModel> {

  constructor(
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, new CategoryModel(), categoryService, CategoryModel.fromJson);
  }

  protected buildResourceForm(): any {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  protected createPageTitle(): string {
    return 'Cadastro de Nova Categoria';
  }

  protected editionPageTitle(): string {
    const resourceName = this.resource.name || '';
    return `Editando Categoria: ${ resourceName }`;
  }
}
