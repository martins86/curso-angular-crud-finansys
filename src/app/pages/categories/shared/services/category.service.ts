import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { environment } from './../../../../../environments/environment';

import { CategoryModel } from './../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath = environment.urlApi + 'categories';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CategoryModel[]> {
    return this.httpClient.get(this.apiPath).pipe(
      map(this.jsonDataToCategories),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<CategoryModel[]> {
    const urlApi = `${this.apiPath}/${id}`;

    return this.httpClient.get(urlApi).pipe(
      map(this.jsonDataToCategory),
      catchError(this.handleError)
    );
  }

  create(category: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.post(this.apiPath, category).pipe(
      map(this.jsonDataToCategory),
      catchError(this.handleError)
    );
  }

  update(category: CategoryModel): Observable<CategoryModel> {
    const urlApi = `${this.apiPath}/${category.id}`;

    return this.httpClient.put(urlApi, category).pipe(
      map(() => category),
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

  private jsonDataToCategory(jsonData: any): CategoryModel {
    return jsonData as CategoryModel;
  }

  private jsonDataToCategories(jsonData: any[]): CategoryModel[] {
    const categories: CategoryModel[] = [];
    jsonData.forEach(element => categories.push(element as CategoryModel));
    return categories;
  }

  private handleError(error: any): Observable<any> {
    console.error('Erro na requisição: ' + error);
    return throwError(error);
  }
}
