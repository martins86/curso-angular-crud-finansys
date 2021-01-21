import { Injectable, Injector } from '@angular/core';

import { environment } from './../../../../../environments/environment';

import { CategoryModel } from './../models/category.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<CategoryModel> {
  constructor(protected injector: Injector) {
    super(`${environment.urlApi}categories`, injector, CategoryModel.fromJson);
  }
}
