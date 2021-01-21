import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import { environment } from './../../../../../environments/environment';

import * as moment from 'moment';

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
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  update(entry: EntryModel): Observable<EntryModel> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  getByMonthAndYear(month: number, year: number): Observable<EntryModel[]>{
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    );
  }

  protected setCategoryAndSendToServer(entry: EntryModel, sendFn: any): Observable<EntryModel> {
    return this.categorySevice.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }

  private filterByMonthAndYear(entries: EntryModel[], month: number, year: number) {
    return entries.filter(entry => {
      const entryDate = moment(entry.date, 'DD/MM/YYYY');
      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;

      if (monthMatches && yearMatches) {
        return entry;
      }
    });
  }
}
