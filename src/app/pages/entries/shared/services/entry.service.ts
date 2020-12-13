import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { environment } from './../../../../../environments/environment';

import { EntryModel } from './../models/entry.model';

import { BaseResourceService } from './../../../../shared/services/base-resource.service';
import { CategoryService } from './../../../categories/shared/services/category.service';


@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<EntryModel> {

  constructor(protected injector: Injector, protected categorySevice: CategoryService) {
    super(`${environment.urlApi}entries`, injector, EntryModel.fromJson);
  }

  create(entry: EntryModel): Observable<EntryModel> {
    return this.categorySevice.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;

        return super.create(entry);
      })
    );
  }

  update(entry: EntryModel): Observable<EntryModel> {
    return this.categorySevice.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;

        return super.update(entry);
      })
    );
  }
}
