import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { environment } from './../../../../../environments/environment';

import { EntryModel } from './../models/entry.model';


@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath = environment.urlApi + 'entry';

  constructor(private httpClient: HttpClient) { }

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

  create(Entry: EntryModel): Observable<EntryModel> {
    return this.httpClient.post(this.apiPath, Entry).pipe(
      map(this.jsonDataToEntry),
      catchError(this.handleError)
    );
  }

  update(Entry: EntryModel): Observable<EntryModel> {
    const urlApi = `${this.apiPath}/${Entry.id}`;

    return this.httpClient.put(urlApi, Entry).pipe(
      map(() => Entry),
      catchError(this.handleError)
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
    return jsonData as EntryModel;
  }

  private jsonDataToentries(jsonData: any[]): EntryModel[] {
    const entries: EntryModel[] = [];
    jsonData.forEach(element => entries.push(element as EntryModel));
    return entries;
  }

  private handleError(error: any): Observable<any> {
    console.error('Erro na requisição: ' + error);
    return throwError(error);
  }
}
