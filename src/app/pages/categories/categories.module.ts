import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CateroryListComponent } from './caterory-list/caterory-list.component';
import { CateroryFormComponent } from './caterory-form/caterory-form.component';


@NgModule({
  declarations: [CateroryListComponent, CateroryFormComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
