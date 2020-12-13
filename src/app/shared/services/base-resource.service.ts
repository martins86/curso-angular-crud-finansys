import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { BaseResourceModel } from '../models/base-resource-model';

@Injectable({
  providedIn: 'root'
})

export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected httpClient: HttpClient;

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T) {
    this.httpClient = injector.get(HttpClient);
   }

  getAll(): Observable<T[]> {
    return this.httpClient.get(this.apiPath).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<T> {
    const urlApi = `${this.apiPath}/${id}`;

    return this.httpClient.get(urlApi).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  create(resource: T): Observable<T> {
    return this.httpClient.post(this.apiPath, resource).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  update(resource: T): Observable<T> {
    const urlApi = `${this.apiPath}/${resource.id}`;

    return this.httpClient.put(urlApi, resource).pipe(
      map(() => resource),
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


  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(
      element => resources
        .push( this.jsonDataToResourceFn(element) )
    );
    return resources;
  }

  protected handleError(error: any): Observable<any> {
    console.error('Erro na requisição: ' + error);
    return throwError(error);
  }
}
