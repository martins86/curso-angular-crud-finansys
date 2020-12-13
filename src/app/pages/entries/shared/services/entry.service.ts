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
    super(`${environment.urlApi}entries`, injector);
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

  protected jsonDataToResource(jsonData: any): EntryModel {
    return Object.assign(new EntryModel(), jsonData);
  }

  protected jsonDataToResources(jsonData: any[]): EntryModel[] {
    const entries: EntryModel[] = [];
    jsonData.forEach(element => {
      const entry = Object.assign(new EntryModel(), element);
      entries.push(entry);
    });
    return entries;
  }
}
