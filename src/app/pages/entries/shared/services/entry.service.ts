import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { environment } from './../../../../../environments/environment';

import { EntryModel } from './../models/entry.model';

import { CategoryService } from './../../../categories/shared/services/category.service';


@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath = environment.urlApi + 'entries';

  constructor(private httpClient: HttpClient, private categorySevice: CategoryService) { }

  getAll(): Observable<EntryModel[]> {
    return this.httpClient.get(this.apiPath).pipe(
      map(this.jsonDataToentries),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<EntryModel> {
    const urlApi = `${this.apiPath}/${id}`;

    return this.httpClient.get(urlApi).pipe(
      map(this.jsonDataToEntry),
      catchError(this.handleError)
    );
  }

  create(entry: EntryModel): Observable<EntryModel> {
    return this.categorySevice.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return this.httpClient.post(this.apiPath, entry).pipe(
          map(this.jsonDataToEntry),
          catchError(this.handleError)
        );
      })
    );
  }

  update(entry: EntryModel): Observable<EntryModel> {
    const urlApi = `${this.apiPath}/${entry.id}`;

    return this.categorySevice.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return this.httpClient.put(urlApi, entry).pipe(
          map(() => entry),
          catchError(this.handleError)
        );
      })
    );
  }

  delete(id: number): Observable<any> {
    const urlApi = `${this.apiPath}/${id}`;

    return this.httpClient.delete(urlApi).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  private jsonDataToEntry(jsonData: any): EntryModel {
    return Object.assign(new EntryModel(), jsonData);
  }

  private jsonDataToentries(jsonData: any[]): EntryModel[] {
    const entries: EntryModel[] = [];
    jsonData.forEach(element => {
      const entry = Object.assign(new EntryModel(), element);
      entries.push(entry)
    });
    return entries;
  }

  private handleError(error: any): Observable<any> {
    console.error('Erro na requisição: ' + error);
    return throwError(error);
  }
}
